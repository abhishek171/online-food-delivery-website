import { useState} from 'react';
import HotelImg from '../../image/hotelbg.png';
import LogoImg from '../../image/logo.png';
import '../../Css/loginsignup.css';
import {Slide,Fade} from 'react-awesome-reveal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HotelLoginSignUpComponent = ()=>{
    const[pageName,setPageName] = useState("login");
    const[hotelSignUpData,setHotelSignUpData] = useState({});
    const[hotelLogin,setHotelLogin] = useState({});  
    const history = useNavigate();
    const formik = useFormik({
        initialValues: {
          hotelname:'',
          userid:'',
          password:'',
          street:'',
          area:'',
          city:'',
          pincode:''
        },
        validationSchema: Yup.object({
          hotelname: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, '*Name name should contain only letters')
            .max(50, '*Must be 50 characters or less')
            .required('*Name Required'),
        userid:Yup.string()
            .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'User Id must contain both letters and numbers')
            .max(25, '*Must be 25 characters or less')
            .required('*User Id is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(20, 'Password must be less than 20 characters')
          .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
          .matches(/[0-9]/, 'Password must include at least one number')
          .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
          .required('*Password is Required'),
        street:Yup.string()
            .required('*Street is Required'),
        area:Yup.string()
            .required('*Area is Required'),
        city:Yup.string()
            .matches(/^[a-zA-Z]+$/, '*City should contain only letters')
            .max(30, '*Must be 30 characters or less')
            .required('*City is Required'),
        pincode:Yup.number()
            .positive('Pincode must be positive')
            .moreThan(0, 'Pincode must be greater than 0')
            .test('is-six-digits', '*Pincode should be of 6 digits', value => value.toString().length === 6)
            .required('*Pincode is required'),
        }),
      })
      const onInputChange = (e)=>{
        const {type,name,value} = e.target;
        if(name === "pincode"){
            setHotelSignUpData({...hotelSignUpData,[name]:Number(value)});
        }else{
            setHotelSignUpData({
                ...hotelSignUpData,[name]: type === "file" ? e.target.files[0] : value,
            })
        }
        formik.handleChange(e);
      }

      const onInputValueChange = (e)=>{
        const {name,value} = e.target;
        setHotelLogin({
            ...hotelLogin,[name]:value
        })
      }
      
      const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("hotel_name",hotelSignUpData.hotelname);
        data.append("user_id",hotelSignUpData.userid);
        data.append("password",hotelSignUpData.password);
        data.append("image",hotelSignUpData.profilepic);
        data.append("street",hotelSignUpData.street);
        data.append("area",hotelSignUpData.area);
        data.append("city",hotelSignUpData.city);
        data.append("pincode",hotelSignUpData.pincode);
        
        axios.post('http://localhost:8002/hotelDetail/signup', data,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
          .then(function (response) {
            if(response.data!==""){
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
                setTimeout(()=>{setPageName('login')},1599);
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

      const handleSubmittedData = (e)=>{
            e.preventDefault();
            const data = {
                "user_id": hotelLogin.userid,"password":hotelLogin.password
            }
            axios.post("http://localhost:8002/hotelDetail/login",data,{
                headers:{
                    "Content-Type":"application/json",
                }
            }).then(function (response) {
                if(response.data!==""){
                    localStorage.setItem("HotelInfo",JSON.stringify(response.data));
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
                    setTimeout(()=>{history('/hotelDashboard',{replace:true})},1599) ;               
                }else{
                    toast.error('Wrong Id or Password!', {
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
                    <div style={{backgroundImage:`url(${HotelImg})`,backgroundPosition:"center left",backgroundRepeat:"no-repeat",backgroundSize:"cover",width:"65%"}} className='h-[550px] rounded-lg'></div>
                    <div className='mx-9 mt-4 mb-5'> 
                        <div className='flex items-center gap-x-[10px] px-[12%] pb-3'>
                            <img src={LogoImg} alt="logo" className='w-[50px] h-[50px]' />
                            <p style={{fontSize:"25px",fontWeight:"700",color:"red"}}>Hungry Fleet</p>
                        </div>
                        <Fade delay={"5s"}>
                            <div className='flex flex-col items-center'>
                                <span className='beforeAfter'>Sign In</span>
                                <form className="admin-form hotel" style={{width:"100%",border:"none"}} onSubmit={handleSubmittedData}> 
                                    <label htmlFor="userid">User Id</label>
                                    <input type="text"
                                    id="userid"
                                    name="userid" 
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
                                    <Link to="/otpVerification"><p className='mt-3' style={{cursor:'pointer'}} onClick={()=>{localStorage.setItem("owner","hotel")}}>Forgot Password?</p></Link>
                                    <button type='submit'>Submit</button>
                                </form>
                                <p>Don't have an account? <span style={{color:"red",cursor:"pointer"}} onClick={()=>{setPageName("signup")}}>Sign Up</span></p>
                            </div>
                        </Fade>
                    </div>
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
                            <label htmlFor="hotelname">Hotel Name</label>
                            <input type="text"
                            id='hotelname'
                            name='hotelname'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hotelname}  
                            />
                            {formik.touched.hotelname && formik.errors.hotelname ? (
                            <div className="error">{formik.errors.hotelname}</div>
                            ) : null}
                            <label className="pt-5" htmlFor="userid">User Id</label>
                            <input type="text"
                            id='userid'
                            name='userid'
                            placeholder='Example: hotel name and Number'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userid}  
                            />
                            {formik.touched.userid && formik.errors.userid ? (
                            <div className="error">{formik.errors.userid}</div>
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
                            <label htmlFor="profilepic" className='pt-5'>Hotel Image</label>
                            <input type="file" name="profilepic" id="profilepic" onChange={onInputChange} accept="image/*" required/>
                            <label htmlFor="street"className="pt-5">Street</label>
                            <input type="text"
                            id='street'
                            name='street'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.street}  
                            />
                            {formik.touched.street && formik.errors.street ? (
                            <div className="error">{formik.errors.street}</div>
                            ) : null}
                            <label htmlFor="area"className="pt-5">Area</label>
                            <input type="text"
                            id='area'
                            name='area'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.area}  
                            />
                            {formik.touched.area && formik.errors.area ? (
                            <div className="error">{formik.errors.area}</div>
                            ) : null}
                            <label htmlFor="city"className="pt-5">City</label>
                            <input type="text"
                            id='city'
                            name='city'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}  
                            />
                            {formik.touched.city && formik.errors.city ? (
                            <div className="error">{formik.errors.city}</div>
                            ) : null}
                            <label htmlFor="pincode"className="pt-5">Pincode</label>
                            <input type="text"
                            id='pincode'
                            name='pincode'
                            onChange={onInputChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pincode}  
                            />
                            {formik.touched.pincode && formik.errors.pincode ? (
                            <div className="error">{formik.errors.pincode}</div>
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
export default HotelLoginSignUpComponent;