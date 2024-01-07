import React, { useState,useEffect} from 'react';
import LogoImg from '../../image/logo.png';
import AdminCover from '../../image/admincover.jpg';
import AvatarImg from '../../image/avatar.webp';
import DeliveryImg from '../../image/deliveryman.webp';
import '../../Css/adminPage.css';
import { Slide} from 'react-awesome-reveal';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Accordion from '../Resusable/Accordion.jsx';
import TableComponent from '../Resusable/Table';
import PaginationControls from '../Resusable/Pagination';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const tabsData = [
  {
    id: 'Profile',
    title: 'Delivery Info',
    innerTabs: [
      { id: 'viewProfile', title: 'Profile' },
      { id: 'updateDeliveryInfo', title: 'Update Delivery Info' },
      { id: 'updatePersonalDetails', title: 'Update Personal Details'},
    ],
  },
  {
    id: 'Orders',
    title: 'View Orders',
    innerTabs: [
      { id: 'view_orders', title: ' View Orders' },
    ],
  },
  {
    id: 'Hotel Details',
    title: 'Hotel Info',
    innerTabs: [
      { id: 'viewHotelDetails', title: 'View Hotel Address' }
    ],
  },
  {
    id: 'Customer Details',
    title: 'Customer Details',
    innerTabs: [
      {id:"viewCustomerDetails",title: 'View Customer Address'},
      {id:"viewPaymentDetails",title: 'View Payment Details'}
    ],
  },
];

const DeliveryComponent = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hotelDetails,setHotelDetails] = useState({});
  const [customerDetails,setCustomerDetails] = useState({});
  const [viewOrders,setViewOrders] = useState({});
  const [viewPaymentDetails,setViewPaymentDetails] = useState({});
  const [viewDeliveryStatus,setViewDeliveryStatus] = useState({});
  const [updateDeliveryStatus,setUpdateDeliveryStatus] = useState({});
  const [updateDeliveryPersonDetails, setUpdateDeliveryPersonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useNavigate(null);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "submit") {
      const confirmed = window.confirm(`Do you want to select other field other than submit: \n Ok=true  Cancel=false`);
      if (confirmed) {
        alert("Select another field first");
      } else {
        const selectedValue = e.target.value;
        setSelectedOptions([...selectedOptions, selectedValue]);
        e.target.disabled = true;
      }
    } else {
      const selectedValue = e.target.value;
      setSelectedOptions([...selectedOptions, selectedValue]);

      for (let i = 0; i < e.target.options.length; i++) {
        const option = e.target.options[i];
        if (option.value === selectedValue) {
          option.disabled = true;
        }
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name:'',
      userId:'',
      contactNo:''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, '*Name name should contain only letters')
        .max(15, '*Must be 15 characters or less')
        .required('*Name Required'),
      userId:Yup.string()
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'User Id must contain both letters and numbers')
        .max(10, '*Must be 10 characters or less')
        .required('*User Id is required'),
      contactNo:Yup.number()
      .positive('Contact No must be positive')
      .test('is-ten-digits', '*Pincode should be of 10 digits', value => value.toString().length === 10)
      .required('*Contact is required'),
    }),
  })

  const onInputValueChange =(e)=>{
    let {name,value} = e.target;
    setUpdateDeliveryStatus({...updateDeliveryStatus,[name]:value});
    formik.handleChange(e);
  }
  const onInputDataChange = (e)=>{
    let {value,name,id} = e.target;
    if (id === 'contactNo'){
      setUpdateDeliveryPersonDetails({
        ...updateDeliveryPersonDetails,
        [name]:Number(value),
    });
    }else{
        setUpdateDeliveryPersonDetails({
            ...updateDeliveryPersonDetails,
            [name]:value,
        });
    }
    formik.handleChange(e);
  }
 
  const submitFormData = (e)=>{
    e.preventDefault();
    axios.put('http://localhost:8004/deliveryPersonInfo/updateDeliveryPersonInfo', updateDeliveryPersonDetails,{
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        if(response.data!==""){
          toast.success('Personal Details Updated SuccessFully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            e.target.reset();
            formik.resetForm();
            setSelectedOptions([]);
            const searchElement = document.getElementById("updateDeliveryProfile");
            searchElement.disabled = false;
            for(let i = 1;i<searchElement.options.length;i++){
              searchElement.options[i].disabled = false;
            }
          }else{
            toast.error('Data not found!', {
              position: "top-center",
              autoClose: 1600,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
              });
              e.target.reset();
              formik.resetForm();
        }
      })
      .catch(function (error) {
        toast.error({error}, {
          position: "top-center",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
      });
  }
  const handleSubmitFormData = (e)=>{
    e.preventDefault();
    axios.put('http://localhost:8004/deliveryInfo/updateDeliveryStatus',updateDeliveryStatus,{
      headers:{
        "Content-Type":"application/json",
      }
    })
      .then(function (response) {
        if(response.data!==null){
          toast.success('Delivery Status Updated', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            e.target.reset();
            formik.resetForm();
        }else{
          toast.error('Data not found!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            e.target.reset();
            formik.resetForm();
        }
      })
      .catch(function (error) {
        toast.error({error}, {
          position: "top-center",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
      });
  }
  const logout = ()=>{
    localStorage.removeItem("DeliveryPersonInfo");
    history('/delivery',{replace:true});
  }
//  useEffect(()=>{
//   axios.get('https://api.example.com/data'+{id})
//   .then(response => {
//     setHotelDetails(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setHotelMenu(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setCustomerDetails(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
  
//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setViewOrders(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setViewPaymentDetails(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setViewDeliveryPersonDetails(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setViewDeliveryStatus(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
//  },[])

  return (
    <>
      <div className="container-fluid flex" style={{overflow:'hidden',boxShadow:"20px 0px 0px  grey",position:"absolute"}}>
        <div style={{ width: "20%", minHeight: "100%", color: "grey", backgroundColor: "black", padding: "25px 0", borderRight: "1px solid lightgrey", position: "fixed" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgb(201, 25, 25)", fontSize: "25px", fontWeight: "700",paddingBottom:"40px"}}>
            <img src={LogoImg} alt="" style={{ width: "60px", height: "60px" }} />
            <p>HUNGRY FLEET</p>
          </div>
          <Accordion accordionData={tabsData} handleAccordionClick={handleTabClick}/>
        </div>
        <div className='mt-8' style={{ width: "80%", marginLeft: "20%" }}>
          {activeTab === "viewProfile" && (
            <Slide direction='down'>
              <div className="flex flex-col gap-y-[40px]" style={{ padding: "40px 25px", height: "100%", overflow: "scroll-y" }}>
                <div className="profile-header">Profile</div>
                <div className='profile-cover'>
                  <div style={{ backgroundImage: `url(${AdminCover})`, width: "100%", height: "85%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", borderRadius: "10px" }}></div>
                  <div className='profile-img' style={{backgroundImage: `url(${AvatarImg})`,backgroundSize:"cover",backgroundPosition:"center"}}>
                  </div>
                  <div className='profile-name'>
                    <p style={{fontSize:"18px",fontWeight:"600"}}>Name : {JSON.parse(localStorage.getItem("DeliveryPersonInfo")).name}</p>
                  </div>
                </div>
                <div className='profile-details'>
                  <ul className='flex flex-col gap-y-[20px]'>
                    <li style={{fontSize:"18px",fontWeight:"600"}}>Name:  {JSON.parse(localStorage.getItem("DeliveryPersonInfo")).name}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>UserId: {JSON.parse(localStorage.getItem("DeliveryPersonInfo")).userId}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>Contact No: {JSON.parse(localStorage.getItem("DeliveryPersonInfo")).contactno}</li>
                    <hr />
                  </ul>
                </div>
              </div>
            </Slide>
          )}
          {activeTab === "updateDeliveryInfo" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
            <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update Delivery Status Details</p>
            <form onSubmit={handleSubmitFormData}>
              <img src={DeliveryImg} alt="" style={{marginLeft:'45%',width:'60px',height:'60px'}}/>
              <div className='flex flex-col pb-5 pt-7'>
                <label>Delivery Id</label>
                <input id="id" name= "id"
                    onBlur={formik.handleBlur}
                    onChange={onInputValueChange} value={formik.values.id}
                    />
                    {formik.touched.id && formik.errors.id ? (
                    <div className="error">{formik.errors.id}</div>
                    ) : null}
                <button type='submit'>Submit</button>
              </div>
            </form>
            </Slide>
          )}
          {activeTab === "updatePersonalDetails" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
              <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update Personal Details</p>
              <div className='flex justify-center items-center' style={{ width: "100%" }}>
                <p style={{ color: "black", fontSize: "20px" }}>Select fields you want to update(Select Correctly):&nbsp;</p>
                <select name="updateDeliveryProfile" id="updateDeliveryProfile" onChange={handleSelectChange}>
                  <option selected disabled>Select Option</option>
                  <option value="name">Name</option>
                  <option value="contactNo">Contact No</option>
                  <option value="submit">Submit</option>
                </select>
              </div>
              <form onSubmit={submitFormData} style={{display:`${selectedOptions===""?"none":"block"}`}}>
                <div className='flex flex-col pb-5 pt-7'>
                  <label>User Id</label>
                  <input id="userId" name= "userId"
                        onBlur={formik.handleBlur}
                        onChange={onInputDataChange} value={formik.values.userId}
                        />
                        {formik.touched.userId && formik.errors.userId ? (
                        <div className="error">{formik.errors.userId}</div>
                        ) : null}
                </div>
                {selectedOptions.map((option, index) => (
                  option === "submit" ? (
                  <button key={index} type={option}>
                  Submit
                  </button>
                ) : (
                    <div className="flex flex-col pb-5 pt-7" key={index}>
                        <label>{option.toUpperCase()}</label>
                        <input
                        id={option}
                        name={option}
                        type='text'
                        onBlur={formik.handleBlur}
                        onChange={onInputDataChange}
                        value={formik.values[option]}
                        />
                        {formik.touched[option] && formik.errors[option] ? (
                        <div className="error">{formik.errors[option]}</div>
                        ) : null}
                    </div>
                )
                ))}
              </form>
            </Slide>
          )}
          {activeTab === "view_orders" && (
            <>
            {loading?(
              <div style={{ background: "white", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
                <img src={LogoImg} alt="" style={{ height: "200px", width: "200px" }} />
                <div style={{display:"flex"}}>
                  <p style={{color:"rgb(201, 25, 25)",fontSize:"48px"}}>HUNGRY FLEET</p>
                  <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                  </div>
                </div>
              </div>
              ):(
                <>
                  <TableComponent  data = {customerDetails} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(customerDetails).map(header => customerDetails[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "viewHotelDetails" && (
            <>
            {loading?(
              <div style={{ background: "white", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
                <img src={LogoImg} alt="" style={{ height: "200px", width: "200px" }} />
                <div style={{display:"flex"}}>
                  <p style={{color:"rgb(201, 25, 25)",fontSize:"48px"}}>HUNGRY FLEET</p>
                  <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                  </div>
                </div>
              </div>
              ):(
                <>
                  <TableComponent  data = {viewOrders} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(viewOrders).map(header => customerDetails[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "viewCustomerDetails" && (
            <>
            {loading?(
              <div style={{ background: "white", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
                <img src={LogoImg} alt="" style={{ height: "200px", width: "200px" }} />
                <div style={{display:"flex"}}>
                  <p style={{color:"rgb(201, 25, 25)",fontSize:"48px"}}>HUNGRY FLEET</p>
                  <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                  </div>
                </div>
              </div>
              ):(
                <>
                  <TableComponent  data = {viewPaymentDetails} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(viewPaymentDetails).map(header => viewPaymentDetails[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "viewPaymentDetails" && (
            <>
            {loading?(
              <div style={{ background: "white", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
                <img src={LogoImg} alt="" style={{ height: "200px", width: "200px" }} />
                <div style={{display:"flex"}}>
                  <p style={{color:"rgb(201, 25, 25)",fontSize:"48px"}}>HUNGRY FLEET</p>
                  <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                  </div>
                </div>
              </div>
              ):(
                <>
                  <TableComponent  data = {viewDeliveryStatus} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(viewDeliveryStatus).map(header => viewDeliveryStatus[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
        </div>
        <button id="logout" style={{position:"fixed",top:"2%",right:"2%",padding:"12px 24px",borderRadius:"10px",backgroundColor:"rgb(201, 25, 25)",color:"white",fontWeight:"700"}} onClick={logout}>Logout</button>
      </div>
      <ToastContainer/>
    </>
  );
}

export default DeliveryComponent;
