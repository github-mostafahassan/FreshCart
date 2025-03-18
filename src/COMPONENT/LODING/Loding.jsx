
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import LodingCss from "./Loding.module.css"

function Loding() {
    return <>
    
    <div className={ LodingCss.loding + " relative top-0 bottom-0 left-0 right-0 bg-black flex justify-center items-center"}>
        <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
    
    </>
}

export default Loding
