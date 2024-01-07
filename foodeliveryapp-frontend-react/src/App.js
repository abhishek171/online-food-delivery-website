import React from "react";
import LandingPageComponent from "./Component/User/LandingPage";
import AdminComponent from "./Component/Admin/AdminComponent";
import HotelComponent from "./Component/Hotel/HotelComponent";
import DeliveryComponent from "./Component/Delivery/DeliveryComponent";
import AdminLoginSignUpComponent from "./Component/Admin/AdminLoginSignUp";
import HotelLoginSignUpComponent from "./Component/Hotel/HotelLoginSignup";
import DeliveryLoginSignUpComponent from "./Component/Delivery/DeliveryLoginSignup";
import PageNotFound from "./Component/Resusable/PageNotFound";
import MenuPage from "./Component/User/MenuPage";
import RestaurantMenu from "./Component/User/RestaurantMenu";
import OtpVerification from "./Component/Resusable/OtpVerification";
import UpdatePassword from "./Component/Resusable/UpdatePassword";
import SecurePayment from "./Component/User/SecurePayment";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AddToCartProvider from "./context/addtocartcontext.js";
import OrderAndBillSummary from "./Component/User/OrderAndBillSummary";
import UserDashBoard from "./Component/User/UserDashBoard";
import store from "./store/store";
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('stripe_publishable_key');
function App() {
  return (
    <Provider store = {store}>
      <AddToCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<PageNotFound/>}/>
            <Route path='/hungryfleet' element={<LandingPageComponent/>}/>
            <Route path='/admin' element={<AdminLoginSignUpComponent/>}/>
            <Route path='/adminDashboard' element={<Elements stripe={stripePromise}><AdminComponent/></Elements>}/>
            <Route path='/hotelDashboard' element={<Elements stripe={stripePromise}><HotelComponent/></Elements>}/>
            <Route path='/deliveryDashBoard' element={<DeliveryComponent/>} />
            <Route path='/hotel' element={<HotelLoginSignUpComponent/>}/>
            <Route path='/delivery' element={<DeliveryLoginSignUpComponent/>}/>
            <Route path='/menus' element={<MenuPage/>}/>
            <Route path ='/restaurant/:hotelName' element={<RestaurantMenu/>}/>
            <Route path = '/forgotPassword' element={<OtpVerification/>}/>
            <Route path="/updatePassword" element={<UpdatePassword/>}/>
            <Route path="/secureCheckout" element={<SecurePayment/>}/>
             <Route path="/billSummary/:modeOfPayment" element={<OrderAndBillSummary/>}/>
            <Route path='/userDashboard' element={<UserDashBoard/>}/>
            <Route path='/otpVerification' element={<OtpVerification/>}/>
          </Routes>
        </BrowserRouter>
      </AddToCartProvider>
    </Provider>
  );
}


export default App;
