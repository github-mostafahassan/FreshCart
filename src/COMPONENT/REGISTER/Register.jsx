

import React, {  useEffect, useRef } from 'react'

import RegisterCss from "./Register.module.css"
import {  useFormik } from 'formik'
import axios from 'axios'
// import { myContext } from '../AUTH-CONTXT/AutheContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import imgLogo from "../IMAGES/freshcart-logo.svg";
import Aos from 'aos'
import "aos/dist/aos.css"


function Register() {

  // let { myToken , setMyToken } = useContext( myContext )
  
  let [ isSucces , setIsSucces ] = useState()
  let [ isError , setIsError] = useState( false )
  let [ isLoding , setIsLoding ] = useState( false )
   useEffect( ()=>{
                        Aos.init({ easing: 'ease-in-out', duration : 1500})
    } , [])


  let myNavigate = useNavigate()

  let focusInput = useRef()
  
  useEffect( ()=>{
      focusInput.current.focus()
  } , [])

  async function sendUserData( values ) {
    setIsLoding(true)
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
      .then( (res)=>{
        setIsLoding(false)
            setIsSucces(res.data.message)
            setTimeout(() => {
              myNavigate("/Login")
            }, 500);
            
      } ).catch( (err)=>{
        setIsLoding(false)
        setIsError(err.response.data.message)

           setTimeout(() => {
            setIsError(false)
            }, 3000);
      } )

  }
    



            const myFormik = useFormik( {
              initialValues : {
                name: "",

                email: "",
                
                password: "",
                
                rePassword: "",

                phone: "",
              }  ,

              onSubmit : sendUserData ,

              
                

              validate : function(values){

                const error = {}
                
                let regxName = /^[A-Za-z]{2,18}$/
                let regxPassword = /^[A-Za-z0-9]{6,}[@#$%^&*]{0,}$/
                let redexPhone = /^01[0125][0-9]{8}$/

                if (regxName.test(values.name) === false) {
                  error.name = "The username must be between 5 and 18 letters and contain only alphabets!"
                }

                if (values.email.includes("@") !== true && values.email.includes(".") !== true ) {
                  error.email = " The email must contain '@' and also include the letter `.` "

                }

                if (regxPassword.test(values.password) === false) {
                  error.password = "The password must be between 6 and 18 characters long and end with one of the following special characters : @ , # , $ , % , ^ , & , *"
                }

                if (values.password !== values.rePassword) {
                  error.rePassword = "The password must match the re-entered password."
                }

                if ( redexPhone.test( values.phone ) === false ) {
                  error.phone = "Please make sure to enter your phone number"
                }

                return error
              }
            } )




    return <>

<div className=' bg-gray-100 min-h-screen flex justify-center items-center'>


<form  onSubmit={myFormik.handleSubmit}  className={ RegisterCss.myForm + ' mb-10 drop-shadow-2xl w-[75%] border shadow-lg bg-white m-auto p-8 rounded-lg'}>
              {isSucces  ? <p className=' bg-sky-700 text-white p-7  m-auto rounded-2xl font-bold text-center '>Registration successful! You have successfully registered on the website.</p> : ""}
              {isError  ? <p className=' bg-red-700 text-white p-7 w-[75%] m-auto rounded-2xl font-bold text-center'>{isError} </p> : ""}

              <div className='  mt-16 border  shadow-lg p-2 rounded-lg '>
            <h2 className=' text-center text-blue-600 rounded-t-lg text-2xl bg-gray-100 border-t-4 p-3 border-t-blue-500'> Registration Guidelines </h2>
            <ul className=' p-2'>
              <li className=' p-2 border-b'>
                    Please enter a username with at least 2 characters and a maximum of 18 characters, using only English letters."
              </li>
              <li className=' p-2 border-b flex flex-col'>
                    Password must be at least 6 characters long and may include letters, numbers, and special characters like @#$%^&*."   
                    <span>Example of a valid password: Pass155%</span>
                    </li>
              <li className=' p-2'>
                    The phone number must start with 01, followed by one of the digits 0, 1, 2, or 5,
              </li>
            </ul>
      </div>



      <div className={RegisterCss.allInput + " space-y-12 container m-auto "}>


      

        <div className=" w-auto ">
          <div className=' text-center  flex flex-col items-center p-3'>
            <img src={imgLogo} alt="Logo" />
          </div>
        <div className="imgLogin lg:w-[50%] md:w-full m-auto text-center flex justify-center">
            <img  src={ require("../IMAGES/Sign-Up images.jpg")} className=' lg:w-[250px] md:w-full lg:h-[250px] md:h-full lg:rounded-full md:rounded-lg' alt="" />
        </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm/6 font-medium ">
                Name
              </label>
              <div className="mt-2">
                <input
                ref={focusInput}
                  value={myFormik.values.name}
                  onChange={myFormik.handleChange}
                  id="name"
                  type="text"
                  placeholder='Enter your username (2 to 18 characters, letters only)'
                  className="block shadow-md w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                
                {myFormik.errors.name && myFormik.touched.name ? <div className=' text-red-600'>{myFormik.errors.name}</div> : ""}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label  htmlFor="email" className="block text-sm/6 font-medium ">
              Email address
              </label>
              <div className="mt-2">
                <input
                placeholder=' Enter your Email Address'
                    value={myFormik.values.email}
                  onChange={myFormik.handleChange}
                  id="email"
                  type="email"
                  className="block shadow-md w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                
              </div>
            </div>

            <div className="sm:col-span-3">
              <label  htmlFor="password" className="block text-sm/6 font-medium ">
              Password
              </label>
              <div className="mt-2">
                <input
                    placeholder="Enter password (at least 6 characters, letters, numbers, and special characters)" 
                    value={myFormik.values.password}
                  onChange={myFormik.handleChange}
                  id="password"
                  type="password"
                  className="block shadow-md w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                {myFormik.errors.password && myFormik.touched.password ? <div className=' text-red-600'>{myFormik.errors.password}</div> : ""}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="rePassword" className="block text-sm/6 font-medium ">
              RePaswword
              </label>
              <div className="mt-2">
                <input
                placeholder=' Re-enter your password'
                value={myFormik.values.rePassword}
                onChange={myFormik.handleChange}
                  id="rePassword"
                  type="password"
                  
                  className="block shadow-md w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                  {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className=' text-red-600'>{myFormik.errors.rePassword}</div> : ""}

              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm/6 font-medium ">
              phone
              </label>
              <div className="mt-2">
                <input
                placeholder='Enter your phone number'
                  value={myFormik.values.phone}
                  onChange={myFormik.handleChange}
                  id="phone"
                  type="text"
                  className="block shadow-md w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                
              </div>
            </div>
          </div>
        <button type='submit' className=' py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 w-full flex justify-center items-center'>
                   {isLoding ?  <RotatingLines
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
                           /> : "Regaster" } </button>
        </div>
            <p>Already have an account ? <Link className=' text-blue-500' to={"/Login"}>Log In</Link></p>
        </div>
        
    </form>
</div>
    
    </>
}

export default Register
