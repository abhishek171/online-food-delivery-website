import React from 'react';
import Logo from '../../image/logo.png'
import '../../Css/landingPage.css'
const FooterComponent = () => {
  return (
    <div  className='footer'>
        <div className='info flex justify-evenly' style={{width:"100%"}}>
            <div>
                <h2>Company</h2>
                <ul>
                    <li>About Us</li>
                    <li>Team</li>
                    <li>Careers</li>
                </ul>
            </div>
            <div>
                <h2>Contact</h2>
                <ul>
                    <li>Help & Support</li>
                    <li>Partner with us</li>
                    <li>Ride with us</li>
                </ul>
            </div>
            <div>
                <h2>Legal</h2>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Refund and Cancellation</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Offers Term</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className='cusinies'>
            <h2>BEST CUSINIES NEAR ME</h2>
            <div className='flex gap-[100px]'> 
                <ul>
                    <li>Punjabi Resturant Near Me</li>
                    <li>Chinese Resturant Near Me</li>
                    <li>Rajasthani Resturant Near Me</li>
                    <li>Italian Resturant Near Me</li>
                    <li>Gujarati Resturant Near Me</li>
                    <li>Bengali Resturant Near Me</li>
                </ul>
                <ul>
                    <li>SeaFood Resturant Near Me</li>
                    <li>Meat Resturant Near Me</li>
                    <li>Afghani Resturant Near Me</li>
                    <li>Hyderbadi Resturant Near Me</li>
                    <li>Kerala Resturant Near Me</li>
                    <li>Mughalai Resturant Near Me</li>
                </ul>
                <ul>
                    <li>Bengali Sweets Resturant Near Me</li>
                    <li>Cakes Resturant Near Me</li>
                    <li>Ice-cream Resturant Near me</li>
                    <li>Pan Resturant Near Me</li>
                    <li>Juices Resturant Near Me</li>
                    <li>Waffle Resturant Near Me</li>
                </ul>
                <ul>
                    <li>Healthy Food Resturant Near Me</li>
                    <li>Home Food Resturant Near Me</li>
                    <li>Jain Food Resturant Near Me</li>
                    <li>Keto Food Resturant Near Me</li>
                    <li>Salads Resturant Near Me</li>
                    <li>Bakery Near Me</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className='social flex justify-between items-center'>
            <div className='flex items-center'>
                <img src={Logo} alt="" style={{width:"60px",height:"60px"}}/>
                <p>Hungry Fleet</p>
            </div>
            <div>
            © 2024
            </div>
            <ul className='flex gap-[40px]'>
                <li><a href="#" class="fa fa-facebook"></a></li>        
                <li><a href="#" class="fa fa-twitter"></a></li>
                <li><a href="#" class="fa fa-instagram"></a></li>
            </ul>
        </div>
    </div>
  )
}

export default FooterComponent;