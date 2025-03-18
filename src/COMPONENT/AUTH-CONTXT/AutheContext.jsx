

import React, { createContext, useState } from 'react'

export let myContext = createContext(  )

function AutheContextProvider( { children } ) {

    let [ myToken , setMyToken ] = useState(null)

    return <myContext.Provider value= { { myToken , setMyToken } }>
    
    { children }

    </myContext.Provider>
}

export default AutheContextProvider
