

import React from 'react'
import { Link } from 'react-router-dom'

function Foter() {
    return <>
    
    <div className=' w-full bg-black flex justify-center items-center flex-col p-4  '>
        <p className='  capitalize text-white'>Follow us on social media</p>
        <div className="sotial w-40 flex justify-between ">
            <Link to="https://www.facebook.com/profile.php?id=100055746897260"> <i class="fa-brands fa-facebook text-white  hover:text-blue-700 transition-all duration-200"></i> </Link>
            <Link to="https://wa.me/01121122552"> <i class="fa-brands fa-whatsapp text-white  hover:text-green-600 transition-all duration-200"></i> </Link>
            <Link to="https://github.com/github-mostafahassan">  <i class="fa-brands fa-github text-white hover:text-gray-600 transition-all duration-200"></i>  </Link>
        </div> 
    </div>
    </>
}

export default Foter
