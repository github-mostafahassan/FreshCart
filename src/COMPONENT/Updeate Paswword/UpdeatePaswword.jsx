
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
    
    let emailInput = useRef()
    let myNavegata = useNavigate()
    let [ isLoding , setIsLoding ] = useState(false)

            
            useEffect( ()=>{
                emailInput.current.focus()
            } , [] )

             async function userUpdatePassword( value) {
                setIsLoding(true)
                try {
                     
                    let responce = await  axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , value )

                    setIsLoding(false)
                    if (responce.data.token) {
                        toast.success("The password has been changed successfully" , { duration : 1500})

                        setTimeout(() => {
                            myNavegata("/Login")
                        }, 1500);
                    }
                    
                }
                catch(err){
                        setIsLoding(false)
                        toast.error("There was an issue, and the password could not be changed" , { duration : 1500})
                }
                
            }


            let formikuserUpdatePassword  = useFormik( {
                initialValues : {
                    email :"" ,
                    newPassword : "" ,
                }  ,

                onSubmit : userUpdatePassword ,

                validate : function (values) {
                    const error = {}
                        
                    let regxNowPassword = /^[A-Za-z0-9]{6,18}[@#$%^&*]{0,}$/

                        if (values.email.includes("@") !== true && values.email.includes(".") !== true) {
                        error.email = " Invalid email format "
                      }

                      if (regxNowPassword.test(values.newPassword) === false) {
                            error.nowPassword = "The password must be between 6 and 18 characters long and end with one of the following special characters : @ , # , $ , % , ^ , & , *"
                      }


                    return error


                }




            } )


    return (
        <>
            <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                <form onSubmit={ formikuserUpdatePassword.handleSubmit } className="bg-white lg:w-[50%] sm:w-[90%] shadow-lg p-6 rounded-lg mt-3">
                            <h2 className=' text-center font-bold text-2xl'> Update Password </h2>
                            <div className=' my-4'>
                                <div className="email flex flex-col mb-3">
                                    <label htmlFor="email" className=' capitalize my-1'> email : </label>
                                    <input ref={emailInput} value={ formikuserUpdatePassword.values.email} onChange={formikuserUpdatePassword.handleChange} type="email" id='email' placeholder='email' className=' border p-2 rounded-lg focus:outline-2  focus:outline-blue-500' />
                                    {formikuserUpdatePassword.errors.email && formikuserUpdatePassword.touched.email ? <p className=' text-red-500'>{formikuserUpdatePassword.errors.email}</p> : ""}
                                </div>

                                <div className="newPassword flex flex-col mb-3">
                                    <label htmlFor="newPassword" className='  my-1 capitalize'>  new Password : </label>
                                    <input value={ formikuserUpdatePassword.values.newPassword} onChange={formikuserUpdatePassword.handleChange} type="password" id='newPassword' placeholder=' New Password' className=' border p-2 rounded-lg focus:outline-2  focus:outline-blue-500' />
                                    {formikuserUpdatePassword.errors.newPassword && formikuserUpdatePassword.touched.newPassword ? <p className=' text-red-500'>{formikuserUpdatePassword.errors.newPassword}</p> : ""}
                                </div>
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
                                /> : "Send"}
                
            </button>                           
             </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePassword
