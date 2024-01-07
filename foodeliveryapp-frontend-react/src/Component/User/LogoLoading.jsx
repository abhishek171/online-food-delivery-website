import React from 'react'
import logo from '../../image/logo.png'
import '../../Css/logoLoading.css'
const LogoLoading = () => {
  return (
    <div style={{ background: "black", width: "100vw", height: "100vh", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "center" }}>
      <img src={logo} alt="" style={{ height: "200px", width: "200px" }} />
      <div style={{display:"flex"}}>
        <p style={{color:"white",fontSize:"48px"}}>HUNGRY FLEET</p>
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
      </div>
    </div>
  )
}

export default LogoLoading;