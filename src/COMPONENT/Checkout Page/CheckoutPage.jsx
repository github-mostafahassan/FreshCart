

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { cartContext } from '../CART-CONTEXT/CartContext';

function CheckoutPage() {


        let { cartId ,  setCartId  } = useContext( cartContext )



       async function checkoutSession(  values ) {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ cartId }?url=http://localhost:3000` , {
                shippingAddress : values
                
            } , {
                headers : { token : localStorage.getItem("tkn") }
            }).then( (res)=>{
                console.log(values);
                
                setTimeout(() => {
                    console.log("eshta" , res.data.session.url);
                    window.location.href = res.data.session.url
                }, 1500);
                
                
            } ).catch( (err)=>{
                console.log(" obse" , err);
                
            } )
        }


        let formikOnlinePayment = useFormik( {

            initialValues : {
                    "details": "",
                    "phone": "",
                    "city": ""
            } ,

            onSubmit : checkoutSession
        } )



    return <>
    <div className=' bg-gray-100 min-h-screen flex justify-center items-center '>
                    <form onSubmit={formikOnlinePayment.handleSubmit} action="" className=' w-[75%] bg-white shadow-lg p-4 rounded-lg'>
                        <h2 className=' text-center font-bold text-3xl'>checkout Session</h2>
                        <label htmlFor="phone">phone</label>
                        <input id='phone' onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.phone} type="text" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2' />

                        <label htmlFor="city">city</label>
                        <input id='city' onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.city} type="text" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2' />

                        <label htmlFor="details">details</label>
                        <textarea onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.details} name="details" id="details" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2'></textarea>
                        {/* <input value={formikOnlinePayment.values.details} type="text" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2' /> */}

                        <button className='capitalize bg-blue-700  hover:bg-blue-800 transition-all duration-150 text-white  flex justify-center items-center p-3 w-full rounded-lg'>cach</button>
                    </form>
    </div>
    
    </>
}

export default CheckoutPage
