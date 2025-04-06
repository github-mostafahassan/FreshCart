
import {  createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LayOut from './COMPONENT/LAYOUT/LayOut';
import Login from './COMPONENT/LOGIN/Login';
import Register from './COMPONENT/REGISTER/Register';
import Cart from './COMPONENT/CART/Cart';
import AutheContextProvider from './COMPONENT/AUTH-CONTXT/AutheContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import ForgitPasswor from './COMPONENT/FORGIT-PASSWORD/ForgitPasswor';
import ProtectedRouteProvider from './COMPONENT/PROTECTED-ROUTE/ProtectedRoute';
import CartContextProvider from './COMPONENT/CART-CONTEXT/CartContext';
import { Toaster } from 'react-hot-toast';
import VerifyResetCode from './COMPONENT/Verify Reset Code/VerifyResetCode';
import PasswordReset from './COMPONENT/Password-Reset/PasswordReset';
import UpdatePassword from './COMPONENT/Updeate Paswword/UpdeatePaswword';
import NotFound from './COMPONENT/NOT-FOUND/NotFound';
import Payment from './COMPONENT/PAYMENT/Payment';
import CheckoutPage from './COMPONENT/Checkout Page/CheckoutPage';
import Order from './COMPONENT/ORDER/Order';
import Home from './COMPONENT/HOME/Home';
import { Offline } from 'react-detect-offline';
import { Helmet } from 'react-helmet';
import React, { Suspense } from 'react';
import Loding from './COMPONENT/LODING/Loding';

let Wishlist = React.lazy( ()=> import ("./COMPONENT/WISHLIST/Wishlist") )
let AllProduct = React.lazy( ()=> import ("./COMPONENT/PRODUCT/Product") )
let MensFashion = React.lazy( ()=> import ("./COMPONENT/Men'sFashion/MensFashion") )
let WomensFashion = React.lazy( ()=> import ("./COMPONENT/Women's Fashion/WomensFashion") )
let Electronics = React.lazy( ()=> import ("./COMPONENT/Electronics/Electronics") )
let Brandes = React.lazy( ()=> import ("./COMPONENT/BRANDES/Brandes") )
let Categores = React.lazy( ()=> import ("./COMPONENT/CATEGORES/Categores") )
let ProductDitelse = React.lazy( ()=> import ("./COMPONENT/PRODUCT-DITELSE/ProductDitelse") )





function App() {

  let myRouter =  createHashRouter( [
    { element : <LayOut/> , children : [
    {path : "/" , element : <Login/> },
    {path : "FreshCart" , element : <Login/> },

    {path : "Home" , element : <Home/>, children : [
      { path : "" , element : <AllProduct/> },
      { path : "AllProduct" , element :<Suspense fallback={ <Loding/> }> <AllProduct/> </Suspense>  },
      { path : "MensFashion" , element : <Suspense fallback={<Loding/>}> <MensFashion/> </Suspense>  },
      { path : "WomensFashion" , element : <Suspense fallback={<Loding/>}> <WomensFashion/> </Suspense>  },
      { path : "Electronics" , element : <Suspense fallback={<Loding/>}> <Electronics/> </Suspense>   },


    ]  },
    {path : "ProductDitelse/:id" , element : <Suspense fallback={<Loding/>}> <ProductDitelse/>  </Suspense>    },
    {path : "Categores" , element : <Suspense fallback={<Loding/>}> <Categores/> </Suspense>  },
    {path : "Brandes" , element : <Suspense fallback={<Loding/>}> <Brandes/> </Suspense>   },
    {path : "Cart" , element : <ProtectedRouteProvider> <Cart/> </ProtectedRouteProvider>  },
    {path : "Wishlist" , element : <ProtectedRouteProvider> <Suspense fallback={<Loding/>}><Wishlist/></Suspense>  </ProtectedRouteProvider> },
    {path : "Register" , element : <Register/> },
    {path : "Login" , element : <Login/> },
    {path : "PasswordReset" , element : <PasswordReset/> , children : [
      { path : "" , element : <ForgitPasswor/> },
      { path : "ForgitPasswor" , element : <ForgitPasswor/> },
      { path :  "UpdatePassword" , element : <UpdatePassword/> },
      { path :  "VerifyResetCode" , element : <VerifyResetCode/> },
    ] },
    {path : "Payment" , element : <Payment/> },
    {path : "CheckoutPage" , element : <ProtectedRouteProvider> <CheckoutPage/> </ProtectedRouteProvider> },
    {path : "allorders" , element : <ProtectedRouteProvider> <Order/> </ProtectedRouteProvider> },

    
    {path : "*" , element : <NotFound/> },
    

  ]}
] )

let myQuery = new QueryClient()



  return <>

    <Helmet>
      <title>Home</title>
    </Helmet>


  <QueryClientProvider client={myQuery}>
    <CartContextProvider>
    <AutheContextProvider>
      <RouterProvider router={ myRouter}/>
    </AutheContextProvider>
    </CartContextProvider>
  </QueryClientProvider>
  <Toaster/>
  <Offline>
  <p className=' p-2 shadow-md fixed bottom-1 left-1 bg-red-500 text-white rounded-md'>No internet connection! Please check your connection.</p>
  </Offline>

  </>
}

export default App;
