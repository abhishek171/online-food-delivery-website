import React,{ useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LogoImg from '../../image/logo.png';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Slide } from 'react-awesome-reveal';
const OrderAndBillSummary = ()=>{
    const tableHeaders = ["Hotel Name","Dish Name","Quantity","Price"];
    const state = JSON.parse(localStorage.getItem("Orders"));
    const {modeOfPayment} = useParams();
    const userDetails = useSelector(state=>state.userDetails);
    const [createOrder,setCreateOrder] = useState({});
    const [paymentDetail,setPaymentDetail] = useState([]);
    const [count,setCount] = useState(1);
    const [counter,setCounter] = useState(0);
    const [paymentCount,setPaymentCount] = useState(0);
    const  deliveryAddress = userDetails.street + "," + userDetails.area + "," + userDetails.city +  "," + userDetails.pincode;

    const fetchData = async (hotelName) => {
        try {
          const response = await axios.post("http://localhost:8002/hotelDetail/getId", { hotel_name: hotelName });
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };
      
    const handleOrder = async () => {
      try {
        const updatedOrder = await Promise.all(
          state.orderFood.map(async (hotel) => {
            const hotelName = await fetchData(hotel.hotelName);
            return hotel.orders.map((order) => {
              const orderDetailsString = `${order.dishName} x ${order.quantity} x ${order.price}`;
              return {
                customerId: Number(userDetails.custId),
                orderDetails: orderDetailsString,
                orderStatus: "not ready",
                customerAddress: deliveryAddress,
                orderConfirmation: "confirmed",
                hotelId: Number(hotelName),
              };
            });
          })
        );
    
        setCreateOrder({
          ...createOrder,
          orderDetail: updatedOrder.flat(),
        });
        setCounter(1);
      } catch (error) {
        console.error('Error handling order:', error);
      }
    };

    useEffect(() => {
      const handleEffect = async () => {
        if (atob(modeOfPayment) === "cash" && count === 1) {
          setCount(0);
          await handleOrder();
        } else if (atob(modeOfPayment) === "card" && count === 1) {
          toast.success("Payment Succesfull!", {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setCount(0);
          await handleOrder();
        }
      };
    
      handleEffect();
    }, [modeOfPayment, count]);
      
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (Object.keys(createOrder).length > 0 && counter === 1) {
            const orderResponse = await axios.post("http://localhost:8003/orders/acceptOrders", createOrder);
            if (orderResponse.data !== null) {
              let i = 0;
              const amountPaymentStatus = atob(modeOfPayment) === "cash" ? "not paid" : "paid";
              const paymentDetails = await Promise.all(state.orderFood.map((hotel) => {
                const totalAmountPaid = hotel.orders.reduce((total, order) => total + order.price, 0);
                return {
                  orderId: Number(orderResponse.data[i++]),
                  modeOfPayment: atob(modeOfPayment),
                  paymentStatus: amountPaymentStatus,
                  amountPaid: Number(totalAmountPaid),
                };
              })
              );
              setPaymentDetail([...paymentDetail, ...paymentDetails]);
              setPaymentCount(1);
              setCounter(0);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [createOrder, counter]);
    
    useEffect(()=>{
      if(paymentCount === 1 && paymentDetail.length>0){
          axios.post("http://localhost:8005/customerPayment/receivePayment", paymentDetail, {
          headers: {
            'Content-Type': 'application/json',
          }})
          .then((response)=>{
            if (response.data !== null) {
              toast.success("Order Accepted!", {
                position: "top-center",
                autoClose: 1600,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
            }
          })
          .catch((error)=>{
            console.log(error);
          })
        }
                
    },[paymentCount,paymentDetail])
    return(
        <>  
          <Slide direction='down'>
            <div className="mt-10 mx-auto" style={{padding:"4% 20px",width:"70%",backgroundColor:"#fff",boxShadow:"0px 0px 4px 1px rgba(0, 0, 0, 0.5)"}}>
                <div className='flex justify-center items-center  gap-x-[10px]'>
                    <img className="menuLogo" src={LogoImg} alt='logo' style={{ width: '65px', height: '60px'}} />
                    <p style={{fontSize:"25px",fontWeight:"700"}}>Hungry Fleet</p>
                </div>
                <div style={{width:"100%"}}>
                    <table className='mt-4' style={{border:"none",width:"100%",padding:"0"}}>
                        <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                            <th key={index} style={{ fontSize: '20px', fontWeight: '800', padding: '10px',backgroundColor:"white",color:"black",border:"none"}}>
                                {header}
                            </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {state.orderFood.map((hotelOrder, index) => (
                            <React.Fragment key={index}>
                            {hotelOrder.orders.map((order, orderIndex) => (
                                <tr key={orderIndex}>
                                <td  style={{ fontSize: '18px', fontWeight: '600', padding: '10px',border:"none",backgroundColor:"none"}}>{hotelOrder.hotelName}</td>
                                <td style={{ fontSize: '18px', fontWeight: '600', padding: '10px 15px',border:"none",backgroundColor:"none"}}>{order.dishName}</td>
                                <td style={{ fontSize: '18px', fontWeight: '700', padding: '10px 5%',border:"none",backgroundColor:"none"}}>{order.quantity}</td>
                                <td style={{ fontSize: '18px', fontWeight: '600', padding: '10px',border:"none",}}>₹ {Math.ceil(order.price)}</td>
                                </tr>
                            ))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
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
                <hr style={{border:"2px solid black"}}/>
                <div className='flex  justify-between items-center pt-3' style={{fontSize:"18px",fontWeight:"700"}}>
                <div className='flex flex-col pt-3'>
                    <p>Total :</p>
                </div>
                <span>₹ {Math.ceil(state.totalPrice + 30 + (0.08 * state.totalPrice))}</span>
                </div>
            </div>
            </Slide>
            <ToastContainer/>
        </>
    )
}
export default OrderAndBillSummary;