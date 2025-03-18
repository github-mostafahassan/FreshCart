

import axios from 'axios'
import React, { Children, createContext, useState } from 'react'
import toast from 'react-hot-toast'

export let cartContext = createContext()

function CartContextProvider( {children} ) {

    let [ caunt , setCaunt] = useState("")
        let  [ allProduct , setAllProduct ] = useState(null)
        let  [ numOfCartItems , setNumOfCartItems ] = useState(0)
        let  [ totalCartPryse , setTotalCartPryse ] = useState(0)
        let  [ cartId , setCartId ] = useState(null)
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
                console.log(res);
                
            } )
            .catch( (err)=>{
                console.log(err);
                
            } )
        }

        async function cleareAllProductInCart() {
            await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers : { token : localStorage.getItem("tkn")}
            }).then( (res)=>{
                console.log(res);
                setAllProduct([])
                setNumOfCartItems(0)
                setTotalCartPryse(0)
                
            } ).catch( (err)=>{
                console.log(err);
                
            } )
        }



        async function addProductInWishList( productId ) {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
              "productId": productId
            } , {
              headers : { token : localStorage.getItem("tkn")}
            }).then( (res)=>{
                console.log("ss" ,res);
                
                if (res.data.status === "success") {
                    setStatuseMaseg(res.data.status)
                    toast.success(res.data.message)
                }
                
            } ).catch( (err)=>{
                console.log(err);
                
            } )
          }



          async function RemoveProductFromWishlist(wishListId) {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishListId}` , {
                headers : { token : localStorage.getItem("tkn")}
            }).then ( (res)=>{
                console.log(  res);
                // QueryClient.invalidateQueries("getAllProductInWishList");
                
            } ).catch( (err)=>{
                console.log(err);
                
            } )
        }



     
        

    return <cartContext.Provider value={ { addProductInWishList , setStatuseMaseg , statuseMaseg ,   cartId , setCartId , addProductToCart , upditingCart , totalCartPryse , setTotalCartPryse , numOfCartItems , setNumOfCartItems , removeCart , cleareAllProductInCart , setAllProduct , allProduct , setCaunt , caunt} }>
        {children}
    </cartContext.Provider>
}

export default CartContextProvider
