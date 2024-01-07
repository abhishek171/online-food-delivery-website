import React, {useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../../image/logo.png';
import '../../Css/menu.css';
import UserLoginSignup from '../Resusable/UserLoginSignup';
import Slider from "react-slick";
import _debounce from "lodash/debounce";
import PizzaImg from '../../image/pizza.jpg';
import PastaImg from '../../image/pasta.jpg';
import NoodlesImg from '../../image/noodles.jpg';
import IdliDosaImg from '../../image/idlidosa.webp';
import CakeImg from '../../image/chocolatecake.webp';
import BiryaniImg from '../../image/biryani.jpg';
import BengaliFoofImg from '../../image/bengalisweet.jpg';
import ChaatsImg from '../../image/chats.jpg';
import PavBhajiImg from '../../image/pavbhaji.jpg';
import NonVegImg from '../../image/nonveg.jpg';
import PanImg from '../../image/pan.jpg';
import PaneerImg from '../../image/paneer.webp';
import SafetyImg from '../../image/maxsafety.webp';
import EmptyCart from '../../image/empty.webp';
import FooterComponent from './Footer';
import '../../Css/logoLoading.css';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { addToCartContext } from '../../context/addtocartcontext';
import { useSelector,useDispatch} from 'react-redux';
const MenuPage = () => {
  const [buttonClicked,setButtonClicked] = useState('');
  const [filterStyle,setFilterStyle] = useState("");
  const itemsPerPage = 10;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [searchValue,setSearchValue] = useState('');
  const [dummySearchVal,setDummnySearchVal] = useState("");
  const [searchTerm,setSearchTerm] = useState('');
  const [cardClicked,setCardClicked] = useState(false);
  const [searchButtonClick,setSearchButtonClicked] = useState(false);
  const [searching,setSearching] =useState(false);
  const [filterApplied,setFilterApplied] = useState(new Set());
  const [openDropDown,setOpenDropDown] = useState(false);
  const [count,setCount] = useState(0);
  const [handleCount,setHandleCount] = useState(0);
  const [display,setDisplay] = useState(false);
  const [userLogin,setUserLogin] = useState(false);
  const [menus,setMenus] = useState([]);
  const [addressDisplay,setAddressDisplay] = useState(false);
  const {state,dispatch} = useContext(addToCartContext);
  const customerDetails = useSelector(state=>state.userDetails);
  const login = useSelector(state=>state.loggedIn);
  const dispatchFunc = useDispatch();
  let sortedMenu;
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    
  };

  const handleFocus = () => {
   document.querySelector(".menuSearch").style.boxShadow="2px 2px 5px 2px rgba(0, 0, 0, 0.5)";
   document.querySelector(".menuSearch").style.border="none";
  };

  const handleBlur = () => {
    document.querySelector(".menuSearch").style.boxShadow="unset";
    document.querySelector(".menuSearch").style.border="1px solid lightgrey";
  };

  const handleInputFocus = () => {
    document.querySelector("#filterSearch").style.boxShadow="2px 2px 5px 2px rgba(0, 0, 0, 0.5)";
    document.querySelector("#filterSearch").style.border="none";
   };
 
   const handleInputBlur = () => {
     document.querySelector("#filterSearch").style.boxShadow="unset";
     document.querySelector("#filterSearch").style.border="1px solid lightgrey";
   };

   const handleSearchData = (e)=>{
    if(e.target.value.trim()!== ""){
      if(searchValue === ""){
        setSearchValue(e.target.value);
        setDummnySearchVal(e.target.value);
        setCount(count + 1);
        setSearching(true);
      }else{
        setSearchValue(e.target.value); 
        setDummnySearchVal(e.target.value);
      }
    }else{
      setDummnySearchVal("");
      setSearching(true);
    }
   }
   
   const handleSearch = (e)=>{
    if(e.target.value.trim()!==""){
      if(searchValue === "" && filterApplied.length!==0){
        setSearchValue(e.target.value);
        setSearchTerm(e.target.value);
        setCount(count + 1);
      }else{
        setSearchValue(e.target.value);
        setSearchTerm(e.target.value);
      }
    }else{
      setSearchTerm("");
    }
   }
   
   const cardClick = (value)=>{
    if(value.trim()!==null){
      if(searchValue === "" && filterApplied.length!==0){
        setSearchValue(value);   
        setCardClicked(true);
        setCount(count + 1);
      }else{
        setSearchValue(value);   
        setCardClicked(true);
      }
    }  
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

  const handleSeeMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  }

  const addFilter = (e)=>{
    const updatedValues = new Set(filterApplied);
    if (e.target.value === 'min' && updatedValues.has('max')) {
      updatedValues.delete('max');
      updatedValues.add('min');
      setFilterApplied(Array.from(updatedValues));
      localStorage.setItem("filterApplied",JSON.stringify(Array.from(updatedValues)));
    } else if (e.target.value === 'max' && updatedValues.has('min')) {
      updatedValues.delete('min');
      updatedValues.add('max'); 
      setFilterApplied(Array.from(updatedValues));
      localStorage.setItem("filterApplied",JSON.stringify(Array.from(updatedValues)));
    } else if(e.target.value === "range100-300" && updatedValues.has("range300-800")){
      updatedValues.delete("range300-800");
      updatedValues.add("range100-300");
      localStorage.setItem("dataTrack","range300-800");
      setFilterApplied(Array.from(updatedValues));
      localStorage.setItem("filterApplied",JSON.stringify(Array.from(updatedValues)));
    }else if(e.target.value === "range300-800" && updatedValues.has("range100-300")){
      updatedValues.delete("range100-300");
      updatedValues.add("range300-800");
       localStorage.setItem("dataTrack","range100-300");
       setFilterApplied(Array.from(updatedValues));
       localStorage.setItem("filterApplied",JSON.stringify(Array.from(updatedValues)));
    }else {
      updatedValues.add(e.target.value);
      localStorage.removeItem("dataTrack");
      setFilterApplied(Array.from(updatedValues));
      localStorage.setItem("filterApplied",JSON.stringify(Array.from(updatedValues)));
    }
    setCount(count + 1);
    applyFilter();
  }

  const applyFilter = ()=>{
      let data = JSON.parse(localStorage.getItem("filterApplied"));  
      if(data.includes("min")){
        sortedMenu = menus.sort((a,b)=>a.price - b.price);
        setMenus(sortedMenu);
        if(data.includes("range100-300")){
          if(localStorage.getItem("dataTrack") === "range300-800"){
            axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
            .then(function (response) {
              if (response.data !== '') {
                  sortedMenu = response.data.filter((items)=>{
                  return items.price >= 100 && items.price <= 300;
                })
                setMenus(sortedMenu);
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
          }else{
            sortedMenu = menus.filter((items)=>{
              return items.price >= 100 && items.price <= 300
            });
            setMenus(sortedMenu);
          }
        }else if(data.includes("range300-800")){
          if(localStorage.getItem("dataTrack") === "range100-300"){
            axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
            .then(function (response) {
              if (response.data !== '') {
                sortedMenu = response.data.filter((items)=>{
                  return items.price >= 300 && items.price <= 800;
                })
                setMenus(sortedMenu);
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
          }else{
            sortedMenu = menus.filter((items)=>{
              return items.price >= 300 && items.price <= 800;
            });
            setMenus(sortedMenu);
          }
        }else if(data.includes("veg")){
          sortedMenu = menus.filter((items)=>{
            return items.foodType === "Veg";
          });
          setMenus(sortedMenu);
        }
      }else if(data.includes("max")){
          sortedMenu = menus.sort((a,b)=>b.price - a.price);
          setMenus(sortedMenu);
          if(data.includes("range100-300")){
            if(localStorage.getItem("dataTrack") === "range300-800"){
              axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
              .then(function (response) {
                if (response.data !== '') {
                    sortedMenu = response.data.filter((items)=>{
                    return items.price >= 100 && items.price <= 300;
                  })
                  setMenus(sortedMenu);
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
            }else{
              sortedMenu = menus.filter((items)=>{
                return items.price >= 100 && items.price <= 300
              });
              setMenus(sortedMenu);
            }
          }else if(data.includes("range300-800")){
            if(localStorage.getItem("dataTrack") === "range100-300"){
              axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
              .then(function (response) {
                if (response.data !== '') {
                  sortedMenu = response.data.filter((items)=>{
                    return items.price >= 300 && items.price <= 800;
                  })
                  setMenus(sortedMenu);
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
            }else{
              sortedMenu = menus.filter((items)=>{
                return items.price >= 300 && items.price <= 800;
              });
              setMenus(sortedMenu);
            }
          }else if(data.includes("veg")){
            sortedMenu = menus.filter((items)=>{
              return items.foodType === "Veg";
            });
            setMenus(sortedMenu);
          }
      }else if(data.includes("veg")){
          sortedMenu = menus.filter((items)=>{
            return items.foodType === "Veg";
          });
          setMenus(sortedMenu);
          if(data.includes("range100-300")){
            if(localStorage.getItem("dataTrack") === "range300-800"){
              axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
              .then(function (response) {
                if (response.data !== '') {
                    sortedMenu = response.data.filter((items)=>{
                    return items.price >= 100 && items.price <= 300;
                  })
                  setMenus(sortedMenu);
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
            }else{
              sortedMenu = menus.filter((items)=>{
                return items.price >= 100 && items.price <= 300
              });
              setMenus(sortedMenu);
            }
          }else if(data.includes("range300-800")){
            if(localStorage.getItem("dataTrack") === "range100-300"){
              axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
              .then(function (response) {
                if (response.data !== '') {
                  sortedMenu = response.data.filter((items)=>{
                    return items.price >= 300 && items.price <= 800;
                  })
                  setMenus(sortedMenu);
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
            }else{
              sortedMenu = menus.filter((items)=>{
                return items.price >= 300 && items.price <= 800;
              });
              setMenus(sortedMenu);
            }
          }
      }else if(data.includes("range100-300")){
        if(data.indexOf("range100-300") === 0){
          if(localStorage.getItem("dataTrack") === "range300-800"){
            axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
            .then(function (response) {
              if (response.data !== '') {
                  sortedMenu = response.data.filter((items)=>{
                  return items.price >= 100 && items.price <= 300;
                })
                setMenus(sortedMenu);
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
          }else{
            sortedMenu = menus.filter((items)=>{
              return items.price >= 100 && items.price <= 300
            });
            setMenus(sortedMenu);
          }
        }
      }else if(data.includes("range300-800")){
        if(data.indexOf("range300-800") === 0){
          if(localStorage.getItem("dataTrack") === "range100-300"){
            axios.get(`http://localhost:8002/manageMenu/getAllMenus`)
            .then(function (response) {
              if (response.data !== '') {
                sortedMenu = response.data.filter((items)=>{
                  return items.price >= 300 && items.price <= 800;
                })
                setMenus(sortedMenu);
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
          }else{
            sortedMenu = menus.filter((items)=>{
              return items.price >= 300 && items.price <= 800;
            });
            setMenus(sortedMenu);
          }
        }
      }
      localStorage.setItem("Menus",JSON.stringify(sortedMenu));
  }

  const removeFilter = (index) =>{
    if(searchValue === ""){
      const updatedFilterApplied = [...filterApplied];
      updatedFilterApplied.splice(index, 1);
      setFilterApplied(updatedFilterApplied);
      if(filterApplied.length === 1){
        setFilterApplied(new Set());
        setHandleCount(handleCount + 1);
        localStorage.removeItem("filterApplied");
      }else {
        setHandleCount(handleCount + 1);
      }
    }else{
      const updatedFilterApplied = [...filterApplied];
      updatedFilterApplied.splice(index, 1);
      setFilterApplied(updatedFilterApplied);
      if(filterApplied.length === 1){
        setFilterApplied(new Set());
        setCount(count+1);
        localStorage.removeItem("filterApplied");
      }else{
        setCount(count+1);
      }
    }
  }

  const removeSearchVal = ()=>{
    localStorage.setItem("searchTerm",searchValue);
    setSearchValue("");
  }

  const passDataToReducer = (dishName,hotelName,price,caseVal)=>{
    if (caseVal === "increase") {
      dispatch({ type: "INCREASE_QUANTITY", payload: { dishName, hotelName, price } });
    }else if(caseVal === "remove"){
      dispatch({type:"REMOVE_FROM_CART",payload:{dishName,quantity: 1,hotelName,price}});
    }
}

const toggle = (value)=>{
  setButtonClicked(value);
}

  useEffect(() => {
   if(searchValue === "" && filterApplied.size === 0){
      axios.get('http://localhost:8002/manageMenu/getAllMenus')
        .then(function (response) {
          if (response.data !=='') {
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
   }else if(searchValue!=="" && filterApplied.size !== 0 && count!==0){
    axios.post('http://localhost:8002/manageMenu/filterValues',{
      filterApplied: filterApplied,
      searchValue : searchValue},{
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(function (response) {
          if (response.data !=='') {
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
      setCount(count - 1);
   }else if(searchValue!==""&& filterApplied.size === 0 && count!==0 && searching === false){
    console.log("A")
    setCount(count - 1);
    fetchData();
   } else if(searchValue === "" && filterApplied.size!==0 && handleCount!==0){
    axios.post('http://localhost:8002/manageMenu/removeFilter',{
      filterApplied: filterApplied},{
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(function (response) {
          if (response.data !=='') {
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
      setHandleCount(handleCount - 1);
   }else if(localStorage.getItem("searchTerm")){
    localStorage.removeItem("searchTerm");
    axios.post('http://localhost:8002/manageMenu/filterMenus',{
      filterApplied: filterApplied},{
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(function (response) {
          if (response.data !=='') {
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
  }, [searchValue,filterApplied,count,handleCount,searching]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const thresholdValue = 500;
      if (scrollY > thresholdValue) {
        setFilterStyle("white");
      } else {
        setFilterStyle("initial");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  useEffect(()=>{
    if(searchButtonClick === true){
      fetchData();
      setSearchButtonClicked(false);
      const searchValue = document.querySelectorAll('.menuSearch');
      searchValue.forEach(item=>{
        item.value="";
      })
    }
  },[searchButtonClick]);

  useEffect(()=>{
    if(cardClicked === true){
      fetchData();
      setCardClicked(false);
    }
  },[cardClicked]);

 useEffect(()=>{
  return()=>{
    localStorage.removeItem("Menus");
  }
 },[]);
  return (
    <div style={{position:"relative"}}>
      <header style={{width:"100%"}}>
        <nav className='flex justify-evenly items-center' style={{position:"fixed",top:"0",left:"0",zIndex:"98",width:"100%",padding:"15px 0",boxShadow:"0 15px 40px -20px rgba(40,44,63,.15)"}}>
          <img className="menuLogo" src={LogoImg} alt='logo' style={{ width: '65px', height: '60px'}} />
          <span className="truncate" style={{ fontWeight: '500',fontSize:"20px",width:"15%",cursor:"pointer"}} onClick={()=>{setAddressDisplay(true);}}>
            <span style={{ fontWeight: '500' }}>Address:</span> <u> {localStorage.getItem('UserAddress')}</u>
          </span>
          <i class="fa fa-angle-down" style={{cursor:"pointer"}} onClick={()=>{setAddressDisplay(true);}}></i>
          <div className={`${addressDisplay?"scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${addressDisplay?"block":"none"}`,position:"fixed",padding:"3px",left:"14%",width:"15%",top:"4%",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
            <i className='fa fa-close' style={{position:"absolute",right:"10px",cursor:"pointer"}} onClick={()=>{setAddressDisplay(false)}}></i>
            <p style={{fontWeight:"18px",fontWeight: '500'}}>Address : {localStorage.getItem('UserAddress')}</p>
          </div>
          <div className='menuSearch' style={{ marginLeft:"20%"}}>
            <input type='search' className = "menuSearch" name='searchbar' id='searchbar' placeholder='Search Food...' onFocus={handleFocus} onBlur={handleBlur} onChange={handleSearchData}/>
            <button onClick={()=>{setSearchButtonClicked(true);}}>
              <i className='fa fa-search'></i>
            </button>
          </div>
          <div className={`p-8 ${dummySearchVal!==""?"scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${dummySearchVal!==""?"block":"none"}`,position:"absolute",top:"80%",left:"52%",width:"25.5%",height:"200px",zIndex:"999",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)",overflowY: "scroll"}}>
          {menus!=="" ? (
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
               <div className={`menu_Order_Cart ${userLogin === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${userLogin===true?"block":"none"}`,padding:"10px",left:"87.8%"}}>
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
          <div className='flex items-center menuPage addtocart' style={{gap:"12px",position:"relative"}} onClick={()=>{setDisplay(true)}}> 
            <i className="fa fa-shopping-cart" style={{fontSize:"30px"}}></i>
            <span style={{position:"fixed",top:"1.8%",right:"7.7%",fontSize:"12px",color:"white",zIndex:"9000",fontWeight:"700"}}>{state.totalDishCount}</span>
            <button className='menuPage' style={{fontSize:"25px",fontWeight:"500"}}>Cart</button>
          </div>
          <div className={`menu_OrderCart ${display === true? "scaleAnimStart":"scaleAnimEnd"}`} style={{display:`${display===true?"block":"none"}`,padding:"10px",left:`${state.totalDishCount === 0?"77%":"73%"}`}}>
           <i className='fa fa-close' style={{position:"absolute",right:"10px",cursor:"pointer"}} onClick={()=>{setDisplay(false)}}></i>
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
              <p className='text-center mt-2' style={{fontSize:"12px",color:"grey"}}>Check Out this page explore more restaurants</p>
            </>
          )}
          </div>
        </nav>
      </header>
      <main style={{width:"100%",paddingTop:"8%",paddingBottom:"10%"}}>
        <div className='flex flex-col' style={{paddingLeft:"9%",paddingRight:"9%"}}>
          <p style={{fontSize:"30px",fontWeight:"700"}}>What's on your mind?</p>
          <div className='slider pt-5'>
          <Slider {...settings}>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Pizza");}}>
                <div className="foodCard" style={{backgroundImage:`url(${PizzaImg})`}}></div>
                <p className='text-center'>Pizza</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Pasta");}}>
                <div className="foodCard" style={{backgroundImage:`url(${PastaImg})`}}></div>
                <p className='text-center'>Pasta</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Chinese");}}>
             <div className="foodCard" style={{backgroundImage:`url(${NoodlesImg})`}}></div>
                <p className='text-center'>Chinese</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("South Indian");}}>
             <div className="foodCard" style={{backgroundImage:`url(${IdliDosaImg})`}}></div>
                <p className='text-center'>South Indian Food</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Cake");}}>
                <div className="foodCard" style={{backgroundImage:`url(${CakeImg})`}}></div>
                <p className='text-center'>Cake</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Paneer");}}>
                <div className="foodCard" style={{backgroundImage:`url(${PaneerImg})`}}></div>
                <p className='text-center'>Paneer</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Chaats");}}>
                <div className="foodCard" style={{backgroundImage:`url(${ChaatsImg})`}}></div>
                <p className='text-center'>Chaats</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("NonVeg");}}>
                <div className="foodCard" style={{backgroundImage:`url(${NonVegImg})`}}></div>
                <p className='text-center'>Non Veg</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("PavBhaji");}}>
                <div className="foodCard" style={{backgroundImage:`url(${PavBhajiImg})`}}></div>
                <p className='text-center'>Pav Bhaji</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Rice");}}>
                <div className="foodCard" style={{backgroundImage:`url(${BiryaniImg})`}}></div>
                <p className='text-center'>Biryani</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Bengali");}}>
                <div className="foodCard" style={{backgroundImage:`url(${BengaliFoofImg})`}}></div>
                <p className='text-center'>Bengali Food</p>
             </div>
             <div className='flex flex-col mainCard' onClick={()=>{cardClick("Pan");}}>
                <div className="foodCard" style={{backgroundImage:`url(${PanImg})`}}></div>
                <p className='text-center'>Pan</p>
             </div>
          </Slider>
          </div>
        </div>
        <hr />
        <p style={{fontSize:"30px",fontWeight:"700",marginTop:"3%",paddingLeft:"9%",paddingRight:"9%"}}>Restaurants with online food delivery in Borivali West</p>
        <div className='flex items-center gap-x-[30px] mt-5' style={{position:"sticky",top:"0px",zIndex:"99",backgroundColor:`${filterStyle==="white"?"white":"initial"}`,width:`${filterStyle ==="white"?"100%":"initial"}`,padding:`${filterStyle==="white"?"20px 9%":"0px 9%"}`,boxShadow:`${filterStyle==="white"?"0 15px 40px -20px rgba(40,44,63,.15)":"initial"}`}}>
          <button className='flex items-center gap-x-[8px]' style={{border:"1px solid grey" ,borderRadius:"10px",padding:"8px",fontWeight:"600",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={()=>{setOpenDropDown(true)}}>
            Filter <span className="material-symbols-outlined">tune</span>
          </button>
          {openDropDown && ( 
          <div className={`${openDropDown === true ? "scaleAnimStart":"scaleAnimEnd"}`} id="filterDropDown" style={{ padding: "2%", position:"absolute", top:"105%",left:"9%",width: "13%", backgroundColor: "white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
            <i className="fa fa-close" style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }} onClick={() => { setOpenDropDown(false) }}></i>
            <ul className='flex flex-col' style={{ display: `${searchValue !== "" ? "block" : "none"}` }}>
              <li style={{ fontSize: "15px", fontWeight: "600"}}>Search Value</li>
              <li className='flex items-center'>{searchValue}<i className="fa fa-close" style={{ visibility: `${searchValue !== "" ? "visible" : "hidden"}`, position: "absolute", right: "10px" }} onClick={()=>{removeSearchVal()}}></i></li>
            </ul>
            {filterApplied.size !== 0 ? (
              <ul className='flex flex-col' style={{ display: `${filterApplied.size !== 0 ? "block" : "none"}` }}>
                <li style={{ fontSize: "16px", fontWeight: "600" }}>Filtered Applied</li>
                {filterApplied.map((items, index) => (
                  <li className='flex items-center' key={index}>{items.toUpperCase()}<i className="fa fa-close" style={{ position: "absolute", right: "10px", cursor: "pointer" }} onClick={()=>{removeFilter(index)}}></i></li>
                ))}
              </ul>
            ) : null}
          </div>
          )}
          <select name="pricesorting" id="pricesorting" style={{border:"1px solid grey" ,borderRadius:"10px",padding:"8px",fontWeight:"600",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={(e)=>{addFilter(e)}}>
            <option value="empty" disabled>Sort By Price</option>
            <option value="max">High to Low</option>
            <option value ="min">Low to High</option>
          </select>
          <button style={{border:"1px solid grey" ,borderRadius:"10px",padding:"8px",fontWeight:"600",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={(e)=>{addFilter(e)}} value="veg">Pure Veg</button>
          <button style={{border:"1px solid grey" ,borderRadius:"10px",padding:"8px",fontWeight:"600",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={(e)=>{addFilter(e)}} value="range100-300">Rs.100 - Rs.300</button>
          <button style={{border:"1px solid grey" ,borderRadius:"10px",padding:"8px",fontWeight:"600",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}} onClick={(e)=>{addFilter(e)}} value="range300-800">Rs.300 - Rs.800</button>
          <div className='menuSearch'id='filterSearch' style={{display:`${filterStyle === "white"?"block":"none"}`,marginLeft:"3%"}}>
            <input type='search' className="menuSearch"name='searchbar'  placeholder='Search Food...' onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleSearch}/>
            <button style={{height:"100%"}} onClick={()=>{setSearchButtonClicked(true);}}>
              <i className='fa fa-search'></i>
            </button>
          </div>
          <div className={`${ filterStyle==="white" &&  searchTerm!=="" ? "scaleAnimStart" : "scaleAnimEnd"}`} style={{display:`${filterStyle==="white" &&  searchTerm!==""?"block":"none"}`,position:"absolute",top:"80%",left:"64%",width:"25.5%",height:"200px",zIndex:"999",backgroundColor:"white",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)",overflowY: "scroll"}}>
          {menus!=="" ? (
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
        </div>
        {
          menus.length!==0?(
            <div className="grid grid-cols-4 gap-5 mt-8 scale-animStart" style={{position:"relative",paddingLeft:"9%",paddingRight:"9%"}}>
                {menus.slice(0, visibleItems).map((item) => (
                  <Fade>
                  <Link to={`/restaurant/${item.hotel_name}`}>
                    <div key={item.menu_id} className='menuCards'>
                      <div className="foodItemImage" style={{ backgroundImage: `url(/image/menu-image/${item.photo})` }}>
                        {
                          item.discount!==0?
                          (
                            <div style={{position:"absolute",zIndex:"10",bottom:"10px",backgroundColor:"blue",padding:"2px",borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}><span style={{color:"white",fontWeight:"600"}}>Discount {item.discount}  % Off</span>&nbsp;</div>
                          ):null
                        }
                      </div>
                      <div className='mt-5' style={{fontSize:"16px",fontWeight:"700"}}>{item.hotel_name}</div>
                      {item.dish_name && 
                      <div className='flex items-center gap-x-[8px] mt-2 mb-5' style={{fontSize:"15px",fontWeight:"700"}}>
                          {item.foodType === "Veg"?
                            (<div className='outerBox' style={{border: "2px solid green"}}>
                              <div className='innerBox' style={{width: "8px",height: "8px",backgroundColor: "green",borderRadius: "50%"}}></div>
                            </div>):
                            (<div className='outerBox' style={{border: "2px solid brown"}}>
                            <div className='innerBox' style={{width: "8px",height: "8px",backgroundColor: "red",borderRadius: "50%"}}></div>
                        </div>)
                          }
                          <span>{item.dish_name}</span>
                      </div>}
                      <hr />
                      <div className='flex items-center gap-x-[10px]'>
                        <div  style={{width:"70px",height:"70px",backgroundImage:`url(${SafetyImg})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}></div>
                        <span style={{fontSize:"12px",fontWeight:"700"}}>Follows all Safety Measures</span>
                      </div>
                    </div>
                    </Link>
                  </Fade>
              ))}
              {visibleItems <menus.length && (
                <button onClick={handleSeeMore} className='seeMoreButton'>See More</button>
              )}
            </div>
          ):(
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
          )
        }
      </main>
      <footer style={{position:"absolute",bottom:"0",top:"100%",left:"0",width:'100%'}}>
      <FooterComponent/>
      </footer>
      {buttonClicked && (
        <UserLoginSignup value={buttonClicked} toggle={toggle} setButtonClicked={setButtonClicked}/>
      )}
      <ToastContainer />
    </div>
  );
};

export default MenuPage;