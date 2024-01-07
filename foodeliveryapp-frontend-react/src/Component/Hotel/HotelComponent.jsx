import React, { useState,useEffect} from 'react';
import LogoImg from '../../image/logo.png';
import AdminCover from '../../image/admincover.jpg';
import MenuImg from '../../image/menu.png';
import UpdateHotelDetail from '../../image/updatehoteldetail.png';
import '../../Css/adminPage.css';
import { Slide} from 'react-awesome-reveal';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Accordion from '../Resusable/Accordion.jsx';
import TableComponent from '../Resusable/Table';
import { useNavigate } from 'react-router-dom';
import PaginationControls from '../Resusable/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
const tabsData = [
  {
    id: 'Profile',
    title: 'Hotel Info',
    innerTabs: [
      { id: 'viewProfile', title: 'Profile' },
      { id: 'addMenu', title: 'Add Menu' },
      { id: 'view_menu', title: 'View Menu' },
      { id: 'updateMenu', title: 'Update Menu' },
      { id: 'updateHotelDetails', title: 'Update Hotel Details'},
      { id: 'hotelPayment', title: 'Hotel Payment'},
    ],
  },
  {
    id: 'Customer Details',
    title: 'Customer Info',
    innerTabs: [
      { id: 'view_paymentDetails', title: 'Payment Data' },
      { id: 'updatePaymentDetails', title: 'Update Payment Details'},
    ],
  },
  {
    id: 'Delivery Details',
    title: 'Delivery Info',
    innerTabs: [
      { id: 'view_deliveryStatus', title: 'Check Availability' }
    ],
  },
  {
    id: "Orders Details",
    title: 'Orders Info',
    innerTabs:[
        { id: 'view_orders' ,title: 'Orders'},
        { id: 'update_order',title: 'Update Order'}
    ]
  }
];

const HotelComponent = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues,setSelectedValues] = useState([]);
  const [hotelMenu,setHotelMenu]=useState({});
  const [viewOrders,setViewOrders] = useState({});
  const [viewPaymentDetails,setViewPaymentDetails] = useState({});
  const [viewDeliveryStatus,setViewDeliveryStatus] = useState({});
  const [menuData,setMenuData] = useState({});
  const [updatedMenu , setUpdatedMenu] = useState({});
  const [updateHotelDetail,setUpdateHotelDetail] = useState({});
  const[updatePaymentDetails,setUpdatePaymentDetails] = useState({})
  const [updateOrder,setUpdateOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateUserDetails,setUpdateUserDetails] = useState({});
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

  const formik = useFormik({
    initialValues: {
      id:'',
      hotelname:'',
      dishname:'',
      categories:'',
      discount:'',
      price:'',
      cuisine:'',
      userid:'',
      totalbalance:'',
      street:'',
      area:'',
      city:'',
      pincode:'',
      hotel_id:'',
      adminname:'',
      amountToPay:'',
      userPaymentId:''
    },
    validationSchema: Yup.object({
      hotelname: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, '*Hotel name should contain only letters')
        .max(50, '*Must be 50 characters or less')
        .required('*Hotel Name Required'),
      dishname:Yup.string()
      .matches(/^[a-zA-Z\s]+$/, '*Dish name should contain only letters')
      .max(50, '*Must be 50 characters or less')
      .required('*Dish Name Required'),
      categories:Yup.string()
      .matches(/^[a-zA-Z\s]+$/, '*Categories should contain only letters')
      .max(15, '*Must be 15 characters or less')
      .required('*Categories Required'),
      discount: Yup.number()
        .min(0, '*Amount must be greater than or equal to 0')
        .max(100, '*Amount must be less than or equal to 100')
        .required('*Discount Value is required'),
      price: Yup.number()
        .min(0, '*Balance Amount must be greater than or equal to 0')
        .max(10000, '*Balance Amount must be less than or equal to 10,000')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
     cuisine:Yup.string()
      .matches(/^[a-zA-Z\s]+$/, '*Cuisine should contain only letters')
      .max(15, '*Must be 15 characters or less')
      .required('*Cuisine Required'),
      id:Yup.number()
      .positive('Id must be positive')
      .moreThan(0, 'Id must be greater than 0')
      .required('*Id is required'),
      userid:Yup.string()
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'User Id must contain both letters and numbers')
      .max(50, '*Must be 50 characters or less')
      .required('*User Id is required'),
      totalbalance:Yup.number()
        .min(0, '*Balance Amount must be greater than or equal to 0')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
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
      .required('*Pincode is required'),
      hotel_id:Yup.number()
      .positive('Id must be positive')
      .moreThan(0, 'Id must be greater than 0')
      .required('*Id is required'),
      adminname: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, '*Admin name should contain only letters')
        .max(50, '*Must be 50 characters or less')
        .required('*Admin Name Required'),
    }),
    amountToPay:Yup.number()
        .min(0, '*Balance Amount must be greater than or equal to 0')
        .test('format', 'Invalid amount format', (value) => {
          return /^\d+(\.\d{1,2})?$/.test(value);
        })
        .required('*Amount is required'),
    userPaymentId:Yup.number()
    .positive('Id must be positive')
    .moreThan(0, 'Id must be greater than 0')
    .required('*Id is required'),
  })

  const onInputChange = (e) => {
    let {value,type,name} = e.target;
    if(name === "discount" || name === "price"){
      setMenuData({...menuData,[name]:Number(value)});
    }else{
      setMenuData({
          ...menuData,
          [name]: type === 'file' ? e.target.files[0] : value,
        });
      }
    formik.handleChange(e);
  };
  
  const onInputValueChange =(e)=>{
    let { value, name } = e.target;
    setUpdatedMenu((prevMenu) => {
      if (name === "discount" || name === "price" || name === "id") {
        return { ...prevMenu, [name]: Number(value) };
      } else if (name === "hotelname") {
        return { ...prevMenu, hotel_name: value };
      } else if (name === "dishname") {
        return { ...prevMenu, dish_name: value };
      } else if (name === "foodtype") {
        return { ...prevMenu, foodType: value };
      } else {
        // Spread the previous state to preserve other properties
        return {
          ...prevMenu,
          [name]: value,
        };
      }
    });
    formik.handleChange(e);
  }

  const onInputDataChange = (e)=>{
    let {value,name,id} = e.target;
      if(id === "id"){
        setUpdateHotelDetail({
          ...updateHotelDetail,
          [name]:Number(value),
      });
    }else if(id === "hotelname"){
      setUpdateHotelDetail({
        ...updateHotelDetail,
        "hotel_name" : value
    });
    }else if(id === "userid"){
      setUpdateHotelDetail({
        ...updateHotelDetail,
        "user_id" : value
    });
    }else if(id === "totalbalance"){
      setUpdateHotelDetail({
        ...updateHotelDetail,
        "total_balance" : Number(value)
    });
    }else if(id === "pincode"){
      setUpdateHotelDetail({
        ...updateHotelDetail,
        "pincode" : Number(value)
    });
    }else{
      setUpdateHotelDetail({
        ...updateHotelDetail,
        [name] : value
    });
    }
    
    formik.handleChange(e);
  }

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setUpdateOrder({...updateOrder,[name]:Number(value)});
  }
  
  const onChangeValue = (e)=>{
    const {id,value} = e.target;
    if(id === "adminname"){
      setUpdatePaymentDetails({...updatePaymentDetails,adminName:value});
    }else{
      setUpdatePaymentDetails({...updatePaymentDetails,amountReceived:Number(value)});
    }
    formik.handleChange(e);
  }

  const onUpdateValue = (e)=>{
    e.preventDefault();
    const{name,value} = e.target;
    setUpdateUserDetails({...updateUserDetails,[name]:Number(value)});
    formik.handleChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("hotel_name",menuData.hotelname);
    dataToSend.append("dish_name",menuData.dishname);
    dataToSend.append("photo",menuData.image);
    dataToSend.append("description",menuData.description);
    dataToSend.append("categories",menuData.categories);
    dataToSend.append("discount",menuData.discount);
    const discountedPrice = Math.floor(menuData.price - ((menuData.discount / 100) * menuData.price));
    dataToSend.append("price",discountedPrice);
    dataToSend.append("cuisine",menuData.cuisine);
    dataToSend.append("foodType",menuData.foodtype);
    axios.post('http://localhost:8002/manageMenu/addMenu', dataToSend,{
        headers:{
            "Content-Type":'multipart/form-data',
        }
    })
      .then(function (response) {
        if(response.data!==null){
          toast.success("Menu Added Successfully!", {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            document.getElementById("menuForm").reset();
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
  
  const submitFormData = (e)=>{
    e.preventDefault();
    axios.put('http://localhost:8002/manageMenu/updateMenu', updatedMenu, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function (response) {
        if(response.data!==""){
          setHotelMenu(response.data);
          toast.success("Menu Updated Successfully!", {
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
          const selectElement = document.getElementById("updateMenu");
          document.querySelector(".updatedMenu #id").value='';
          selectElement.disabled = false;
          for (let i = 1; i < selectElement.options.length; i++) {
            selectElement.options[i].disabled = false;
          }
          }else{
            toast.error("Data not found!", {
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
    axios.put('http://localhost:8002/hotelDetail/updateHotelDetails', updateHotelDetail, {
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
          document.querySelector(".updatedHotelDetail #id").value='';
          setSelectedValues([]);
          const selectElement = document.getElementById("updateHotelProfile");
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

 const handleSubmitData =(e)=>{
    e.preventDefault();
    axios.put('localhost:8002/hotelOrders/updateOrderStatus',updateOrder,{
      headers:{
        "Content-Type":"application/json",
      }
    })
    .then((response)=>{
      if(response.data!==""){
        toast.success("Order Status Updated Successfully!", {
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
        }else{
          toast.error("Data Not Found!", {
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
    .catch((error)=>{
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
    })
    document.querySelector("#orderUpdate .hotel_id").value = "";
 }

 const handlePayment = async(e)=>{
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8005/hotelPayment/hotelCreatePaymentIntent",updatePaymentDetails, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const clientSecret = response.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card:cardElement,
        billing_details: {
          name : updatePaymentDetails.adminName
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

const handleSubmitValue = (e)=>{
  e.preventDefault();
  axios.post('http://localhost:8005/customerPayment/updatePaymentDetails',updatePaymentDetails,{
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then((response)=>{
    if(response.data!==""){
      setHotelMenu(response.data);
      toast.success("Menu Updated Successfully!", {
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
  .catch((error)=>{
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
  localStorage.removeItem("HotelInfo");
  history("/hotel",{replace:true});
 }
 
 useEffect(()=>{
  if(activeTab==="view_menu"){    
    axios.post('http://localhost:8002/manageMenu/getMenu',{"hotel_name": JSON.parse(localStorage.getItem("HotelInfo")).hotel_name},{
      headers:{
        "Content-Type":"application/json",
      }
    })
    .then(response => {
      setHotelMenu(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
//   axios.get('https://api.example.com/data')
//   .then(response => {
//     setViewOrders(response.data);
//     setLoading(false);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

if(activeTab === "view_paymentDetails"){
  axios.get(`http://localhost:8005/customerPayment/getPaymentDetails/${Number(JSON.parse(localStorage.getItem("HotelInfo")).hotel_id)}`,{
    headers:{
      "Content-Type":"application/json",
    }})
  .then(response => {
    setViewPaymentDetails(response.data);
    setLoading(false);
  })
  .catch(error => {
    console.error('Error:', error);
  });
 }

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
},[activeTab])

  return (
    <>
      <div className="container-fluid flex" style={{overflow:'hidden',boxShadow:"20px 0px 0px  grey",position:"relative"}}>
        <div style={{ width: "20%", minHeight:`${activeTab=== "viewProfile"||activeTab=== "addMenu"||(activeTab === "updateMenu" && selectedOptions.length>0)||(activeTab === "updateHotelDetails" && selectedValues.length>0)||activeTab=== "view_menu"?"100%":"100vh"}`,color: "grey", backgroundColor: "black", padding: "25px 0", borderRight: "1px solid lightgrey", position: "fixed" }}>
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
                  <div className='profile-img' style={{backgroundImage:`url(/image/hotel-image/${JSON.parse(localStorage.getItem("HotelInfo")).hotel_image})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
                  </div>
                  <div className='profile-name'>
                    <p style={{fontSize:"18px",fontWeight:"600"}}>HotelName : {JSON.parse(localStorage.getItem("HotelInfo")).hotel_name}</p>
                  </div>
                </div>
                <div className='profile-details'>
                  <ul className='flex flex-col gap-y-[20px]'>
                  <li style={{fontSize:"18px",fontWeight:"600"}}>Id : {JSON.parse(localStorage.getItem("HotelInfo")).hotel_id}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>HotelName : {JSON.parse(localStorage.getItem("HotelInfo")).hotel_name}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>UserId : {JSON.parse(localStorage.getItem("HotelInfo")).user_id}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>Total Balance : {JSON.parse(localStorage.getItem("HotelInfo")).total_balance}</li>
                    <hr />
                    <li style={{fontSize:"18px",fontWeight:"600"}}>Address : {JSON.parse(localStorage.getItem("HotelInfo")).hotelAddress.street +" "+ JSON.parse(localStorage.getItem("HotelInfo")).hotelAddress.area + " "+JSON.parse(localStorage.getItem("HotelInfo")).hotelAddress.pincode}</li>
                    <hr />
                  </ul>
                </div>
              </div>
            </Slide>
          )}
          {activeTab === "addMenu" && (
            <Slide direction='down'>
            <div className='flex flex-col justify-center items-center  mb-8'>
            <div className='mt-[4%]' style={{fontSize:"45px",fontWeight:"700",color:"rgb(201, 25, 25)"}}>Add Menu Form</div>
              <form className='flex flex-col assignOrder mt-[5%]' id="menuForm" onSubmit={handleSubmit}>
                <img src={MenuImg} alt="menu" className="ms-[45%] mb-8" style={{height:"90px",width:"90px"}}/>
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
                <label htmlFor="dishname">Dish Name</label>
                <input
                  id="dishname"
                  name="dishname"
                  type='text'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dishname}
                />
                {formik.touched.dishname && formik.errors.dishname? (
                  <div className="error">{formik.errors.dishname}</div>
                ) : null}

                <label htmlFor='image'>Picture of Dish</label>
                <input
                  id="image"
                  name="image"
                  type='file'
                  onChange={onInputChange}
                  accept="image/*"
                  required
                />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="5" onChange={onInputChange}></textarea>
                <label htmlFor='categories'>Categories</label>
                <input
                    id="categories"
                    name="categories"
                    type="text"
                    onChange={onInputChange}
                    onBlur={formik.handleBlur}
                    placeholder="Examples: pizza,paneer,meat,dosa,sweets,pan..more"
                    value={formik.values.categories}
                    />
                    {formik.touched.categories && formik.errors.categories ? (
                    <div className="error">{formik.errors.categories}</div>
                    ) : null}
                    <label htmlFor='discount'>Discount</label>
                    <input
                    id="discount"
                    name="discount"
                    type="text"
                    onChange={onInputChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discount}
                    />
                    {formik.touched.discount && formik.errors.discount ? (
                    <div className="error">{formik.errors.discount}</div>
                    ) : null}
                    <label htmlFor='price'>Price</label>
                    <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={onInputChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                    <div className="error">{formik.errors.price}</div>
                    ) : null}
                    <label htmlFor='cuisine'>Cuisines</label>
                <input
                    id="cuisine"
                    name="cuisine"
                    type="text"
                    onChange={onInputChange}
                    onBlur={formik.handleBlur}
                    placeholder="Examples: Indian,southindian,bengali,Afgani..more"
                    value={formik.values.cuisine}
                    />
                    {formik.touched.cuisine && formik.errors.cuisine ? (
                    <div className="error">{formik.errors.cuisine}</div>
                    ) : null}
                    <label>Food Type</label>
                    <div className='flex gap-x-[8%]'>
                    <label style={{fontSize:"22px"}}>
                      <input
                        name="foodtype"
                        type="radio"
                        onChange={onInputChange}
                        onBlur={formik.handleBlur}
                        value={"Veg"}
                      /> Veg
                    </label>
                    <label style={{fontSize:"22px"}}>
                      <input
                        name="foodtype"
                        type="radio"
                        onChange={onInputChange}
                        onBlur={formik.handleBlur}
                        value={"Non-Veg"}
                      /> Non-Veg
                    </label>
                    </div>
                    
                <button type='submit'>Submit</button>
              </form>
            </div>
            </Slide>
          )}
          {activeTab === "view_menu" && (
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
                  <TableComponent  dataList = {hotelMenu} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(hotelMenu.length/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "updateMenu" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
              <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update Menu</p>
              <div className='flex justify-center items-center' style={{ width: "100%" }}>
                <p style={{ color: "black", fontSize: "20px" }}>Select fields you want to update(Select Correctly):&nbsp;</p>
                <select name="updateMenu" id="updateMenu" onChange={handleSelectChange}>
                  <option selected disabled>Select Option</option>
                  <option value="hotelname">Hotel Name</option>
                  <option value="dishname">Dish Name</option>
                  <option value="description">Description</option>
                  <option value="categories">Categories</option>
                  <option value="discount">Discount</option>
                  <option value="price">Price</option>
                  <option value="cuisine">Cuisine</option>
                  <option value="foodtype">Food Type</option>
                  <option value="submit">Submit</option>
                </select>
              </div>
              <form className="updateMenu" onSubmit={submitFormData} style={{display:`${selectedOptions.length===0?"none":"block"}`}}>
                <img src={MenuImg} alt="menu" style={{marginLeft:'45%',width:'60px',height:'60px'}}/>
                <div className='flex flex-col pb-5 pt-7'>
                  <label>Menu Id</label>
                  <input id="id" name= "id"
                        onBlur={formik.handleBlur}
                        onChange={onInputValueChange} value={formik.values.id}
                        />
                        {formik.touched.id && formik.errors.id ? (
                        <div className="error">{formik.errors.id}</div>
                        ) : null}
                </div>
                {selectedOptions.map((option, index) => (
                option === "description" ? (
                <div key={index} className='flex flex-col'>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="5" onChange={onInputValueChange}></textarea>
                </div>
                ) : option === "foodtype" ? (
                    <div key={index} className='pt-5'>
                        <label>Food Type</label>
                    <div className='flex gap-x-[8%]'>
                    <label style={{fontSize:"22px"}}>
                    <input
                        name="foodtype"
                        type="radio"
                        onChange={onInputValueChange}
                        onBlur={formik.handleBlur}
                        value={"Veg"}
                    /> Veg
                    </label>
                    <label style={{fontSize:"22px"}}>
                    <input
                        name="foodtype"
                        type="radio"
                        onChange={onInputValueChange}
                        onBlur={formik.handleBlur}
                        value={"Non-Veg"}
                    /> Non-Veg
                    </label>
                    </div>
                    </div>
                ) : option === "submit" ? (
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
                        onChange={onInputValueChange}
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
          {activeTab === "updateHotelDetails" && (
            <Slide direction='down' className='flex flex-col justify-center items-center' style={{ padding: "50px 0" }}>
              <p style={{ fontSize: "50px", fontWeight: "700", color: "rgb(201, 25, 25)" }}>Update Hotel Details</p>
              <div className='flex justify-center items-center' style={{ width: "100%" }}>
                <p style={{ color: "black", fontSize: "20px" }}>Select fields you want to update(Select Correctly):&nbsp;</p>
                <select name="updateHotelProfile" id="updateHotelProfile" onChange={handleSelectValueChange}>
                  <option selected disabled>Select Option</option>
                  <option value="hotelname">Hotel Name</option>
                  <option value="userid">User Id</option>
                  <option value="totalbalance">Amount Received</option>
                  <option value="street">Street</option>
                  <option value="area">Area</option>
                  <option value="city">City</option>
                  <option value="pincode">Pincode</option>
                  <option value="submit">Submit</option>
                </select>
              </div>
              <form className="updateHotelDetail" onSubmit={handleSubmitFormData} style={{display:`${selectedValues.length===0?"none":"block"}`}}>
              <img src={UpdateHotelDetail} alt="update" style={{marginLeft:'45%',width:'60px',height:'60px'}}/>
                <div className='flex flex-col pb-5 pt-7'>
                  <label>Hotel Id</label>
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
          {activeTab === "hotelPayment" && (
            <Slide direction='down'>
              <form className='flex flex-col pb-5 pt-7 mx-auto mt-[5%]' onSubmit={handlePayment}>
              <label htmlFor="adminname">Admin Name : </label>
              <input type="text" name="adminname" id="adminname"
              onBlur={formik.handleBlur}
                onChange={onChangeValue} value={formik.values.adminname}/>
                {formik.touched.adminname && formik.errors.adminname ? (
                  <div className="error">{formik.errors.adminname}</div>
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
            </Slide>
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
                  <TableComponent  dataList = {viewPaymentDetails} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(viewPaymentDetails.length/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "updatePaymentDetails" && (
            <Slide direction='down'>
              <form className="flex mx-auto mt-10" onSubmit={handleSubmitValue}>
                <p className='text-center text-2xl mb-4' style={{fontWeight:"700"}}>Update Payment Details</p>
                <label htmlFor="userPaymentId">Payment Id</label>
                <input id="userPaymentId" name= "userPaymentId"
                  onBlur={formik.handleBlur}
                  onChange={onUpdateValue} value={formik.values.userPaymentId}
                  />
                  {formik.touched.userPaymentId && formik.errors.userPaymentId ? (
                  <div className="error">{formik.errors.userPaymentId}</div>
                  ) : null}
                  <button type='submit'>Submit</button>
              </form>
            </Slide>
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
                  <TableComponent  dataList = {viewDeliveryStatus} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(viewDeliveryStatus.length/10)} onPageChange={handlePageChange}/>
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
                  <TableComponent  dataList = {viewOrders} currentPage={currentPage} itemsPerPage={10}/>
                  <PaginationControls currentPage={currentPage} totalPages={Math.ceil(viewOrders.length/10)} onPageChange={handlePageChange}/>
                </>
              )
            }
            </>
          )}
          {activeTab === "update_order" && (
            <Slide direction='down' className='flex flex-col justify-center items-center mt-[5%]'>
              <p style={{color:"red",fontSize:"30px",fontWeight:"700"}}>Update Order Status</p>
              <form onSubmit={handleSubmitData} id="orderUpdate"> 
                <label htmlFor="hotel_id">Enter Hotel Id</label>
                <input type="text"  id="hotel_id" name="hotel_id"
                  onBlur={formik.handleBlur}
                  onChange={handleInputChange} value={formik.values.id} 
                />
                {formik.touched.hotel_id && formik.errors.hotel_id ? (
                  <div className="error">{formik.errors.hotel_id}</div>
                ) : null}
                <button type='submit'>Submit</button>
              </form>
            </Slide>
          )}
        </div>
        <button id="logout" style={{position:"fixed",top:"2%",right:"2%",padding:"12px 24px",borderRadius:"10px",backgroundColor:"rgb(201, 25, 25)",color:"white",fontWeight:"700"}} onClick={logout}>Logout</button>
      </div>
      <ToastContainer/>
    </>
  );
}

export default HotelComponent;
