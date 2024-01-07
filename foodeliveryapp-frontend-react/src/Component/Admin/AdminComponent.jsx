import React, { useState,useEffect} from 'react';
import LogoImg from '../../image/logo.png';
import AdminCover from '../../image/admincover.jpg';
import UpdateProfile from '../../image/updateprofile.png';
import DeliveryImg from '../../image/deliveryman.webp';
import '../../Css/adminPage.css';
import { Slide} from 'react-awesome-reveal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Accordion from '../Resusable/Accordion.jsx';
import TableComponent from '../Resusable/Table';
import PaginationControls from '../Resusable/Pagination';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

const tabsData = [
  {
    id: 'Profile',
    title: 'Admin Info',
    innerTabs: [
      { id: 'viewProfile', title: 'Profile' },
      { id: 'addPaymentDetails', title: 'Admin Payment Info' },
      { id: 'view', title: 'View Admin Data' },
      { id: 'updatePaymentDetails', title: 'Update Payment Info' },
      { id: 'amount', title: 'Balance' },
    ],
  },
  {
    id: 'Hotel Details',
    title: 'Hotel Info',
    innerTabs: [
      { id: 'view_hotelDetails', title: 'Hotel Details' },
      { id: 'view_hotelMenu', title: 'Hotel Menu' },
    ],
  },
  {
    id: 'Customer Details',
    title: 'Customer Info',
    innerTabs: [
      { id: 'view_customerDetails', title: 'Customer Details' },
      { id: 'view_orders', title: ' View Orders' },
      { id: 'view_paymentDetails', title: 'Payment Data' },
    ],
  },
  {
    id: 'Delivery Details',
    title: 'Delivery Info',
    innerTabs: [
      { id: 'view_deliveryPersonDetails', title: 'Delivery Details' },
      { id: 'view_deliveryStatus', title: 'Check Availability' },
      { id: 'assignOrdersToDeliverBoy', title: 'Assign Orders' },
    ],
  },
];

const AdminComponent = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [inputValues, setInputValues] = useState({});
  const [adminPymentInfo,setAdminPaymentInfo] = useState({});
  const [hotelDetails,setHotelDetails] = useState({});
  const [hotelMenu ,setHotelMenu] = useState({});
  const [customerDetails,setCustomerDetails] = useState({});
  const [viewOrders,setViewOrders] = useState({});
  const [viewPaymentDetails,setViewPaymentDetails] = useState({});
  const [viewDeliveryPersonDetails,setViewDeliveryPersonDetails] = useState({});
  const [viewDeliveryStatus,setViewDeliveryStatus] = useState({});
  const [deliveryData ,setDeliveryData] = useState({});
  const [inputData,setInputData] = useState({});
  const [updateAdminPaymentDetail,setUpdateAdminPaymentDetail] =  useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useNavigate(null);
  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements && elements.getElement(CardElement);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  const formik = useFormik({
    initialValues: {
      hotelname:'',
      amountReceived:'',
      totalbalance:'',
      hotelid:'',
      orderId: '',
      deliveryPersonId:'',
      admin_id:'',
      amountToPay:''
    },
    validationSchema: Yup.object({
      hotelname: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, '*Hotel name should contain only letters')
        .max(15, '*Must be 15 characters or less')
        .required('*Hotel Name Required'),
      amountReceived: Yup.number()
        .min(0, '*Amount must be greater than or equal to 0')
        .max(10000, '*Amount must be less than or equal to 10,000')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
      totalbalance: Yup.number()
        .min(0, '*Balance Amount must be greater than or equal to 0')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
        hotelid: Yup.number()
        .positive('*Hotel Id must be positive')
        .moreThan(0, '*Hotel Id must be greater than 0')
        .required('*Hotel Id is required'),

        orderId: Yup.number()
        .positive('*Order Id must be positive')
        .moreThan(0, '*Order Id must be greater than 0')
        .required('*Order Id is required'),
        
        deliveryPersonId: Yup.number()
        .positive('*deliveryPersonId must be positive')
        .moreThan(0, '*deliveryPersonId must be greater than 0')
        .required('*deliveryPersonId is required'),

        admin_id: Yup.number()
        .positive('*Admin Id must be positive')
        .moreThan(0, '*Admin Id must be greater than 0')
        .required('*Admin Id is required'),
        
        amountToPay:Yup.number()
        .min(0, '*Amount must be greater than or equal to 0')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
    }),
  })

  const onInputChange = (e) => {
    let { id, value } = e.target;
    if(id ==="admin_id"){
       setInputValues({ ...inputValues,  admin_id: Number(value) });
    } else if (id === 'amountReceived') {
      setInputValues({ ...inputValues, amountReceived: Number(value) });
    } else if(id==="hotelname"){
       setInputValues({ ...inputValues, hotelName: value });
    }else if(id === "hotelid"){
       setInputValues({ ...inputValues, hotelId: Number(value) });
    }
    else{
      setInputValues({ ...inputValues, totalBalance: Number(value)});
    }
    formik.handleChange(e);
  };
  const onInputValueChange =(e)=>{
     let { name, value } = e.target;
     setInputData({...inputData,[name]:Number(value)});
    formik.handleChange(e);
  }
  const handleInputChange = (e)=>{
    let { id, value } = e.target;
    if (id === 'orderId') {
      setDeliveryData({ ...deliveryData, orderId: Number(value) });
    } else if (id === 'deliveryPerson') {
      setDeliveryData({ ...deliveryData, deliveryPersonId: Number(value) });
    }
    formik.handleChange(e);
  }
  const onChangeValue = (e)=>{
    const {id,value} = e.target;
    if(id === "hotelname"){
      setUpdateAdminPaymentDetail({...updateAdminPaymentDetail,hotelName:value});
    }else{
      setUpdateAdminPaymentDetail({...updateAdminPaymentDetail,amountReceived:Number(value)});
    }
    formik.handleChange(e);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/adminPanel/addAdminPaymentInfo', inputValues,{
      headers:{
          "Content-Type":'application/json',
      }
    })
      .then(function (response) {
        if(response.data!==null){
          toast.success('Admin Payment Info Added Sucessfully!', {
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
  };
  const submitFormData = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8005/adminPayment/updatePaymentDetails', inputData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        if(response.data!==null){
          toast.success('Admin Payment Details Updated', {
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
            setAdminPaymentInfo(response.data);
        }else{
          toast.error('Data Not Found!', {
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
  };
  const submitData = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8001/deliveryInfo/assignOrderstoDeliveryPerson',deliveryData)
      .then(function (response) {
        if(response.data!==null){
          toast.success('Delivery Data Added Successfully!', {
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
  const handlePayment = async(e)=>{
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8005/adminPayment/createPaymentIntent",updateAdminPaymentDetail, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const clientSecret = response.data;
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card:cardElement,
          billing_details: {
            name : updateAdminPaymentDetail.hotelName
          },
        }
      });
  
      if (result.error) {
        toast.error('Payment Failure!', {
          position: "top-center",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
      } else {
        formik.resetForm();
        e.target.reset();
        cardElement.clear();
        toast.success('Payment Successful!', {
          position: "top-center",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
         
        }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  }
  const logout = ()=>{
    localStorage.removeItem("AdminInfo")
    history("/admin",{replace:true});
  }
  
 useEffect(()=>{
    axios.post('http://localhost:8001/adminPanel/getAdminDetailsById',{admin_id:JSON.parse(localStorage.getItem("AdminInfo")).admin_id},
    {
      headers:{
        "Content-Type":"application/json",
      }
    })
    .then(response => {
      console.log(response.data)
      setAdminPaymentInfo(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
 },[])
  return (
    <>  
      <div className="container-fluid flex" style={{overflow:'hidden',boxShadow:"20px 0px 0px  grey",position:"relative"}}>
        <div style={{ width: "20%", minHeight: "100%", color: "grey", backgroundColor: "black", padding: "25px 0", borderRight: "1px solid lightgrey", position: "fixed" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgb(201, 25, 25)", fontSize: "25px", fontWeight: "700",paddingBottom:"40px"}}>
            <img src={LogoImg} alt="" style={{ width: "60px", height: "60px" }} />
            <p>HUNGRY FLEET</p>
          </div>
          <Accordion accordionData={tabsData} handleAccordionClick={handleTabClick}/>
        </div>
        <div className="mt-8" style={{ width: "80%", marginLeft: "20%" }}>
          {activeTab === "viewProfile" && (
            <Slide direction='down'>
              <div className="flex flex-col gap-y-[40px]" style={{ padding: "40px 25px", height: "100%", overflow: "scroll-y" }}>
                <div className="profile-header">Profile</div>
                <div className='profile-cover'>
                  <div style={{ backgroundImage: `url(${AdminCover})`, width: "100%", height: "85%", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", borderRadius: "10px" }}></div>
                  <div className='profile-img'  style={{ backgroundImage: `url(/image/admin-image/${JSON.parse(localStorage.getItem("AdminInfo")).profilePic}`,backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>
                  </div>
                  <div className='profile-name'>
                    <p style={{fontSize:"18px",fontWeight:"600"}}>Name : {JSON.parse(localStorage.getItem("AdminInfo")).adminUsername}</p>
                  </div>
                </div>
                <div className='profile-details'>
                  <ul className='flex flex-col gap-y-[20px]'>
                    <li style={{fontSize:"18px",fontWeight:"500"}}>Admin Id : {JSON.parse(localStorage.getItem("AdminInfo")).admin_id}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"500"}}>Name : {JSON.parse(localStorage.getItem("AdminInfo")).adminUsername}</li>
                    <hr />
                  </ul>
                </div>
              </div>
            </Slide>
          )}
          {activeTab === "addPaymentDetails" && (
            <Slide direction='down'>
            <div className='flex flex-col justify-center items-center  mb-8'>
            <div className='mt-[4%]' style={{fontSize:"45px",fontWeight:"700",color:"rgb(201, 25, 25)"}}>Admin Payment Information Form</div>
              <form className='flex flex-col assignOrder mt-[5%]' onSubmit={handleSubmit}>
                <label htmlFor="hotelname">Hotel Name</label>
                <input
                  id="hotelname"
                  name="hotelname"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hotelname}
                />
                {formik.touched.hotelname && formik.errors.hotelname ? (
                  <div className="error">{formik.errors.hotelname}</div>
                ) : null}
          
                <label htmlFor="amountReceived">Amount Received</label>
                <input
                  id="amountReceived"
                  name="amountReceived"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amountReceived}
                />
                {formik.touched.amountReceived && formik.errors.amountReceived? (
                  <div className="error">{formik.errors.amountReceived}</div>
                ) : null}

                <label htmlFor='totalbalance'>Total Balance</label>
                <input
                  id="totalbalance"
                  name="totalbalance"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.totalbalance}
                />
                {formik.touched.totalbalance && formik.errors.totalbalance? (
                  <div className="error">{formik.errors.totalbalance}</div>
                ) : null}
                <label htmlFor='hotelid'>Hotel Id</label>
                <input
                  id="hotelid"
                  name="hotelid"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hotelid}
                />
                {formik.touched.hotelid && formik.errors.hotelid? (
                  <div className="error">{formik.errors.hotelid}</div>
                ) : null}
                <label htmlFor='admin_id'>Admin Id</label>
                <input
                  id="admin_id"
                  name="admin_id"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.admin_id}
                />
                {formik.touched.admin_id && formik.errors.admin_id? (
                  <div className="error">{formik.errors.admin_id}</div>
                ) : null}
                <button type='submit'>Submit</button>
              </form>
            </div>
          </Slide>
          )}
          {activeTab === "view" && (
            <>
              {loading ? (
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
                    <TableComponent data={adminPymentInfo} currentPage={currentPage} itemsPerPage={10}/>
                    <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(adminPymentInfo).map(header => adminPymentInfo[header].length))/10)} onPageChange={handlePageChange}/>
                  </>
                )
              }
            </>
          )}
          {activeTab === "updatePaymentDetails" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
              <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update Payment Details</p>
              <form onSubmit={submitFormData}>
                <img src={UpdateProfile} alt="" style={{marginLeft:'45%',width:'60px',height:'60px'}}/>
                <div className='flex flex-col pb-5 pt-7'>
                  <label htmlFor='admin_id'>Admin Id</label>
                  <input id="admin_id" name= "admin_id"
                    onBlur={formik.handleBlur}
                    onChange={onInputValueChange} value={formik.values.admin_id}
                  />
                    {formik.touched.admin_id && formik.errors.admin_id ? (
                      <div className="error">{formik.errors.admin_id}</div>
                    ) : null}
                  <label>Amount Received</label>
                  <input type="text"
                  id="amountReceived" name= "amountReceived"
                  onBlur={formik.handleBlur}
                  onChange={onInputValueChange} value={formik.values.amountReceived}
                  />
                   {formik.touched.amountReceived && formik.errors.amountReceived ? (
                      <div className="error">{formik.errors.amountReceived}</div>
                    ) : null}
                    <button type="submit">Submit</button>
                </div>
              </form>
            </Slide>
          )}
          {activeTab === "amount" && (
            <>
              <div className='flex justify-center mt-[5%]' style={{color:"rgb(201, 25, 25)",fontSize:"35px",fontWeight:"600"}}>
                Total Balance = Rs. {adminPymentInfo.totalBalance}
              </div>
                <form className='flex flex-col pb-5 pt-7 mx-auto mt-[5%]' onSubmit={handlePayment}>
                    <label htmlFor="hotelname">Hotel Name : </label>
                    <input type="text" name="hotelname" id="hotelname"
                    onBlur={formik.handleBlur}
                      onChange={onChangeValue} value={formik.values.hotelname}/>
                      {formik.touched.hotelname && formik.errors.hotelname ? (
                        <div className="error">{formik.errors.hotelname}</div>
                      ) : null}
                    <label className='mt-3' htmlFor="amountToPay">Amount To Pay : </label>
                    <input type="text" name="amountToPay" id="amountToPay" 
                    onBlur={formik.handleBlur}
                    onChange={onChangeValue} value={formik.values.amountToPay}/>
                    {formik.touched.amountToPay && formik.errors.amountToPay ? (
                        <div className="error">{formik.errors.amountToPay}</div>
                      ) : null}
                      <div>
                    <label className='mt-3'>
                      Card details
                      <CardElement/>
                    </label>
                      </div>
                    <button className='mt-5' style={{ width:"40%",backgroundColor: "black", color: "white", padding: "10px 20px", fontWeight: "700", fontSize: "20px",marginLeft:"28%"}} title='Pay' >Pay</button>
                </form>
            </>
          )}
          {activeTab === "view_hotelDetails" && (
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
                    <TableComponent data={hotelDetails} currentPage={currentPage} itemsPerPage={10}/>
                    <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(hotelDetails).map(header => hotelDetails[header].length))/10)} onPageChange={handlePageChange}/>
                  </>
                )
              }
            </>
          )}
          {activeTab === "view_hotelMenu" && (
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
                    <TableComponent  data = {hotelMenu} currentPage={currentPage} itemsPerPage={10}/>
                    <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(hotelMenu).map(header => hotelMenu[header].length))/10)} onPageChange={handlePageChange}/>
                  </>
                )
              }
            </>
          )}
          {activeTab === "view_customerDetails" && (
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
                  <TableComponent  data = {viewOrders} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(viewOrders).map(header => customerDetails[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "view_paymentDetails" && (
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
          {activeTab === "view_deliveryPersonDetails" && (
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
                  <TableComponent  data = {viewDeliveryPersonDetails} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(Math.max(...Object.keys(viewDeliveryPersonDetails).map(header => viewDeliveryPersonDetails[header].length))/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "view_deliveryStatus" && (
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
          {activeTab === "assignOrdersToDeliverBoy" && (
            <Slide direction='down'>
              <div className='flex justify-center items-center mt-[5%]'>
                <form className='flex flex-col assignOrder' onSubmit={submitData}>
                  <img src={DeliveryImg} alt="" style={{marginLeft:'45%',width:'90px',height:'90px'}}/>
                  <label htmlFor="order">Order Id</label>
                  <input
                    id="orderId"
                    name="orderId"
                    type='text'
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderId}
                  />
                  {formik.touched.orderId && formik.errors.orderId ? (
                    <div className="error">{formik.errors.orderId}</div>
                  ) : null}
            
                  <label htmlFor="deliveryPersonId">Delivery Person Id</label>
                  <input
                    id="deliveryPersonId"
                    name="deliveryPersonId"
                    type='text'
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deliveryPersonId}
                  />
                  {formik.touched.deliveryPersonId && formik.errors.deliveryPersonId ? (
                    <div className="error">{formik.errors.deliveryPersonId}</div>
                  ) : null}
                  <button type='submit'>Submit</button>
                </form>
              </div>
            </Slide>
          )}
        </div>
        <button id="logout" style={{position:"fixed",top:"1%",right:"2%",padding:"12px 24px",borderRadius:"10px",backgroundColor:"rgb(201, 25, 25)",color:"white",fontWeight:"700"}} onClick={logout}>Logout</button>
      </div>
      <ToastContainer/>
    </>
  );
}

export default AdminComponent;
