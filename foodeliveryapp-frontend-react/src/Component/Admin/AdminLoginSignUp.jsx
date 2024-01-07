import { useState} from 'react';
import BurgerImg from '../../image/burger-img.jpg';
import LogoImg from '../../image/logo.png';
import '../../Css/loginsignup.css';
import {Slide,Fade} from 'react-awesome-reveal';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginSignUpComponent = ()=>{
    const[pageName,setPageName] = useState("login");
    const[adminSignUpData,setAdminSignUpData] = useState({});
    const[adminLogin,setAdminLogin] = useState({});
    const history = useNavigate(null);
    const formik = useFormik({
        initialValues: {
          adminname:'',
          adminpassword:''
        },
        validationSchema: Yup.object({
          adminname: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, '*Name name should contain only letters')
            .max(15, '*Must be 15 characters or less')
            .required('*Name Required'),
          adminpassword: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(20, 'Password must be less than 20 characters')
          .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
          .matches(/[0-9]/, 'Password must include at least one number')
          .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
          .required('*Password Required')
        }),
      })
      const onInputChange = (e)=>{
        const {type,name,value} = e.target;
        setAdminSignUpData({
            ...adminSignUpData,[name]: type === "file" ? e.target.files[0] : value,
        })
        formik.handleChange(e);
      }
      const onInputValueChange = (e)=>{
        const {name,value} = e.target;
        if(name === "name"){
          setAdminLogin({...adminLogin,adminUsername:value});
        }else{
          setAdminLogin({...adminLogin,adminPassword:value});
        }
      }
      const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("adminUsername",adminSignUpData.adminname);
        data.append("adminPassword",adminSignUpData.adminpassword);
        data.append("profilePic",adminSignUpData.profilepic);
        axios.post('http://localhost:8001/adminPanel/adminSignup', data,{
            headers:{
                "Content-Type":'multipart/form-data',
            }
        })
          .then(function (response) {
            if(response.data!==null){
              toast.success('Signup Sucessful!', {
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
                setTimeout(()=>{setPageName('login')},1550);
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
        axios.post('http://localhost:8001/adminPanel/login',adminLogin,{
          headers:{
            "Content-Type":"application/json",
          }
        })
          .then(function (response) {
            if(response.data!==null){
              localStorage.setItem("AdminInfo",JSON.stringify(response.data));
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
                e.target.reset();
                
              setTimeout(()=>{history("/adminDashboard",{replace:true})},1599);
            }else{
              e.target.reset();
              toast.error("Wrong User Id or Password", {
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
    return(
        <>
            {pageName==="login" && (
                <div className='flex mt-[3.5%] ml-[4%]'>
                <div style={{backgroundImage:`url(${BurgerImg})`,backgroundPosition:"center",backgroundSize:"cover",width:"65%"}} className='rounded-lg' />
                <Fade>
                    <div className='mx-8 mt-5 mb-5'> 
                        <div className='flex items-center gap-x-[10px] px-9 pb-3'>
                            <img src={LogoImg} alt="logo" className='w-[50px] h-[50px]' />
                            <p style={{fontSize:"25px",fontWeight:"700",color:"red"}}>Hungry Fleet</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='beforeAfter'>Sign Up</span>
                            <form className="admin-form" style={{width:"100%",border:"none"}} onSubmit={handleSubmitedData}> 
                                <label htmlFor="name">Admin Username</label>
                                <input type="text"
                                id="name"
                                name="name" 
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
                                <Link to="/otpVerification"><p className='mt-3' style={{cursor:"pointer"}} onClick={()=>{localStorage.setItem("owner","admin")}}>Forgot Password?</p></Link>
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
                            <label htmlFor="adminname">Admin Username</label>
                            <input type="text"
                            id='adminname'
                            name='adminname'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.adminname}  
                            />
                            {formik.touched.adminname && formik.errors.adminname ? (
                            <div className="error">{formik.errors.adminname}</div>
                            ) : null}
                            <label htmlFor="adminpassword" className='mt-5'>Password</label>
                            <input type="password" 
                            id='adminpassword'
                            name='adminpassword'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.adminpassword}  
                            />
                            {formik.touched.adminpassword && formik.errors.adminpassword ? (
                            <div className="error">{formik.errors.adminpassword}</div>
                            ) : null}
                            <label htmlFor="profilepic" className='pt-5'>Profile Image</label>
                            <input type="file" name="profilepic" id="profilepic" onChange={onInputChange} accept="image/*" required/>
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
export default AdminLoginSignUpComponent;