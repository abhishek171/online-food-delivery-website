import React, { useState,useEffect,useContext } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  '../../Css/restuarantMenu.css';
import FooterComponent from './Footer';
import { addToCartContext } from '../../context/addtocartcontext';
import LogoImg from '../../image/logo.png';
import EmptyCart from '../../image/empty.webp';
import UserLoginSignup from '../Resusable/UserLoginSignup';
import { useSelector,useDispatch} from 'react-redux';

const RestaurantMenu = () => {
  let {hotelName} = useParams();
  const [menus,setMenus] = useState([]);
  const [isToggled, setToggled] = useState(false);
  const [count,setCount] = useState(0);
  const [buttonClicked,setButtonClicked] = useState(false);
  const [searchValue,setSearchValue] = useState('');
  const [addressDisplay,setAddressDisplay] =  useState(false);
  const [dummySearchVal,setDummnySearchVal] = useState(false);
  const [searchButtonClick,setSearchButtonClicked] = useState(false);
  const itemsPerPage = 10;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const {state,dispatch} = useContext(addToCartContext);
  const [display,setDisplay] = useState(false);
  const [userLogin,setUserLogin] = useState(false);
  const customerDetails = useSelector(state=>state.userDetails);
  const login = useSelector(state=>state.loggedIn);
  const dispatchFunc = useDispatch();

    const handleToggle = () => {
    if(count === 0){
      setToggled(true);
      setCount(count + 1);
    }else{
      setToggled(false);
      setCount(count - 1);
    }
  };

  const handleFocus = () => {
    document.querySelector("#searchbar").style.boxShadow="2px 2px 5px 2px rgba(0, 0, 0, 0.5)";
    document.querySelector("#searchbar").style.border="none";
   };
 
   const handleBlur = () => {
     document.querySelector("#searchbar").style.boxShadow="unset";
     document.querySelector("#searchbar").style.border="1px solid lightgrey";
   };

   const handleSearchData = (e)=>{
    if(e.target.value.trim()!== ""){
      setSearchValue(e.target.value); 
      setDummnySearchVal(true);
    }else{
      setDummnySearchVal(false);
      setSearchValue(""); 
    }
   }

   const handleSeeMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  }

  const fetchData = ()=>{
    axios.get(`http://localhost:8002/manageMenu/getMenuBySearchValue?searchTerm=${searchValue}`)
    .then(function (response) {
      if (response.data !== '') {
        localStorage.setItem("Menus",JSON.stringify(response.data));
        setMenus(JSON.parse(localStorage.getItem("Menus")));
      }
    })
    .catch(function (error) {
      toast.error({ error }, {
        position: 'top-center',
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
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

  const toggle = (value)=>{
    if(value === "login"){
      setButtonClicked("login");
    }else if(value === "signup"){
      setButtonClicked("signup");
    }else{
      setButtonClicked(value);
    }
  }

  useEffect(()=>{
    if(searchButtonClick === true){
      fetchData();
      setSearchButtonClicked(false);
    }
  },[searchButtonClick]);

useEffect(()=>{
  if(searchValue === ""){
    axios.get(`http://localhost:8002/manageMenu/getMenuBySearchValue?searchTerm=${hotelName}`)
    .then(function (response) {
      if (response.data !== '') {
        localStorage.setItem("Menus",JSON.stringify(response.data));
        setMenus(JSON.parse(localStorage.getItem("Menus")));
      }
    })
    .catch(function (error) {
      toast.error({ error }, {
        position: 'top-center',
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    });
  }
},[searchValue]);  

useEffect(()=>{
  return()=>{
    localStorage.removeItem("Menus");
  }
},[])
  return (
    <>
      <header style={{width:"100%",position:"relative"}}>
        <nav className='flex justify-evenly items-center' style={{position:"fixed",top:"0",left:"0",zIndex:"98",width:"100%",padding:"10px 0",boxShadow:"0 15px 40px -20px rgba(40,44,63,.15)"}}>
          <img className="menuLogo" src={LogoImg} alt='logo' style={{ width: '65px', height: '60px'}} />
          <span className="truncate" style={{ fontWeight: '500',width:"15%",fontSize:"20px",cursor:"pointer"}}>
            <span style={{ fontWeight: '500' }}>Address : </span> <u> {localStorage.getItem('UserAddress')}</u>
          </span>
          <i class="fa fa-angle-down" style={{cursor:"pointer"}} onClick={()=>{setAddressDisplay(true);}}></i>
          <div className={`${addressDisplay?"scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${addressDisplay?"block":"none"}`,position:"fixed",padding:"3px",left:"16%",width:"15%",top:"1.5%",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
            <i className='fa fa-close' style={{position:"absolute",right:"10px",cursor:"pointer"}} onClick={()=>{setAddressDisplay(false)}}></i>
            <p style={{fontWeight:"18px",fontWeight: '500'}}>Address : {localStorage.getItem('UserAddress')}</p>
          </div>
          <div className='menuSearchBar' style={{ marginLeft:"20%"}}>
            <input type='search' name="searchbar" id="searchbar" placeholder='Search Food...' onFocus={handleFocus} onBlur={handleBlur} onChange={handleSearchData}/>
            <button onClick={()=>{setSearchButtonClicked(true);}}>
              <i className='fa fa-search'></i>
            </button>
          </div>
          <div className={`p-8 ${dummySearchVal === true?"scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${dummySearchVal===true?"block":"none"}`,position:"absolute",top:"85%",left:"54%",width:"22%",height:"200px",zIndex:"999",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)",overflowY: "scroll"}}>
          {menus.length!=="" ? (
            <div>
              <ul>
                {menus
                  .slice(0, visibleItems)
                  .filter((item) =>
                    item.dish_name.toLowerCase().replace(/ /g, "").includes(
                      searchValue.toLowerCase().replace(/ /g, "")
                    ) ||
                    item.categories.toLowerCase().replace(/ /g, "").includes(
                      searchValue.toLowerCase().replace(/ /g, "")
                    ) ||
                    item.cuisine.toLowerCase().replace(/ /g, "").includes(
                      searchValue.toLowerCase().replace(/ /g, "")
                    ) ||
                    item.foodType.toLowerCase().replace(/ /g, "").includes(
                      searchValue.toLowerCase().replace(/ /g, "")
                    )
                  )
                  .map((item) => (
                    <li
                      className="flex items-center gap-x-[15px] pb-4"
                      key={item.menu_id}
                      style={{cursor:'pointer'}}
                      onClick={() => {
                        document.getElementById("searchbar").value = `${item.dish_name}`;
                        setSearchValue(`${item.dish_name}`);
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(/image/menu-image/${item.photo})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          height: "40px",
                          width: "40px",
                        }}
                      ></div>
                      <p>{item.dish_name || item.categories}</p>
                    </li>
                  ))}
              </ul>
              {visibleItems < menus.length && (
                <button
                  onClick={handleSeeMore}
                  style={{
                    backgroundColor: " #007bff",
                    marginLeft: "45%",
                    color: "white",
                    padding: "8px",
                  }}
                >
                  See More
                </button>
              )}
            </div>
            ) : null}
          </div>
          <div className='flex items-center menuPage' style={{gap:"10px"}}>
          <i className="fa fa-user-o" style={{fontSize:"25px",position:"relative"}} onClick={()=>{setUserLogin(true)}}></i>
            {login ? (
              <div className={`menu_Order_Cart ${userLogin === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${userLogin ===true?"block":"none"}`,padding:"10px",left:"87.8%"}}>
                  <i className='fa fa-close' style={{position:"absolute",right:"10px"}} onClick={()=>{setUserLogin(false)}}></i>
                  <div className='flex flex-col justify-center'>
                    <p className='pt-4 pb-4' style={{fontWeight:"600"}}>Name : {customerDetails.custName}</p>
                    <hr />
                    <Link to="/userDashBoard"><p className='pb-4 pt-3'>View Profile</p></Link>
                    <hr className='pb-4' />
                    <button style={{backgroundColor:"red",color:"white",fontSize:"18px",fontWeight:"700",padding:"10px 18px"}} onClick={()=>{dispatchFunc({type:"logout"})}}>Logout</button>
                  </div>
                </div>
            ):(
              <button style={{ color: buttonClicked === "signup" ? 'rgb(218, 21, 21)' : 'inherit', width: '70px', height: '40px',fontWeight: "500",fontSize:"25px"}} onClick={()=>{toggle("signup")}}>
              Signup
            </button>
            )}
          </div>
          <div className='flex items-center menuPage addtocart' style={{gap:"12px",position:"relative",cursor:"pointer"}} onClick={()=>{setDisplay(true)}}> 
            <i className="fa fa-shopping-cart" style={{fontSize:"30px"}}></i>
            <span style={{position:"fixed",top:"0.75%",right:"8.3%",fontSize:"12px",color:"white",zIndex:"5000",fontWeight:"700"}}>{state.totalDishCount}</span>
            <button className='menuPage' style={{fontSize:"25px",fontWeight:"500"}}>Cart</button>
          </div>
          <div className={`menu_Order_Cart ${display === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${display===true?"block":"none"}`,padding:"10px",left:`${state.totalDishCount === 0?"77%":"73%"}`}}>
           <i className='fa fa-close' style={{position:"absolute",right:"10px"}} onClick={()=>{setDisplay(false)}}></i>
          {state.totalDishCount!==0 ? (
            <>
              {state.orderFood.map((hotelOrder, index) => (
                <div key={index} className='mt-4'>
                  <h2 style={{fontSize:"20px",fontWeight:"800"}}>{hotelOrder.hotelName}</h2>
                  {hotelOrder.orders.map((order, orderIndex) => (
                    <div key={orderIndex} className='flex  justify-between items-center gap-x-[10px] mb-5 mt-4 p-3' style={{borderRadius:"5px",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
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
              <div>-------------------------------------------------</div>
              <div className='flex  justify-between items-center pt-3' style={{fontSize:"18px",fontWeight:"700"}}>
                <div className='flex flex-col pt-3'>
                  <p>Sub Total:</p>
                  <p style={{fontSize:"12px",fontWeight:"400",color:"grey"}}>Extra charges may apply</p>
                </div>
                <span>₹ {state.totalPrice}</span>
              </div>
             <Link to="/secureCheckout"><button className='mt-5 mb-5 checkout' style={{width:"100%",backgroundColor:"red",padding:"8px 0",color:"white",fontSize:"18px",fontWeight:"700",borderRadius:"5px"}}>CheckOut</button></Link> 
            </>
          ):(
            <>
              <div style={{backgroundImage:`url(${EmptyCart})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",width:"100%",height:"200px"}}></div>
              <p className='text-center mt-4' style={{fontSize:"18px",fontWeight:"800"}}>Your Cart is Empty</p>
              <p className='text-center mt-2' style={{fontSize:"12px",color:"grey"}}>You Can go to Menu Page to view more restaurants</p>
              <Link to='/menus'><button className='mt-5 mb-5' style={{width:"100%",backgroundColor:"red",padding:"8px 0",color:"white",fontWeight:"700",borderRadius:"5px"}}>See Restuarants Near You</button></Link>
            </>

          )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto" style={{padding:"10%"}}>
        <div>
          <p className='pb-5 font-bold text-2xl'>{hotelName}</p>
          <hr  style={{borderBottom:"1px dotted black"}}/>
          <div className='flex items-center gap-x-[15px]'>
            <div className={`flex items-center mt-8 mb-8`} style={{width:"4.5%",height:"20px",backgroundColor:`${isToggled?"rgb(61, 222, 61)":"white"}`,borderRadius:"15px",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)",transitionDuration:"0.8s"}}>
              <button className={`${isToggled?"animStart":"animEnd"}`} style={{borderRadius:"50%",height:"20px",width:"20px",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={()=>{handleToggle()}}></button>
            </div>
            <p>Veg Only</p>
          </div>
          <hr  style={{borderBottom:"10px solid lightgrey"}}/>
          <p className='px-[3%] pt-5' style={{fontSize:"20px",fontWeight:"700"}}>Menus :</p>
          {menus.length !== 0 ? (
            (isToggled === true ? (
              menus.filter((items)=>{
                return items.foodType === "Veg";
              }).map((item,index) => (
                <>
                  <div key={index} className='flex justify-between items-center m-[3%]'>
                    <div>
                    {item.foodType === "Veg" ?
                      (
                      <div className="flex justify-center items-center" style={{height:"15px",width:"15px",border:"1px solid rgb(61, 222, 61)",padding:"3px"}}>
                        <div style={{backgroundColor:"rgb(61, 222, 61)",height:"8px",width:"8px",borderRadius:"50%"}}></div>
                      </div>
                      ):(
                        <div className="flex justify-center items-center" style={{height:"15px",width:"15px",border:"1px solid brown",padding:"3px"}}>
                          <div style={{backgroundColor:"red",height:"8px",width:"8px",borderRadius:"50%"}}></div>
                        </div>
                      )
                    }
                    <p className='text-lg font-[600] pt-2'>{item.dish_name}</p>
                    <p className='text-base font-[600] pt-1'>₹ {item.price}</p>
                    <p className='text-sm pt-2' style={{color:"rgb(145, 144, 144)"}}>{item.description}</p>
                    </div>
                    <div className='flex justify-center items-end' style={{width:"18%",height:"130px", backgroundImage:`url(/image/menu-image/${item.photo})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",borderRadius:"15px",boxShadow:"0px 0px 5px 1px rgba(0, 0, 0, 0.5)"}}>
                      <button style={{backgroundColor:"rgb(61, 222, 61)",color:'white',fontSize:"15px",fontWeight:"600",padding:"5px 15px",borderRadius:"5px"}} onClick={()=>{passDataToReducer(item.dish_name,item.hotel_name,item.price,"add")}}>Add +</button>
                    </div>
                  </div>
                  <hr style={{backgroundColor:"lightgrey"}}/>
                </>
              ))
            ) : (
              menus.map((item,index) => (
                <>
                  <div key={index} className='flex justify-between items-center m-[3%]'>
                    <div>
                    {item.foodType === "Veg" ?
                      (
                      <div className="flex justify-center items-center" style={{height:"15px",width:"15px",border:"1px solid rgb(61, 222, 61)",padding:"3px"}}>
                        <div style={{backgroundColor:"rgb(61, 222, 61)",height:"8px",width:"8px",borderRadius:"50%"}}></div>
                      </div>
                      ):(
                        <div className="flex justify-center items-center" style={{height:"15px",width:"15px",border:"1px solid brown",padding:"3px"}}>
                          <div style={{backgroundColor:"red",height:"8px",width:"8px",borderRadius:"50%"}}></div>
                        </div>
                      )
                    }
                    <p className='text-lg font-[600] pt-2'>{item.dish_name}</p>
                    <p className='text-base font-[600] pt-1'>₹ {item.price}</p>
                    <p className='text-sm pt-2' style={{color:"rgb(145, 144, 144)"}}>{item.description}</p>
                    </div>
                    <div className='flex justify-center items-end' style={{width:"18%",height:"130px", backgroundImage:`url(/image/menu-image/${item.photo})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",borderRadius:"15px",boxShadow:"0px 0px 5px 1px rgba(0, 0, 0, 0.5)"}}>
                      <button style={{backgroundColor:"rgb(61, 222, 61)",color:'white',fontSize:"15px",fontWeight:"600",padding:"5px 15px",borderRadius:"5px"}} onClick={()=>{passDataToReducer(item.dish_name,item.hotel_name,item.price,"add");
                      toast.success("Added to cart successfully!", {
                        position: 'top-center',
                        autoClose: 1600,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'colored',
                      });}}>Add +</button>
                    </div>
                  </div>
                  <hr style={{backgroundColor:"lightgrey"}}/>
                </>
              ))
            ))
          ) : (
            <div style={{ background: "white", width: "100%", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
              <div style={{display:"flex"}}>
                <p style={{color:"black",fontSize:"80px",fontWeight:"700"}}>Loading</p>
                <div className="spinner pt-7">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterComponent/>
      {buttonClicked && (
        <UserLoginSignup value={buttonClicked} toggle={toggle} setButtonClicked={setButtonClicked} />
      )}
      <ToastContainer/>
    </>
  )
}

export default RestaurantMenu;