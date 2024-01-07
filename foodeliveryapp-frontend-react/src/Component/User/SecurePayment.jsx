import React, { useState,useEffect,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import FooterComponent from './Footer';
import CartCheckoutImg from '../../image/checkout.png';
import { addToCartContext } from '../../context/addtocartcontext';
import LogoImg from '../../image/logo.png';
import UserLoginSignup from '../Resusable/UserLoginSignup';
import EmptyCart from '../../image/empty.webp';
import { useSelector,useDispatch} from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';

const SecurePayment = () => {
  const [buttonClicked,setButtonClicked] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const [custLoginDetails,setCustLoginDetails] = useState("");
  const [addressAdded,setAddressAdded] = useState(false);
  const [paymentMode,setPaymentMode] = useState(false);
  const [display,setDisplay] =  useState(false);
  const [addressDisplay,setAddressDisplay] = useState(false);
  const {state,dispatch} = useContext(addToCartContext);
  const customerDetails = useSelector(state=>state.userDetails);
  const login = useSelector(state=>state.loggedIn);
  const dispatchFunc = useDispatch();
  const history = useNavigate(null);

  localStorage.setItem("Orders",JSON.stringify(state));
  const formik = useFormik({
    initialValues: {
      password:'',
      phoneno:''
    },
    validationSchema: Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be less than 20 characters')
      .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
      .matches(/[0-9]/, 'Password must include at least one number')
      .matches(/[!@#$%^&*]/, 'Password must include at least one special character')
      .required('*Password is Required'),
      phoneno:Yup.number()
      .test('is-ten-digits', '*PhoneNo should be of 10 digits', value => value.toString().length === 10)
      .required('*Phone No is required')
    }),
  })

  const toggle = (value)=>{
    if(value === "login"){
      setButtonClicked("login");
    }else if(value === "signup"){
      setButtonClicked("signup");
    }else{
      setButtonClicked(value);
    }
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
          e.target.reset();
          toast.success('Login SuccessFul!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });   
          dispatchFunc({type:"login",payload:response.data}); 
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

  const passDataToReducer = (dishName,hotelName,price,caseVal)=>{
    if(caseVal === "add"){
      dispatch({type:"ADD_TO_CART",payload:{dishName,quantity: 1,hotelName,price}});
    }else if(caseVal === "remove"){
      dispatch({type:"REMOVE_FROM_CART",payload:{dishName,quantity: 1,hotelName,price}});
    }else if (caseVal === "increase") {
      dispatch({ type: "INCREASE_QUANTITY", payload: { dishName, hotelName, price } });
    }
  
}

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8005/customerPayment/createCheckout",state,
    {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const session_id = await (response.data);
      const stripe = await loadStripe('stripe_publishable_key');
      const result = await stripe.redirectToCheckout({
        sessionId: session_id
      });
      if (result.error) {
        console.log(result.error);
      }else{
        history('/billSummary');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const selectValue = (e)=>{
    setPaymentMode(e.target.value);
  }

  const addAddress = (e)=>{
    if(addressAdded!==false){
      setAddressAdded(prevAddress=>prevAddress + " " +e.target.value);
    }else{
      setAddressAdded(e.target.value);
    }
  }
  
  useEffect(()=>{
    if(customerDetails.length!==0){
      setLoggedIn(login);
    }
  },[customerDetails]);
  
  return (
    <>
      <header style={{width:"100%",position:"relative"}}>
        <nav className='flex justify-between items-center' style={{zIndex:"98",width:"95%",padding:"10px 0",boxShadow:"0 15px 40px -20px rgba(40,44,63,.15)"}}>
          <div className='flex items-center  gap-x-[20px] px-9'>
            <img className="menuLogo" src={LogoImg} alt='logo' style={{ width: '65px', height: '60px'}} />
            <span className='truncate' style={{ fontWeight: '500',fontSize:"20px",width:"25%",cursor:"pointer"}}>
              <span style={{ fontWeight: '500' }}>Address : </span> <u> {localStorage.getItem('UserAddress')}</u>
            </span>
            <i class="fa fa-angle-down" style={{cursor:"pointer",fontWeight: '500'}} onClick={()=>{setAddressDisplay(true);}}></i>
            <div className={`${addressDisplay?"scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${addressDisplay?"block":"none"}`,position:"fixed",padding:"3px",left:"14%",width:"15%",top:"2.5%",zIndex:"10000",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
              <i className='fa fa-close' style={{position:"absolute",right:"10px",cursor:"pointer"}} onClick={()=>{setAddressDisplay(false)}}></i>
              <p style={{fontWeight:"18px",fontWeight: '500'}}>Address : {localStorage.getItem('UserAddress')}</p>
            </div>
          </div>
          <div className='flex items-center menuPage' style={{gap:"10px"}}>
          <i className="fa fa-user-o" style={{fontSize:"25px",position:"relative"}} onClick={()=>{setDisplay(true)}}></i>
            {login ? (
               <div className={`menu_Order_Cart ${display === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${display===true?"block":"none"}`,padding:"10px",left:"87.8%"}}>
                  <i className='fa fa-close' style={{position:"absolute",right:"10px"}} onClick={()=>{setDisplay(false)}}></i>
                  <div className='flex flex-col justify-center'>
                    <p className='pt-4 pb-4' style={{fontWeight:"600"}}>Name : {customerDetails.custName}</p>
                    <hr />
                    <Link to="/userDashBoard"><p className='pb-4 pt-3'>View Profile</p></Link>
                    <hr className='pb-4' />
                    <button style={{backgroundColor:"red",color:"white",fontSize:"18px",fontWeight:"700",padding:"10px 18px"}} onClick={()=>{dispatchFunc({type:"logout"});setLoggedIn(false);}}>Logout</button>
                  </div>

                </div>
            ):(
              <button style={{ color: buttonClicked === "signup" ? 'rgb(218, 21, 21)' : 'inherit', width: '70px', height: '40px',fontWeight: "500",fontSize:"25px"}} onClick={()=>{toggle("signup")}}>
              Signup
            </button>
            )}
          </div>
        </nav>
      </header>
      <main className="flex gap-x-[30px]" style={{width:"100%",padding:"5%",backgroundColor:"#e9ecee"}}>
        {state.totalDishCount!==0 ? (
        <>
          <div className="flex-col" style={{width:"50%"}}>
            <div className='flex-col justify-center items-center p-8' style={{position:'relative',backgroundColor:"white"}}>
              <div className='flex gap-x-[20px]' >
                <div>
                  <p style={{fontSize:"25px",fontWeight:"600"}}>Account</p>
                  <span style={{fontSize:"14px",fontWeight:"500",color:"grey"}}>To place your order now, log into your existing account or sign up.</span>
                </div>
                <div style={{backgroundImage:`url(${CartCheckoutImg})`,width:"100px",height:"100px",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}></div>
              </div>
              <p className=' pb-4'>Enter login details or <span style={{color:"red",cursor:"pointer"}} onClick={()=>{toggle("signup")}}>create an account?</span></p>
              <form style={{width:"75%",border:"none",padding:"0"}} onSubmit={handleSubmitData}> 
                <label htmlFor="phoneno">Phone No</label>
                <input type="text"
                id="phoneno"
                name="phoneno" 
                style={{border:"1px solid lightgrey",padding:"10px 0",paddingLeft:"10px"}}
                onChange={onInputValue}
                required  
                />
                <label htmlFor="password" className='mt-5'>Password</label>
                <input type="password" 
                id='password'
                name='password'
                style={{border:"1px solid lightgrey",padding:"10px 0",paddingLeft:"10px"}}
                onChange={onInputValue}
                required
                />
                <button type='submit' style={{margin:"8% 0",width:"100%",borderRadius:"0",boxShadow:"0px 0px 3px 1px rgba(0, 0, 0, 0.5)"}}>Login</button>
              </form>
              <div style={{position:"fixed",top:`${loggedIn?"7%":"8.4%"}`,left:"3.5%",padding:"5px",backgroundColor:"black"}}><i className='fa fa-user-o text-xl text-white'></i></div>
            </div>
            <div style={{borderLeft: `${loggedIn?"2px dashed #000":"2px dashed grey"}`,height:`${loggedIn?"20.2%":"27.2%"}`,position:"absolute",top:`${loggedIn?"8.5%":"10.2%"}`,left:"4.1%",zIndex:"1"}}></div>
            <div className='flex-col justify-center items-center p-8 mt-10' style={{position:'relative',backgroundColor:"white"}}>
              <p style={{fontSize:"25px",fontWeight:"600"}}>Add a delivery address</p>
              <span style={{fontSize:"14px",fontWeight:"500",color:"grey"}}>You seem to be in the new location</span>
              <div style={{display:`${loggedIn?"block":"none"}`}}>
                <div style={{position:"relative"}}>
                  <i class="fa fa-map-marker text-xl" aria-hidden="true"></i>
                  <p className="flex items-center" style={{position:"fixed",top:"31%",left:"7.9%",height:"20px",width:"20px",padding:"0 4px",paddingBottom:"4px",backgroundColor:"rgb(61, 222, 61)",color:"white",borderRadius:"50%",fontWeight:"700"}}>+</p>
                </div>
                <p style={{fontSize:"18px",fontWeight:"700"}}>Use Same Address</p>
                <p className='pt-3 truncate'>{localStorage.getItem('UserAddress')}</p>
                <button type='submit' style={{width:"60%",borderRadius:"0",margin:"5% 0"}} onClick={()=>{setAddressAdded(localStorage.getItem('UserAddress'))}}>Save and Proceed</button>
                <p style={{fontSize:"25px",fontWeight:"700",marginBottom:"4%"}}>OR</p>
                <p style={{fontSize:"18px",fontWeight:"700"}}>New Address</p>
                <form style={{border:"none",padding:"0"}}>
                  <label htmlFor='address'>Address</label>
                  <input type="text"
                    id="address"
                    name="address" 
                    style={{border:"1px solid lightgrey",padding:"10px 0",paddingLeft:"10px"}}
                    onChange={(e)=>{addAddress(e)}}
                    required  
                  />
                  <label className='mt-3' htmlFor='landmark'>LandMark</label>
                  <input type="text"
                    id="landmark"
                    name="landmark" 
                    style={{border:"1px solid lightgrey",padding:"10px 0",paddingLeft:"10px"}}
                    onChange={(e)=>{addAddress(e)}}
                    required  
                  />
                  <button type='submit' style={{width:"100%",borderRadius:"0",margin:"8% 0"}}>Save and Proceed</button>
                </form>
              </div>
              <div style={{position:"fixed",top:`${loggedIn?"28.7%":"37.5%"}`,left:"3.6%",padding:"7px",backgroundColor:"black"}}><i className='fa fa-map-marker text-xl text-white'></i></div>
            </div>
          </div>
          <div style={{padding:"4% 20px",width:"50%",height:"80%",backgroundColor:"#fff"}}>
            {state.orderFood.map((hotelOrder, index) => (
              <div key={index} className='mt-4'>
                <h2 style={{fontSize:"20px",fontWeight:"800"}}>{hotelOrder.hotelName}</h2>
                {hotelOrder.orders.map((order, orderIndex) => (
                  <div key={orderIndex} className='flex justify-between items-center gap-x-[30px] mb-5 mt-4 p-3' style={{boxShadow:"0px 0px 2px 1px rgba(0, 0, 0, 0.5)"}}>
                    <span style={{fontSize:"18px",fontWeight:"600"}}>{order.dishName}</span>
                    <div className='flex items-center gap-x-[5px]' style={{border:"1px solid rgb(61, 222, 61)"}}>
                      <button className="addToCart" style={{borderRight:"1px solid rgb(61, 222, 61)",padding:"5px 12px",fontSize:"18px",fontWeight:"700"}} onClick={()=>{passDataToReducer(order.dishName,hotelOrder.hotelName,order.price,"increase")}}>+</button>
                      <p style={{padding:"5px 12px",fontSize:"18px",fontWeight:"700"}}>{order.quantity}</p>
                      <button className="removeFromCart" style={{borderLeft:"1px solid rgb(61, 222, 61)",padding:"5px 12px",fontSize:"18px",fontWeight:"700"}} onClick={()=>{passDataToReducer(order.dishName,hotelOrder.hotelName,order.price/order.quantity,"remove")}}>-</button>
                    </div>
                    <span  style={{fontSize:"18px",fontWeight:"600"}}>₹ {Math.ceil(order.price)}</span>
                  </div>
                ))}
              </div>
            ))}
            <hr className="mt-9" style={{border:"1px dashed black"}}/>
            <div className='flex  justify-between items-center pt-4' style={{fontSize:"18px",fontWeight:"700"}}>
              <p>Item Total : </p>
              <p>₹ {state.totalPrice}</p>
            </div>
            <div className='flex  justify-between items-center pt-3' style={{fontSize:"18px",fontWeight:"700"}}>
              <p>Delivery Charges : </p>
              <p>₹ 30</p>
            </div>
            <div className='flex  justify-between items-center pt-4 pb-4' style={{fontSize:"18px",fontWeight:"700"}}>
              <p>GST : </p>
              <p>₹ {Math.ceil(0.08 * state.totalPrice)}</p>
            </div>
            <hr style={{border:"1px dashed black"}}/>
            <div className='flex  justify-between items-center pt-3' style={{fontSize:"18px",fontWeight:"700"}}>
              <div className='flex flex-col pt-3'>
                <p>To Pay :</p>
              </div>
              <span>₹ {Math.ceil(state.totalPrice + 30 + (0.08 * state.totalPrice))}</span>
            </div>
            {loggedIn === true && addressAdded !== false ? (
              <div>
                <form style={{ border: "none", display: "flex", width: "100%", padding: "20px 0" }}>
                  <p style={{ fontSize: "20px", fontWeight: "700" }}>Mode Of Payment</p>
                  <div className='flex items-center gap-x-[15px]'>
                    <input type="radio" name="paymentMode" id="cash" value="cash" onChange={(e) => { selectValue(e) }} />
                    <span>Cash On Delivery</span>
                    <input type="radio" name="paymentMode" id="online" value="online" onChange={(e) => { selectValue(e) }} />
                    <span>Card Payment</span>
                  </div>
                </form>
                {paymentMode !== false ? (
                  paymentMode === "cash" ?(
                  <Link to={`/billSummary/${btoa('cash')}`}><button style={{ backgroundColor: "black", color: "white", padding: "10px 20px", fontWeight: "700", fontSize: "20px", marginLeft: "40%" }}>Place Order</button></Link>
                  ):(<button style={{ backgroundColor: "black", color: "white", padding: "10px 20px", fontWeight: "700", fontSize: "20px", marginLeft: "40%" }} onClick={(e) => { handleSubmit(e) }}>Place Order</button>)
                ) : (
                  null
                )}
              </div>
            ) : (
              null
            )}
          </div>
        </>):(
          <div className='flex flex-col justify-center mx-auto w-100'>
          <div style={{backgroundImage:`url(${EmptyCart})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",width:"100%",height:"400px"}}></div>
          <p className='text-center mt-4' style={{fontSize:"18px",fontWeight:"800"}}>Your Cart is Empty</p>
          <p className='text-center mt-2' style={{fontSize:"12px",color:"grey"}}>You Can go to Menu Page to view more restaurants</p>
          <Link to='/menus'><button className='mt-5 mb-5' style={{width:"100%",backgroundColor:"red",padding:"8px 0",color:"white",fontWeight:"700",borderRadius:"5px"}}>See Restuarants Near You</button></Link>
        </div>
        )}
        
      </main>
      <FooterComponent/>
      <ToastContainer/>
      {buttonClicked && (
        <UserLoginSignup value={buttonClicked} toggle={toggle} setButtonClicked={setButtonClicked} />
      )}
    </>
    
  )
}

export default SecurePayment;