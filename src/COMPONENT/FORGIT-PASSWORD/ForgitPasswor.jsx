

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import UpdatePassword from '../Updeate Paswword/UpdeatePaswword'
import VerifyResetCode from '../Verify Reset Code/VerifyResetCode'

function ForgitPasswor() {

    let inoutEmail = useRef()
    useEffect( ()=>{
        inoutEmail.current.focus()
    } , [] )

    let [ isLoding , setIsLoding ] = useState(false)
    let myNavigate = useNavigate()

    async function forgitPassword ( valuse ) {
        setIsLoding(true)
        return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , valuse )
        .then( (res)=>{
            if (res.data.statusMsg == "success") {
                toast.success(res.data.message , { duration : 1500} )
            }
            setTimeout(() => {
                setIsLoding(false)
                myNavigate("/PasswordReset/VerifyResetCode")
            }, 1500);
        } ) .catch( (err)=>{
            
            setTimeout(() => {
                setIsLoding(false)
            }, 1500);
        } )
        
    }

       let formikForgitePassword = useFormik( {

        initialValues : {
            email : "" 
        },

        onSubmit : forgitPassword   ,
        validate : function ( value ) {
            const error = {}
                
                if (value.email.includes("@") !== true && value.email.includes(".") !== true) {
                    error.email = "The email must contain '@' and also include the letter `.` "
                }

            return error 
        }
    } )


    return <>
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
    <div className="bg-white p-8 rounded-lg shadow-lg lg:w-[50%] sm:w-[90%]">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6"> Enter your email address </h2>

        <form onSubmit={ formikForgitePassword.handleSubmit } >
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600"> Email </label>
                <input
                    ref={inoutEmail}
                    value={ formikForgitePassword.values.email }
                    onChange={formikForgitePassword.handleChange}
                    onBlur={formikForgitePassword.handleBlur}
                    type="email"
                    id="email"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder=" Enter your email address "
                />
                {formikForgitePassword.errors.email && formikForgitePassword.touched.email ? <p className=' text-red-500'>{formikForgitePassword.errors.email}</p> : ""}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white flex justify-center items-center font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoding}
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
                
            </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
        Or <Link to="/Login" className="text-blue-500 hover:underline">LOGIN </Link>
        </p>
    </div>
</div>


    </>
}

export default ForgitPasswor
