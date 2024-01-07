import React from 'react'
import { useState} from 'react';
import HotelImg from '../../image/hotelbg.png';
import LogoImg from '../../image/logo.png';
import '../../Css/loginsignup.css';
import {Slide} from 'react-awesome-reveal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdatePassword = () => {
  const[updateData,setUpdateData] = useState({});
  const history = useNavigate(null);
  const formik = useFormik({
    initialValues: {
      id:'',
      phoneno:'',
      password:'',
      confirmPassword:''
    },
    validationSchema: Yup.object({
      id:Yup.number()
      .positive('Id must be positive')
      .moreThan(0, 'Id must be greater than 0')
      .required('*Id is required'),
      phoneno:Yup.number()
      .test('is-ten-digits', '*PhoneNo should be of 10 digits', value => value.toString().length === 10)
      .required('*Phone No is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[0-9]/, 'Password must include at least one number')
        .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
        .required('*Password is Required'),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('*Confirm Password is Required'),
      }),
  })
  const onInputChange = (e)=>{
    const {name,value} = e.target;
    if(name === "id"){
      if(localStorage.getItem("owner") === "admin"){
        setUpdateData({...updateData,adminId:Number(value)});
      }else if(localStorage.getItem("owner") === "hotel"){
        setUpdateData({...updateData,id:Number(value)});
      }
    }else if(name === "phoneno"){
      if(localStorage.getItem("owner") === "customer"){
        setUpdateData({...updateData,custPhone:Number(value)});
      }else if(localStorage.getItem("owner") === "delivery"){
        setUpdateData({...updateData,contactNo:Number(value)});
      }
    }
    else if(name === "password"){
      if(localStorage.getItem("owner") === "admin"){
        setUpdateData({...updateData,adminPassword : value});
      }else if(localStorage.getItem("owner") === "hotel" || localStorage.getItem("owner") === "delivery"){
        setUpdateData({...updateData,[name] : value});
      }else if(localStorage.getItem("owner") === "customer"){
        setUpdateData({...updateData,custPassword : value});
      }
    }
    formik.handleChange(e);
  }
      
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(localStorage.getItem("owner") === "admin"){
      axios.put('http://localhost:8001/adminPanel/adminDetails',updateData,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((response)=>{
        if(response.data!==null){
          e.target.reset();
          formik.resetForm();
          toast.success('Password Updated Successfully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
          localStorage.removeItem("owner");
          setTimeout(()=>{history('/admin',{replace:true})},1599) ; 
        }
      })
      .catch((error)=>{
        toast.error(error, {
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
    }else if(localStorage.getItem("owner") === "hotel"){
      axios.put('http://localhost:8002/hotelDetail/updateHotelDetails',updateData,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((response)=>{
        if(response.data!==null){
          e.target.reset();
          formik.resetForm();
          toast.success('Password Updated Successfully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            localStorage.removeItem("owner");
            setTimeout(()=>{history('/hotel',{replace:true})},1599) ; 
        }
      })
      .catch((error)=>{
        toast.error(error, {
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
    }else if(localStorage.getItem("owner") === "customer"){
      axios.put('http://localhost:8003/customerDetails/updateUserDetails',updateData,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((response)=>{
        if(response.data!==null){
          e.target.reset();
          formik.resetForm();
          toast.success('Password Updated Successfully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            localStorage.removeItem("owner");
          setTimeout(()=>{history('/menus',{replace:true})},1599) ; 
        }
      })
      .catch((error)=>{
        toast.error(error, {
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
    }else if(localStorage.getItem("owner") === "delivery"){
      axios.put('http://localhost:8004/deliveryPersonInfo/updateDeliveryPersonDetails',updateData,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((response)=>{
        if(response.data!==null){
          e.target.reset();
          formik.resetForm();
          toast.success('Password Updated Successfully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
            localStorage.removeItem("owner");
          setTimeout(()=>{history('/delivery',{replace:true})},1599) ; 
        }
      })
      .catch((error)=>{
        toast.error(error, {
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
    }
  }
  
  return (
    <>
      <Slide direction='down'>
        <div className='mx-auto pt-10 pb-10' style={{width:"60%"}}> 
            <div className='flex justify-center items-center gap-x-[10px] pb-5'>
                <img src={LogoImg} alt="logo" className='w-[50px] h-[50px]' />
                <p style={{fontSize:"25px",fontWeight:"700",color:"red"}}>Hungry Fleet</p>
            </div>
            <span className='beforeAfter' style={{marginLeft:"46%"}}>Update Password</span>
            <form className="admin-form pt-5" style={{width:"100%",border:"none"}} onSubmit={handleSubmit}>
              {localStorage.getItem("owner") === "admin" || localStorage.getItem("owner") === "hotel" && (
                <>
                  <label htmlFor="id"> {`${localStorage.getItem("owner") === "admin"? "Admin Id":"Hotel Id"}`} </label>
                  <input type="text"
                  id='id'
                  name='id'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.id}  
                  />
                  {formik.touched.id && formik.errors.id ? (
                  <div className="error">{formik.errors.id}</div>
                  ) : null}
                </>
              )}
              {localStorage.getItem("owner") === "customer" || localStorage.getItem("owner") === "delivery" && (
                <>
                  <label htmlFor="phoneno">Phone No</label>
                  <input type="tel"
                  id='phoneno'
                  name='phoneno'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneno}  
                  />
                  {formik.touched.phoneno && formik.errors.phoneno ? (
                  <div className="error">{formik.errors.phoneno}</div>
                  ) : null}
              </>
              )}
                <label htmlFor="password" className='pt-5'>Password</label>
                <input type="password" 
                id='password'
                name='password'
                onChange={onInputChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}  
                />
                {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
                ) : null}
                <label htmlFor="confirmPassword" className='pt-5'>Confirm Password</label>
                <input
                  type="password"
                  id='confirmPassword'
                  name='confirmPassword'
                  onChange={onInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
                <button type='submit' id="signup">Submit</button>
            </form>
        </div>
      </Slide>
      <ToastContainer/>
    </>
  )
}

export default UpdatePassword