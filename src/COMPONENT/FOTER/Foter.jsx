

import React from 'react'
import FoterCss from "./foter.module.css"
import { Link } from 'react-router-dom'
import amazonpay from "../IMAGES/amazonpay.svg";
import paypal from "../IMAGES/paypal.svg";
import visa from "../IMAGES/visa.svg";
import mastercard from "../IMAGES/mastercard.svg";
import appstore from "../IMAGES/appstore-btn.svg";


// function sumetInputFooter(e) {
//     e.
// }

function Foter() {
    return <>
    
    <div className={FoterCss.foter + ' w-full flex p-8 flex-col bg-black container m-auto my-4  rounded-xl shadow-lg'}>
    <div className="w-full border-t border-b shadow-xl flex justify-between py-4">
        <div className="paymentPartners w-full p-4 m-auto flex flex-col sm:flex-col lg:flex-row lg:justify-between gap-6">
            <div className="flex items-center w-[50%] gap-6">
                <p className='text-white font-semibold text-lg'>Payment Partners:</p>
                <div className="imagPayment flex items-center gap-6 pt-2">
                    <img src={amazonpay} alt="amazonpay" className="transition-all transform hover:scale-110 hover:brightness-125" />
                    <img src={paypal} alt="paypal" className="transition-all transform hover:scale-110 hover:brightness-125" />
                    <img src={visa} alt="visa" className="transition-all transform hover:scale-110 hover:brightness-125" />
                    <img src={mastercard} alt="mastercard" className="transition-all transform hover:scale-110 hover:brightness-125" />
                </div>
            </div>

            <div className="flex items-center gap-4 py-4">
                <p className='text-white font-semibold text-lg'>Get deliveries with FreshCart:</p>
                <img src={appstore} className="bg-white p-3 rounded-lg transition-all transform hover:scale-110 hover:brightness-125" alt="appstore" />
            </div>
        </div>
    </div>

    <div className='flex flex-col lg:flex-row justify-between mt-6'>
        <div className='social-section w-full lg:w-1/2'>
            <p className='capitalize text-white font-semibold mb-3 text-lg'>Follow us on social media</p>
            <div className="social w-44 flex justify-between gap-2">
                <Link to="https://www.facebook.com/profile.php?id=100055746897260">
                    <i className="fa-brands fa-facebook bg-white rounded-full fa-2x p-3 text-blue-700 transition-all duration-300 hover:bg-blue-700 hover:text-white hover:shadow-lg"></i>
                </Link>
                <Link to="https://wa.me/01121122552">
                    <i className="fa-brands fa-whatsapp bg-white rounded-full fa-2x p-3 text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg"></i>
                </Link>
                <Link to="https://github.com/github-mostafahassan">
                    <i className="fa-brands fa-github bg-white rounded-full fa-2x p-3 text-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg"></i>
                </Link>
            </div>
        </div>

        <div className='newsletter-section w-full lg:w-1/2 mt-6 lg:mt-0'>
            <p className='capitalize text-white font-semibold mb-3 text-lg'>Subscribe to our newsletter</p>
            <form action="" className="flex">
                <input type="text" placeholder="Enter your email" className='p-3 outline-none border-none rounded-l-lg w-full bg-white text-black placeholder-gray-500' />
                <button type='submit' className='bg-green-600 text-white p-3 rounded-r-lg transition-all hover:bg-green-700'>
                    Submit
                </button>
            </form>
        </div>
    </div>
</div>


    </>
}

export default Foter
