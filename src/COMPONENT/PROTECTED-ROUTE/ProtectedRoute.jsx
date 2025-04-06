

import React, {  createContext } from 'react'
import { Navigate } from 'react-router-dom'

let myProtected = createContext()

function ProtectedRouteProvider({children}) {

    if (localStorage.getItem("tkn") == null) {
        return <Navigate to={"/Login"}/>
    }

    return <myProtected.Provider>
    {children}
    </myProtected.Provider>
}

export default ProtectedRouteProvider
