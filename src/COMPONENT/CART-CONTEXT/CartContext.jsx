

import axios from 'axios'
import React, {  createContext, useState } from 'react'
import toast from 'react-hot-toast'

export let cartContext = createContext()

function CartContextProvider( {children} ) {

    let [ caunt , setCaunt] = useState("")
        let  [ allProduct , setAllProduct ] = useState(null)
        let  [ numOfCartItems , setNumOfCartItems ] = useState(0)
        let  [ totalCartPryse , setTotalCartPryse ] = useState(0)
        let  [ cartId , setCartId ] = useState(null)
        let  [ userId , setUserId ] = useState(null)
        let  [ statuseMaseg , setStatuseMaseg] = useState("")
    

        async function addProductToCart( productId ) {


                    await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
                    "productId" : productId 
                    } , {
                    headers : { token : localStorage.getItem("tkn") }
                    }).then( (responce)=>{
                    toast.success(" success adding product " , { duration : 1500})

                    } ).catch( (err)=>{
                    toast.error(" error adding product " , { duration : 1500})
                    } )


        }


        async function upditingCart( id , count ) {
            await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
                    "count" : count
            } , {
                headers : { token : localStorage.getItem("tkn")}
            } ).then( (res)=>{
                setCaunt(caunt)
                setAllProduct(res)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPryse(res.data.data.totalCartPrice)
                
            } )
            .catch( (err)=>{
                console.log(err);
            } )
        }



        async function removeCart(id) {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
                headers : { token : localStorage.getItem("tkn") }
            }).then( (res)=>{
                toast.success("The product has been successfully deleted.." , {duration : 3000 })
                
            } )
            .catch( (err)=>{
                toast.error("An error occurred. The product was not deleted.." , {duration : 3000 })                
            } )
        }

        async function cleareAllProductInCart() {
            await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers : { token : localStorage.getItem("tkn")}
            }).then( (res)=>{
                setAllProduct([])
                setNumOfCartItems(0)
                setTotalCartPryse(0)
                toast.success( "The basket has been emptied of all products.." , {duration : 3000 })                
                
            } ).catch( (err)=>{
                toast.error("An error occurred. The cart was not emptied of products" , {duration : 3000 })                
                
            } )
        }



        async function addProductInWishList( productId ) {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
              "productId": productId
            } , {
              headers : { token : localStorage.getItem("tkn")}
            }).then( (res)=>{
                if (res.data.status === "success") {
                    setStatuseMaseg(res.data.status)
                    toast.success(res.data.message , {duration : 3000 })
                }
                
            } ).catch( (err)=>{
                console.log(err);
                
            } )
          }






        

    return <cartContext.Provider value={ { userId , setUserId , addProductInWishList , setStatuseMaseg , statuseMaseg ,   cartId , setCartId , addProductToCart , upditingCart , totalCartPryse , setTotalCartPryse , numOfCartItems , setNumOfCartItems , removeCart , cleareAllProductInCart , setAllProduct , allProduct , setCaunt , caunt} }>
        {children}
    </cartContext.Provider>
}

export default CartContextProvider
