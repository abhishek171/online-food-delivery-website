import { useState } from 'react';
import DeliveryImg from '../../image/deliverybg.jpg';
import LogoImg from '../../image/logo.png';
import '../../Css/loginsignup.css';
import {Slide,Fade} from 'react-awesome-reveal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeliveryLoginSignUpComponent = ()=>{
    const[pageName,setPageName] = useState("login");
    const[deliverySignUpData,setDeliverySignUpData] = useState({});
    const[deliveryLogin,setDeliveryLogin] = useState({});
    const history = useNavigate(null);
    const formik = useFormik({
        initialValues: {
          name:'',
          userId:'',
          password:'',
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
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(20, 'Password must be less than 20 characters')
          .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
          .matches(/[0-9]/, 'Password must include at least one number')
          .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
          .required('*Password is Required'),
        contactNo:Yup.number()
            .test('is-ten-digits', '*PhoneNo should be of 10 digits', value => value.toString().length === 10)
            .required('*Phone No is required'),
        }),
      })
      const onInputChange = (e)=>{
        const {name,value} = e.target;
        if(name === "contactNo"){
            setDeliverySignUpData({...deliverySignUpData,[name]:Number(value)});
        }else{
            setDeliverySignUpData({
                ...deliverySignUpData,[name]: value,
            })
        }
        formik.handleChange(e);
      }
      const onInputValueChange = (e)=>{
        const {name,value} = e.target;
        setDeliveryLogin({
            ...deliveryLogin,[name]:value
        })
      }
      const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8004/deliveryPersonInfo/deliveryPersonSignup', deliverySignUpData,{
            headers:{
                "Content-Type":'application/json',
            }
        })
          .then(function (response) {
            if(response.data!==""){
                e.target.reset();
                formik.resetForm();
                toast.success('SignUp Successful!', {
                    position: "top-center",
                    autoClose: 1600,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    });
                setTimeout(()=>{setPageName("login")},1599);
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
      const handleSubmitedData = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8004/deliveryPersonInfo/deliveryPersonLogin',deliveryLogin,{
            headers:{
                "Content-Type": "application/json",
            }
        })
          .then(function (response) {
            if(response.data!==""){
                localStorage.setItem("DeliveryPersonInfo",JSON.parse(response.data));
                e.target.reset();
                toast.success('Login Sucessful!', {
                    position: "top-center",
                    autoClose: 1600,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    });
                setTimeout(()=>{history('/deliveryDashboard')},1599);
            }else{
                toast.error('Wrong User Id or Password!', {
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
            }
          })
          .catch(function (error) {
            toast.error("Menu Added Successfully!", {
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

    return(
        <>
            {pageName==="login" && (
                <div className='flex mt-[3.5%] ml-[4%]'>
                <div style={{backgroundImage:`url(${DeliveryImg})`,backgroundPosition:"center",backgroundSize:"77%",backgroundRepeat:"no-repeat",width:"65%"}} className='rounded-lg' />
                <Fade>
                    <div className='mt-5 mb-5'> 
                        <div className='flex items-center gap-x-[10px] px-9 pb-3'>
                            <img src={LogoImg} alt="logo" className='w-[50px] h-[50px]' />
                            <p style={{fontSize:"25px",fontWeight:"700",color:"red"}}>Hungry Fleet</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='beforeAfter'>Sign Up</span>
                            <form className="admin-form" style={{width:"100%",border:"none"}} onSubmit={handleSubmitedData}> 
                                <label htmlFor="userId">User Id</label>
                                <input type="text"
                                id="userId"
                                name="userId" 
                                onChange={onInputValueChange}
                                required  
                                />
                                <label htmlFor="password" className='mt-5'>Password</label>
                                <input type="password" 
                                id='password'
                                name='password'
                                onChange={onInputValueChange}
                                required
                                />
                                <Link to="/otpVerification"><p className='mt-3' style={{cursor:"pointer"}} onClick={()=>{localStorage.setItem("owner","delivery")}}>Forgot Password?</p></Link>
                                <button type='submit'>Submit</button>
                            </form>
                            <p>Don't have an account? <span style={{color:"red",cursor:"pointer"}} onClick={()=>{setPageName("signup")}}>Sign Up</span></p>
                        </div>
                    </div>
                </Fade>
            </div>
            )}
            {pageName === "signup" && (
                <Slide direction='down'>
                    <div className='mx-auto pt-10 pb-10' style={{width:"60%"}}>
                        <div className='flex justify-center items-center gap-x-[10px] pb-5'>
                            <img src={LogoImg} alt="logo" className='w-[50px] h-[50px]' />
                            <p style={{fontSize:"25px",fontWeight:"700",color:"red"}}>Hungry Fleet</p>
                        </div>
                        <span className='beforeAfter' style={{marginLeft:"46%"}}>Signup</span>
                        <form className="admin-form pt-5" style={{width:"100%",border:"none"}} onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input type="text"
                            id='name'
                            name='name'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}  
                            />
                            {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                            ) : null}
                            <label className="pt-5" htmlFor="userId">User Id</label>
                            <input type="text"
                            id='userId'
                            name='userId'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userId}  
                            />
                            {formik.touched.userId && formik.errors.userId ? (
                            <div className="error">{formik.errors.userId}</div>
                            ) : null}
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
                            <label htmlFor="contactNo"className="pt-5">Mobile Number</label>
                            <input type="text"
                            id='contactNo'
                            name='contactNo'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contactNo}  
                            />
                            {formik.touched.contactNo && formik.errors.contactNo ? (
                            <div className="error">{formik.errors.contactNo}</div>
                            ) : null}
                            <button type='submit' id="signup">Submit</button>
                        </form>
                        <p className=' text-center'>Already have an account? <span style={{color:"red",cursor:"pointer"}} onClick={()=>{setPageName("login")}}>Sign In</span></p>
                    </div>
                </Slide>
            )}
            <ToastContainer/>
        </>
        
    )
}
export default DeliveryLoginSignUpComponent;