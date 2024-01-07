import React, { useState } from 'react';
import LogoImg from '../../image/logo.png';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import OTPInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CgSpinner } from 'react-icons/cg';
import { auth } from '../../firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [user,setUser] = useState(false);
  let history = useNavigate(null);
  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const sanitizedValue = numericValue.slice(0, 1);
    setOtp(prevOtp => prevOtp + sanitizedValue);
  };

  const handleKeyPress = (e) => {
    const isNumeric = /^[0-9]$/;
    if (!isNumeric.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const renderInput = (value, index) => {
    return (
      <input
        key={index}
        onChange={(e) => handleChange(e)}
        onKeyPress={handleKeyPress}
        onFocus={() => {}}
        onBlur={() => {}}
        style={{
          width: '2em',
          height: '2em',
          margin: '0 0.5em',
          fontSize: '1.5em',
          textAlign: 'center',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    );
  };

  function onCaptchVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
              onSignUp();
            },
            'expired-callback': () => {
            }
          });
      }
    } catch (error) {
      console.error('Error creating RecaptchaVerifier:', error);
    }
  }
  

  const onSignUp = () => {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
  
    if (appVerifier) {
      const formatPhone = '+' + phone;
      signInWithPhoneNumber(auth, formatPhone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOtp(true);
          toast.success('OTP sent Successfully!', {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          
        })
        .catch((error) => {
          console.error('Error signing up:', error);
          setLoading(false);
        });
    } else {
      console.error('RecaptchaVerifier is undefined.');
      setLoading(false);
    }
  };
  

  const onOtpVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        setUser(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
console.log(showOtp)
  return (
    <>
        {user===false?
        (<div style={{ background: 'black', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' ,paddingBottom:"20px"}}>
            {showOtp ? (
            <div className='flex flex-col items-center mx-[15%] mt-[5%] p-[3%]' style={{ width: '60%', backgroundColor: 'white', boxShadow: '0px 0px 4px 2px rgba(255, 255, 255, 0.5)' }}>
                <img src={LogoImg} alt='' style={{ height: '65px', width: '65px' }} />
                <div className='w-fit mx-auto p-3 mt-4 mb-4' style={{ borderRadius: '50%', backgroundColor: 'rgb(201, 25, 25)', color: 'white' }}>
                <BsFillShieldLockFill style={{ fontSize: '25px' }} />
                </div>
                <label htmlFor='otp' className='font-bold text-2xl text-center text-black mb-4'>
                Enter Your Otp
                </label>
                <OTPInput className='otp-container' renderInput={renderInput} numInputs={6} otpType='number' autoFocus />
                <button
                className='flex gap-1 items-center justify-center py-2.5 text-white rounded mt-8'
                style={{ padding: '10px 50px', backgroundColor: 'rgb(201, 25, 25)' }}
                onClick={onOtpVerify}
                >
                {loading && <CgSpinner className='mt-1 animate-spin' style={{ fontSize: '20px' }} />}
                <span>Verify OTP</span>
                </button>
            </div>
            ) : (
            <div className='flex flex-col items-center mx-[15%] mt-[5%] p-[3%]' style={{ width: '60%', backgroundColor: 'white', boxShadow: '0px 0px 4px 2px rgba(255, 255, 255, 0.5)' }}>
                <img src={LogoImg} alt='' style={{ height: '65px', width: '65px' }} />
                <div className='w-fit mx-auto p-3 mt-4 mb-4' style={{ borderRadius: '50%', backgroundColor: 'rgb(201, 25, 25)', color: 'white' }}>
                <BsTelephoneFill style={{ fontSize: '25px' }} />
                </div>
                <label htmlFor='ph' className='font-bold text-xl text-center text-black mb-4'>
                Verify Your Phone Number
                </label>
                <PhoneInput country={'in'} value={phone} onChange={setPhone} style={{ marginLeft: '60%' }} />
                <div className="mt-7" id="recaptcha-container"></div>
                <button
                className='flex gap-1 items-center justify-center py-2.5 text-white rounded mt-8'
                style={{ padding: '10px 50px', backgroundColor: 'rgb(201, 25, 25)' }}
                onClick={onSignUp}
                >
                {loading && <CgSpinner className='mt-1 animate-spin' style={{ fontSize: '20px' }} />}
                <span style={{ fontWeight: '600' }}>Send Code via SMS</span>
                </button>
            </div>
            )}
        </div>):(
            history('/updatePassword')
        )}
      <ToastContainer />
    </>
  );
};

export default OtpVerification;





