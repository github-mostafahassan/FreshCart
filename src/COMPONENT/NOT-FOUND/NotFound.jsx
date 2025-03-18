

import React from 'react'
import imgNotFound from "../IMAGES/istockphoto-1476136803-612x612.jpg"

function NotFound() {
    return <>
    
    <div className=' container flex justify-center items-center'>
            <div className=' lg:w-[65%] md:w-full p-6 mt-5 '>
                <figure className=' p-7'>

                <img src={imgNotFound} className=' w-full rounded-lg' alt="notFound" />
                </figure>
            </div>
    </div>
    
    </>
}

export default NotFound
