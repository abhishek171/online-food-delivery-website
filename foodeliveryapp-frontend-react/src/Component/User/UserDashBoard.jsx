import React, { useState,useEffect} from 'react';
import LogoImg from '../../image/logo.png';
import AdminCover from '../../image/admincover.jpg';
import AvatarImg from '../../image/avatar.webp';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Accordion from '../Resusable/Accordion';
import '../../Css/adminPage.css';
import { Slide} from 'react-awesome-reveal';
const tabsData = [
    {
      id: 'User Info',
      title: 'User Info',
      innerTabs: [
        { id: 'View Profile', title: 'Profile' },
        { id: 'Update Profile', title: 'Update Profile' },
        { id: 'View Order', title: 'View Order' }
      ],
    }
  ];
const UserDashBoard = () =>{
  const [activeTab,setActiveTab] = useState(false);
  const [selectedValues,setSelectedValues] = useState([]);
  const [updateUserDetails,setUpdateUserDetail] = useState({});
  const customerDetails = useSelector(state=>state.userDetails);
  const [viewOrders,setViewOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const userDetails = useSelector(state=>state.userDetails);
  const login = useSelector(state=>state.loggedIn);
  const dispatchFunc = useDispatch();
  const tableHeaders = ["Hotel Name","Dish Name","Quantity","Price"];
  const state = JSON.parse(localStorage.getItem("Orders"));
  const history = useNavigate(null);
  const formik = useFormik({
      initialValues: {
        id:'',
        username:'',
        phoneno:'',
        street:'',
        area:'',
        city:'',
        pincode:'',
      },
      validationSchema: Yup.object({
        id:Yup.number()
        .positive('Id must be positive')
        .moreThan(0, 'Id must be greater than 0')
        .required('*Id is required'),
        username: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters')
          .max(50, '*Must be 50 characters or less')
          .required('*Name Required'),
        phoneno:Yup.number()
          .test('is-ten-digits', '*PhoneNo should be of 10 digits', value => value.toString().length === 10)
          .required('*Phone No is required'),
        street:Yup.string()
        .required('*Street is Required'),
        area:Yup.string()
        .required('*Street is Required'),
        city:Yup.string()
        .matches(/^[a-zA-Z]+$/, '*City should contain only letters')
        .max(30, '*Must be 30 characters or less')
        .required('*City is Required'),
        pincode:Yup.number()
        .positive('Pincode must be positive')
        .moreThan(0, 'Pincode must be greater than 0')
        .test('is-six-digits', '*Pincode should be of 6 digits', value => value.toString().length === 6)
        .required('*Pincode is required')
      }),
  })

  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  const handleTabClick = (tabKey) => {
      setActiveTab(tabKey);
    };
    
  const handleSelectValueChange = (e)=>{
  if (e.target.value === "submit") {
      const confirmed = window.confirm(`Do you want to select other field other than submit: \n Ok=true  Cancel=false`);
      if (confirmed) {
      alert("Select another field first");
      } else {
      const selectedValue = e.target.value;
      setSelectedValues([...selectedValues, selectedValue]);
      e.target.disabled = true;
      }
  } else {
      const selectedValue = e.target.value;
      setSelectedValues([...selectedValues, selectedValue]);

      for (let i = 0; i < e.target.options.length; i++) {
      const option = e.target.options[i];
      if (option.value === selectedValue) {
          option.disabled = true;
      }
      }
  }
  }

  const onInputDataChange = (e)=>{
      let {value,name,id} = e.target;
        if(id === "id"){
          setUpdateUserDetail({
            ...updateUserDetails,
            [name]:Number(value),
        });
      }else if(id === "hotelname"){
        setUpdateUserDetail({
          ...updateUserDetails,
          "custName" : value
      });
      }else if(id === "phoneno"){
        setUpdateUserDetail({
          ...updateUserDetails,
          "custPhone" : Number(value)
      });
      }else if(id === "pincode"){
        setUpdateUserDetail({
          ...updateUserDetails,
          "pincode" : Number(value)
      });
      }else{
        setUpdateUserDetail({
          ...updateUserDetails,
          [name] : value
      });
      }
      
      formik.handleChange(e);
    }

  const handleSubmitFormData = (e)=>{
  e.preventDefault();
  axios.put('http://localhost:8003/customer/updateCustomerDetails', updateUserDetails, {
      headers: {
          "Content-Type": "application/json",
      }
  })
  .then(function (response) {
      if(response.data!==""){
      localStorage.setItem("HotelInfo",JSON.stringify(response.data));
      console.log(response.data);
      toast.success('Data Updated Sucessfully!', {
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
          document.querySelector(".updatedUserDetail #id").value='';
          setSelectedValues([]);
          const selectElement = document.getElementById("updateUserProfile");
          selectElement.disabled = false;
          for (let i = 1; i < selectElement.options.length; i++) {
              selectElement.options[i].disabled = false;
          }
          
      }else{
          toast.error('Data Not Found! Or Currently service is not available at Your Location!', {
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
  return (
    <>
      <div className="container-fluid flex" style={{overflow:'hidden',boxShadow:"20px 0px 0px  grey",position:"relative",minHeight:"100%"}}>
      id: 'User Info',
        <div style={{ width: "20%", minHeight:`${activeTab === "User Info"?"200%":"100%"}`,color: "grey", backgroundColor: "black", padding: "25px 0", borderRight: "1px solid lightgrey", position: "fixed" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgb(201, 25, 25)", fontSize: "25px", fontWeight: "700",paddingBottom:"40px"}}>
            <img src={LogoImg} alt="" style={{ width: "60px", height: "60px" }} />
            <p>HUNGRY FLEET</p>
          </div>
          <Accordion accordionData={tabsData} handleAccordionClick={handleTabClick}/>
        </div>
        <div className="mt-8" style={{ width: "80%", marginLeft: "20%" }}>
        {activeTab === "View Profile" && (
          <Slide direction='down'>
          <div className="flex flex-col gap-y-[40px]" style={{ padding: "40px 25px", height: "100%", overflow: "scroll-y" }}>
              <div className="profile-header">Profile</div>
              <div className='profile-cover'>
              <div style={{ backgroundImage: `url(${AdminCover})`, width: "100%", height: "85%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", borderRadius: "10px" }}></div>
              <div className='profile-img'  style={{ backgroundImage: `url(${AvatarImg})`,backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>
              </div>
              <div className='profile-name'>
                  <p style={{fontSize:"18px",fontWeight:"600"}}>Name : {userDetails.custName}</p>
              </div>
              </div>
              <div className='profile-details'>
              <ul className='flex flex-col gap-y-[20px]'>
                  <li style={{fontSize:"18px",fontWeight:"500"}}>User Id : {userDetails.custId}</li>
                  <hr />
                  <li style={{fontSize:"18px",fontWeight:"500"}}>Name : {userDetails.custName}</li>
                  <hr />
                  <li style={{fontSize:"18px",fontWeight:"500"}}>Phone No : {userDetails.custPhone}</li>
                  <hr />
                  <li style={{fontSize:"18px",fontWeight:"500"}}>Address : {`${userDetails.street} ${userDetails.area} ${userDetails.city} ${userDetails.pincode}`}</li>
              </ul>
              </div>
          </div>
          </Slide>
        )}
        {activeTab === "Update Profile" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
            <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update User Details</p>
            <div className='flex justify-center items-center' style={{ width: "100%" }}>
                <p style={{ color: "black", fontSize: "20px" }}>Select fields you want to update(Select Correctly):&nbsp;</p>
                <select name="updateHotelProfile" id="updateUserProfile" onChange={handleSelectValueChange}>
                <option selected disabled>Select Option</option>
                <option value="username">User Name</option>
                <option value="phoneno">Phone No</option>
                <option value="street">Street</option>
                <option value="area">Area</option>
                <option value="city">City</option>
                <option value="pincode">Pincode</option>
                <option value="submit">Submit</option>
                </select>
            </div>
            <form className="updateUserDetail" onSubmit={handleSubmitFormData} style={{display:`${selectedValues.length===0?"none":"block"}`}}>
            <i className="fa fa-user-o" style={{marginLeft:'45%',width:'60px',height:'60px'}}/>
                <div className='flex flex-col pb-5 pt-7'>
                <label>User Id</label>
                <input id = "id" name = "id"
                        onBlur={formik.handleBlur}
                        onChange={onInputDataChange} value={formik.values.id}
                        />
                        {formik.touched.id && formik.errors.id ? (
                        <div className="error">{formik.errors.id}</div>
                        ) : null}
                </div>
                {selectedValues.map((option, index) => (
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
        {activeTab === "View Order" && (
          <>
           <table className='mt-10' style={{width:"100%",padding:"0"}}>
              <thead>
              <tr>
                  {tableHeaders.map((header, index) => (
                  <th key={index} style={{ fontSize: '20px', fontWeight: '800', padding: '10px'}}>
                      {header}
                  </th>
                  ))}
              </tr>
              </thead>
              <tbody>
              {state.orderFood.map((hotelOrder, index) => (
                  <React.Fragment key={index}>
                  {hotelOrder.orders.map((order, orderIndex) => (
                      <tr key={orderIndex}>
                      <td  style={{ fontSize: '18px', fontWeight: '600', padding: '10px'}}>{hotelOrder.hotelName}</td>
                      <td style={{ fontSize: '18px', fontWeight: '600', padding: '10px 15px'}}>{order.dishName}</td>
                      <td style={{ fontSize: '18px', fontWeight: '700', padding: '10px 5%'}}>{order.quantity}</td>
                      <td style={{ fontSize: '18px', fontWeight: '600', padding: '10px'}}>₹ {Math.ceil(order.price)}</td>
                      </tr>
                  ))}
                  </React.Fragment>
              ))}
              </tbody>
          </table>
          </>
        )}
        </div>
        <button id="logout" style={{position:"fixed",top:"2%",right:"2%",padding:"12px 24px",borderRadius:"10px",backgroundColor:"rgb(201, 25, 25)",color:"white",fontWeight:"700"}} onClick={()=>{dispatchFunc({type:"logout"});history('/menus')}}>Logout</button>
      </div>
        <ToastContainer/>
    </>
  )
}

export default UserDashBoard