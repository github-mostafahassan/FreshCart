
import axios from 'axios'
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function VerifyResetCode() {

    let verifyResetCode = useRef()
    let myNavigate = useNavigate()
        let [ isLoding , setIsLoding ] = useState(false)
    

    useEffect( ()=>{
        verifyResetCode.current.focus()
    } , [] )


    async function getVerifyResetCode(value) {
        setIsLoding(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , value)
        .then( (res)=>{
            setIsLoding(false)
            
            if (res.data.status === "Success") {
                toast.success("The reset code is correct. You can now proceed to reset your password" , { duration : 1500})
                
                setTimeout(() => {
                    myNavigate("/PasswordReset/UpdatePassword")
                }, 1500);
            }
            
        } ).catch( (err)=>{
            setIsLoding(false)
            toast.error("The reset code is incorrect. Please check and try again" , { duration : 1500})
            
        } )
    }


    let myFormikgetVerifyResetCode = useFormik( {
        
        initialValues : {
            "resetCode" : ""
        },

        onSubmit : getVerifyResetCode , 

        validate : function ( value ) {
            const error = {}
                
                let regxInputEmail = /^[0-9]{6}$/

                if (regxInputEmail.test(value.resetCode) === false) {
                    error.resetCode = "The code you entered is incorrect"
                }

            return error 
        }
        
    } )



    return <>
    
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                <form onSubmit={myFormikgetVerifyResetCode.handleSubmit} className="bg-white lg:w-[50%] sm:w-[90%] shadow-lg p-6 rounded-lg mt-3">
                            <h2 className=' text-center font-bold text-2xl'> Verify Reset Code </h2>
                            <div className=' my-4'>
                                <div className="verifyResetCode flex flex-col mb-3">
                                    <label htmlFor="resetCode" className=' capitalize my-1'> Enter Reset Code : </label>
                                    <input ref={verifyResetCode} value={myFormikgetVerifyResetCode.values.resetCode} onChange={myFormikgetVerifyResetCode.handleChange} onBlur={myFormikgetVerifyResetCode.handleBlur} type="text" id='resetCode' placeholder='Enter Reset Code' className=' border p-2 rounded-lg focus:outline-2  focus:outline-blue-500' />
                                    {myFormikgetVerifyResetCode.errors.resetCode && myFormikgetVerifyResetCode.touched.resetCode ? <p className=' text-red-600'>{myFormikgetVerifyResetCode.errors.resetCode}</p> : ""}
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
                
            </button>                               </div>
                </form>
            </div>
    
    </>
}

export default VerifyResetCode
