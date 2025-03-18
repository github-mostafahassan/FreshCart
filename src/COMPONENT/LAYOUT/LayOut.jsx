

import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NAVBAR/NavBar'
import Foter from '../FOTER/Foter'

function LayOut() {
    return <>

    <NavBar/>
    
    <Outlet/>

    <Foter/>

    </>
}

export default LayOut
