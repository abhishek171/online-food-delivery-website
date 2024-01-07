import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoLoading from './LogoLoading';
import LandindPageImg from '../../image/landingpageimg.jpg';
import LogoImg from '../../image/logo.png';
import NoMinOrder from '../../image/nomin.png';
import LiveTrackOrder from '../../image/livetracking.jpg';
import SpeedDelivery from '../../image/fastdelivery.png';
import SafetyMeasures from '../../videos/safetymeasures.mp4';
import '../../Css/landingPage.css';
import FooterComponent from './Footer';
import UserLoginSignup from '../Resusable/UserLoginSignup';
import { useNavigate,Link} from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
const LandingPageComponent = (value) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [locButtonClicked,setLocButtonClicked] = useState("notclicked");
  const [warning, setWarning] = useState('none');
  const [buttonClicked,setButtonClicked]=useState(false);
  const [display,setDisplay] =  useState(false);
  const customerDetails = useSelector(state=>state.userDetails);
  const login = useSelector(state=>state.loggedIn);
  const dispatchFunc = useDispatch();
  const history = useNavigate(null);
  const arr = [
    'Hungry?',
    'Unexpected Guests?',
    'Game Night?',
    'Cooking Gone Wrong',
    'Movie Marathon',
    'Late Night at Office',
  ];
  const handleReverseGeocode = (latitude,longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    axios
      .get(apiUrl)
      .then((response) => {
        const addressData = response.data;
        if (addressData.address && addressData.address.postcode) {
          localStorage.setItem("UserAddress",addressData.display_name);
          history("/menus");
        } else {
          console.log('No address found for the given coordinates.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  
    };

  const findRestaurant = (e) => {
    if (location === '') {
      setWarning('block');
    }else{
      localStorage.setItem("UserAddress",location);
      history("/menus");
    }
  };
  const toggle = (value)=>{
    if(value === "login"){
      setButtonClicked("login");
    }else if(value === "signup"){
      setButtonClicked("signup");
    }else{
      setButtonClicked(value);
    }
  }
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(()=>{
    if(locButtonClicked === "clicked"){
      const getLocation = async () => {
        try {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              handleReverseGeocode(position.coords.latitude, position.coords.longitude);
            });
          } else {
            alert('Geolocation is not available in your browser.');
          }
        } catch (error) {
          console.error('Error getting location:', error.message);
        }
        setLocButtonClicked("notclicked");
      };
      getLocation();
    }
  },[locButtonClicked]);
  localStorage.removeItem("Menus");
  return (
    <div>
      {loading ? (
        <LogoLoading />
      ) : (
        <div style={{position:"relative",zIndex:"1"}}>
          <div className='container-fluid flex' style={{ height: '600px',width:"100%"}}>
            <div className='flex flex-col gap-y-[25%] pe-5' style={{ backgroundColor: '#FFD580', padding: '50px', width: '55%' }}>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <img src={LogoImg} alt='Logo' style={{ width: '95px', height: '75px' }} />
                  <span style={{ fontSize: '30px', color: 'red', fontWeight: 700 }}>
                    HUNGRY FLEET
                  </span>
                </div>
                {login === true ?(
                  <></>
                ):(
                  <div className='flex items-center'>
                  <button style={{ backgroundColor: buttonClicked === "login" ? 'black' : 'inherit', color: buttonClicked === "login" ? 'white' : 'inherit',fontSize: '18px', width: '90px', height: '40px', fontWeight: 700}} onClick={()=>{toggle("login")}}>
                    Login
                  </button>
                  <button
                    style={{
                      backgroundColor:buttonClicked === false ||buttonClicked === "signup" ? 'black' : 'inherit',
                      color: buttonClicked === false||buttonClicked === "signup" ? 'white' : 'inherit',
                      fontSize: '18px',
                      width: '90px',
                      height: '40px',
                      fontWeight: 600,
                    }}
                    onClick={()=>{toggle("signup")}}
                  >
                    Signup
                  </button>
                  </div>
                )
              }
              </div>
              {arr.map((item, index) => (
                <h1 key={index} className={index === currentIndex ? 'show' : 'hide'}>
                  {item}
                </h1>
              ))}
              <div
                style={{
                  paddingLeft: '6%',
                  color: '#686b78',
                  fontSize: '23px',
                  lineHeight: '40px',
                  width: '100%',
                }}
              >
                Order food from your favorite restaurants near you
              </div>
              <form style={{border:"none"}}>
                <input
                  type='text'
                  id='inputText'
                  placeholder='Enter your pincode'
                  value={location}
                  onChange={(e) => {
                    if(isNaN(e.target.value) === false && String(e.target.value).length<7){
                      setLocation(e.target.value);setWarning("none");
                    }else{
                      setWarning("block");
                    }
                    }} 
                />
                <button type="button" className='flex justify-center items-center' id='locate' onClick={() => {setLocButtonClicked("clicked");}}>
                    <span className='material-symbols-outlined'>point_scan</span> Locate me
                </button>
                <button type="button" id='findFood' onClick={findRestaurant}>Find Food</button>
                <p id='inputEmptyAlert' style={{ display: `${warning}` }}>
                  Enter your pincode
                </p>
              </form>
              <p id='para'>We Deliver Orders for only Borivali West Location </p>
            </div>
            <div
              className='flex justify-end'
              style={{
                backgroundImage: `url(${LandindPageImg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '45%',
                height: '600px',
              }}
            >
              {login && (
              <div className='flex items-center mx-8 mt-5 mainLandPage' style={{gap:"10px",border:"2px solid black",height:"50px",padding:"0 24px"}}>
                <i className="fa fa-user-o " style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>{setDisplay(true)}}></i>
                <div className={`menu_Order_Cart ${display === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${display===true?"block":"none"}`,padding:"10px"}}>
                    <i className='fa fa-close' style={{position:"absolute",right:"10px"}} onClick={()=>{setDisplay(false)}}></i>
                    <div className='flex flex-col justify-center'>
                      <p className='pt-4 pb-4' style={{fontWeight:"600"}}>Name : {customerDetails.custName}</p>
                      <hr />
                      <Link to="/userDashBoard"><p className='pb-4 pt-3'>View Profile</p></Link>
                      <hr className='pb-4' />
                      <button style={{backgroundColor:"red",color:"white",fontSize:"18px",fontWeight:"700",padding:"10px 18px"}} onClick={()=>{dispatchFunc({type:"logout"})}}>Logout</button>
                    </div>
                </div>
              </div>
                )}
              
            </div>
          </div>
          <div className='flex justify-evenly items-center gap-[200px]' style={{width:"100%",padding:"8% 70px ",backgroundColor:"#D27D2D"}}>
            <div className="flex flex-col items-center gap-[20px]" style={{width:"20%"}}>
              <img src={NoMinOrder} alt="nominorder"  style={{width:"225px",height:"200px"}}/>
              <h4>No Minimum Order</h4>
              <p style={{fontSize:"15px",color:"white",textAlign:"center"}}>Order in for yourself or for the group, with no restrictions on order value</p>
            </div>
            <div className="flex flex-col items-center gap-[20px]" style={{width:"20%"}}>
              <img src={LiveTrackOrder} alt="livetrackorder"  style={{width:"225px",height:"200px"}}/>
              <h4>Live Order Tracking</h4>
              <p style={{fontSize:"15px",color:"white",textAlign:"center"}}>Know where your order is at all times, from the restaurant to your doorstep</p>
            </div>
            <div className="flex flex-col items-center gap-[20px]" style={{width:"20%"}}>
              <img src={SpeedDelivery} alt="speeddelivery"  style={{width:"225px",height:"200px"}}/>
              <h4>Lightning-Fast Delivery</h4>
              <p style={{fontSize:"15px",color:"white",textAlign:"center"}}>Experience Swiggy's superfast delivery for food delivered fresh & on time</p>
            </div>
          </div>
          <div style={{backgroundColor:"#F4DFB6",padding:"70px 0"}}>
            <div className='flex justify-center items-center'>
              <video width="700" height="360" controls autoPlay>
                <source src={SafetyMeasures} type="video/mp4"/>
              </video>
            </div>
            <ul className='list-disc flex flex-col' style={{margin:"50px 28%"}} >
              <li>Order Food Online from <span style={{color:"green" ,fontSize:"22px"}}>anywhere at anytime easily.</span></li>
              <li>Temperature of Delivery Boy is measured before handing in order and he/she has to follow Safety Protocol like wearing mask.</li>
              <li><span style={{color:"red"}}>Don't Accept</span> the order if the seal  is opened.</li>
            </ul>
          </div>
          {buttonClicked && (
            <UserLoginSignup value={buttonClicked} toggle={toggle} setButtonClicked={setButtonClicked}/>
          )}
          <FooterComponent/>       
        </div>
      )}
    </div>
  );
};

export default LandingPageComponent;
