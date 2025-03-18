

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../CART-CONTEXT/CartContext'
import { useFormik } from 'formik'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies'
import toast from 'react-hot-toast'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

function Payment() {


          let { cartId ,  setCartId  } = useContext( cartContext )
          let [isLoding , setIsLoding] = useState(false)
          let myNavigate = useNavigate()
    




            async function confermPayment(values) {
                setIsLoding(true)
                await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
                    shippingAddress : values
                } , {
                    headers : { token : localStorage.getItem("tkn")}
                }).then( (res)=>{
                    if (res.data.status == "success") {
                        setTimeout(() => {
                            
                            toast.success("payment completed successfully")
                            myNavigate("/allorders")
                        }, 1500);
                        setIsLoding(false)
                    }else{
                        setTimeout(() => {
                            
                            toast.error("An error occurred while completing the payment")
                        }, 1500);
                        setIsLoding(false)
                    }
                } ).catch( (err)=>{
                    console.log(err);
                    
                } )
            }


            let myFormikPayment = useFormik( {
                initialValues : {
                    "details": "",
                    "phone": "",
                    "city": ""
            },

                onSubmit : confermPayment , 


                // validate : function (values) {
                    
                //     let error = {}


                //     let regexPhone = /^[01][0125][0-9]{8}$/

                //     if (regexPhone.test( values.shippingAddress.phone ) !== true) {
                //         error.phone = "Phone number does not match the required format. Please check and try again"
                //     }


                //     return error
                // }

            } )



    return <>
        <div className=' min-h-screen bg-gray-100 flex justify-center items-center'>
            
            <form onSubmit={myFormikPayment.handleSubmit}  className=' w-[70%] bg-white p-5 shadow-lg '>
                <h2 className=' text-center capitalize font-bold'> payment</h2>
                

                <label htmlFor="phone" > phone : </label>
                <input name='phone' value={myFormikPayment.values.phone} onChange={myFormikPayment.handleChange} type="text" id="phone"  className=' mb-3 mt-1 w-full border rounded-lg focus:outline:2 focus:outline-blue-600 p-2 ' />
                {/* { myFormikPayment.errors.phone ? <p className=' text-red-600'>mostafa</p> : "" } */}


                <label htmlFor="city" > city : </label>
                <input value={myFormikPayment.values.city} onChange={myFormikPayment.handleChange} name="city" id="city" className=' mb-3 mt-1 w-full border rounded-lg focus:outline:2 focus:outline-blue-600 p-2 ' />
                
                <label htmlFor="details" className='details'> details : </label>
                <textarea value={myFormikPayment.values.details} onChange={myFormikPayment.handleChange} name="details" id="details" className=' mb-3 mt-1 w-full border rounded-lg focus:outline:2 focus:outline-blue-600 p-2 '>  </textarea>
                

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white flex justify-center items-center font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isLoding ? <RotatingLines
                                visible={true}
                                height="30"
                                width="30"
                                color=""
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                strokeColor = "blue"
                                wrapperStyle={{}}
                                wrapperClass=""
                                /> : "Enter the password recovery link"}
                
            </button>            </form>
        </div>
    </>
}

export default Payment
