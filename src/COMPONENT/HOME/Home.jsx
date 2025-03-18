

import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import CategorySlyder from '../CATEGORY-SLYDER/CategorySlyder'
import bgImg from "../IMAGES/Dropshipping-nacional-fortaleca-sua-marca-no-e-commerce.jpg"
import SlyderProduct from '../SLYDER-PRODUCT/SlyderProduct'


function Home() {
    return <>
    


    
    <SlyderProduct/>

    <CategorySlyder/>

<div className="navBarProduct w-[90%] lg:bg-slate-600 md:bg-slate-600  p-2 gap-1 text-white m-auto flex flex-col lg:flex-row lg:flex-wrap lg:justify-around md:justify-around sm:flex-col rounded-lg text-center mt-4">
    <NavLink to="AllProduct" className=' bg-slate-600 p-2 rounded-md text-white'>All Product</NavLink>
    <NavLink to="MensFashion" className=' bg-slate-600 p-2 rounded-md text-white'>Men's Fashion</NavLink>
    <NavLink to="WomensFashion" className=' bg-slate-600 p-2 rounded-md text-white'>Women's Fashion</NavLink>
    <NavLink to="Electronics" className=' bg-slate-600 p-2 rounded-md text-white '>Electronics</NavLink>
</div>

            <div className="container my-1 m-auto ">
            
    <Outlet/>
            </div>

    </>
}

export default Home
