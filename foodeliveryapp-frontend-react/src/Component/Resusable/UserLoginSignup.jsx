import {useState,useEffect} from 'react'
import axios from 'axios';
import '../../Css/landingPage.css';
import { Slide } from 'react-awesome-reveal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate , Link} from 'react-router-dom';
const UserLoginSignup = ({ value,toggle,setButtonClicked}) => {
  const [showModal, setShowModal] = useState(false);
  const [createAcc, setCreateAcc] = useState('');
  const[openTab,setOpenTab] = useState("");
  const [count,setCount] = useState(1);
  const [customerSignupData, setCustomerSignupData] = useState({});
  const [custLoginDetails, setCustLoginDetails] = useState({});
  const history = useNavigate();
  
  const formik = useFormik({
      initialValues: {
        name:'',
        password:'',
        phoneno:'',
        street:'',
        area:'',
        city:'',
        pincode:''
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, '*Name name should contain only letters')
          .max(50, '*Must be 50 characters or less')
          .required('*Name Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[0-9]/, 'Password must include at least one number')
        .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
        .required('*Password is Required'),
        phoneno:Yup.number()
        .test('is-ten-digits', '*PhoneNo should be of 10 digits', value => value.toString().length === 10)
        .required('*Phone No is required'),
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
    const {name,value} = e.target;
    if(name === "pincode" || name === "phoneno"){
        setCustomerSignupData({...customerSignupData,[name]:Number(value)});
    }
    else{
        setCustomerSignupData({
            ...customerSignupData,[name]: value,
        })
    }
    formik.handleChange(e);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("custName",customerSignupData.name);
    data.append("custPassword",customerSignupData.password);
    data.append("custPhone",customerSignupData.phoneno);
    data.append("street",customerSignupData.street);
    data.append("area",customerSignupData.area);
    data.append("city",customerSignupData.city);
    data.append("pincode",customerSignupData.pincode);
    axios.post('http://localhost:8003/customerDetails/signup', data,{
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
  const onInputValue = (e)=>{
    const {name,value} = e.target;
    if(name === "phoneno"){
        setCustLoginDetails({...custLoginDetails,custPhone:Number(value)});
    }
    else{
        setCustLoginDetails({
            ...custLoginDetails,custPassword: value,
        })
    }
    formik.handleChange(e);
  }
  const handleSubmitData = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8003/customerDetails/login",custLoginDetails,{
      headers:{
          "Content-Type":"application/json",
      }
  }).then(function (response) {
      if(response.data!==""){
          localStorage.setItem("CustomerInfo",JSON.stringify(response.data));
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
          setTimeout(()=>{history('/menus',{replace:true})},1599) ;       
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
  useEffect(() => {
    if(value !== "" && count > 0){
    setOpenTab(value);
    setShowModal(!showModal);
    setCount(0);
    }
  }, [value,showModal]);

  useEffect(() => {
    if(createAcc === "createAcc"){
      toggle("signup");
      setCount(1);
    }
    if(createAcc === "haveAcc"){
      toggle("login");
      setCount(1);
    }
  }, [createAcc]);
  
  return (
    <>
      {showModal && (
        <div className={"flex justify-end userForm"} style={{ width: "100%", height: "100%", position: "fixed", top: "0", left: "0", zIndex: "999", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <Slide direction={openTab === "login" || openTab === "signup" ? 'right' : 'left'}>
          <div className={"flex flex-col overflow-y-auto"} style={{height:"100%",backgroundColor:"white",position:"relative"}}>
            {openTab === "login"?(
              <div className='flex flex-col justify-start mt-[15%] mx-[5%]'>
                <div className='mx-[12%]'>
                  <p style={{fontSize:"25px",fontWeight:"700"}}>Login</p>
                  <p>or <span style={{color:"rgb(201, 25, 25)",cursor:"pointer"}} onClick={() => {setShowModal(false);setCreateAcc("createAcc");setCount(0);}}>create an account?</span></p>
                </div>
                <form style={{width:"100%",border:"none"}} onSubmit={handleSubmitData}> 
                  <label htmlFor="phoneno">Phone No</label>
                  <input type="text"
                  id="phoneno"
                  name="phoneno" 
                  onChange={onInputValue}
                  required  
                  />
                  <label htmlFor="password" className='mt-5'>Password</label>
                  <input type="password" 
                  id='password'
                  name='password'
                  onChange={onInputValue}
                  required
                  />
                  <Link to="/otpVerification"><p className='mt-3' onClick={()=>{localStorage.setItem("owner","customer")}}>Forgot Password?</p></Link>
                  <button type='submit'>Submit</button>
                </form>
              </div>
            ):<div className='flex flex-col justify-start mt-[15%] mx-[5%]'>
                <div className='mx-[10%]'>
                    <p style={{fontSize:"25px",fontWeight:"700"}}>Signup</p>
                    <p>or <span style={{color:"rgb(201, 25, 25)",cursor:"pointer"}} onClick={() => {setShowModal(false);setCreateAcc("haveAcc");setCount(0);}}>Already had an account?</span></p>
              </div>
              <form className="pt-8" style={{width:"100%",border:"none"}} onSubmit={handleSubmit}>
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
                  <label htmlFor="phoneno" className='pt-5'>Phone No</label>
                <input type="phoneno" 
                id='phoneno'
                name='phoneno'
                onChange={onInputChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneno}  
                />
                {formik.touched.phoneno && formik.errors.phoneno ? (
                <div className="error">{formik.errors.phoneno}</div>
                ) : null}
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
                <button type='submit'>Submit</button>
              </form>
            </div>}
            <button style={{position:"absolute",left:"10%",top:"15px"}} onClick={() => {setShowModal(false);toggle("");setButtonClicked(false);setCount(1)}}><i class="fa fa-close"></i></button>
            </div>
          </Slide>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default UserLoginSignup