



import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import Loding from '../LODING/Loding'
import { Link } from 'react-router-dom'
import { cartContext } from '../CART-CONTEXT/CartContext'
import LazyLoad from 'react-lazyload'

function Wishlist() {
    
    let queryClient  = useQueryClient()


    let { addProductToCart } = useContext( cartContext )
    let  [ allProductInWishList , setAllProductInWishList ] = useState(null)
            let  [ productId , setProductId ] = useState(null)
    

        async function getAllProductInWishList() {
             return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {
                 headers : { token : localStorage.getItem("tkn")}
            })

        }

        let {data , isError , isLoading} = useQuery("getAllProductInWishList" , getAllProductInWishList)



        if (isLoading) {
            return <Loding/>
        }



        


        

        

        async function addProdctInCart(productId) {
            await addProductToCart( productId )
        }



        

        async function removeProductFromWishlist(WishListId) {
            try{
                await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${WishListId}`, {
                    headers: { token: localStorage.getItem("tkn") }
                  })
                  queryClient.invalidateQueries("getAllProductInWishList")
              }catch(err){
                console.log(err);
                
            }
        }







        

    return <>
    
     <div className="container m-auto  p-3 my-20"> 

    {data?.data.count === 0 ? <p className='   shadow-lg text-black mt-5 p-6 '>Your wishlist is currently empty. Start shopping now and add products to your wishlist.</p> : <>
        {/* <div className=' grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
              
              {data?.data.data.map( ( wishList , inx )=>{
                  return<div key={inx} className=' card p-3 rounded-lg shadow-lg border relative'>
                     <Link>
                     <figure className=' py-5'>
                          <img src={wishList.imageCover} className=' w-full rounded-t-lg' alt={wishList.title} />

                          <figcaption className=' bg-white text-center py-3 rounded-b-lg '>
                                  <h3 className='text-bold text-green-500'>{wishList.title.split(" ").slice(0, 3).join(" ")}</h3>
                                  <div className=' w-full flex justify-around items-center border rounded-md my-2 py-1'>
                                      <h4>sold : {wishList.sold}</h4>
                                      <h4>quantity : {wishList.quantity}</h4>
                                  </div>
                                  
                                  <p>{wishList.description.split(" ").slice(0, 6).join(" ")}</p>

                                  <div className="raiting w-full flex justify-between py-2">
                                      <h4 className=' text-green-500'> {wishList.price} EGB</h4>
                                      <h4 className=' text-yellow-400'><i class="fa-solid fa-star "></i> {wishList.ratingsAverage}</h4>
                                  </div>
                          </figcaption>
                      </figure>
                     </Link>
                     <div className=' flex justify-between items-center w-full absolute bottom-1 right-1 mt-3 px-3'>
                     <button onClick={ ()=>{
                      addProdctInCart( wishList.id )
                     } } className=' capitalize bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-2 rounded-lg  '>add to cart</button>
                     <i onClick={()=>{removeProductFromWishlist(wishList.id)}} class="fa-solid fa-trash  cursor-pointer text-red-500 hover:text-red-600 "></i>
                     
                     </div>
                  </div>
                   
              } )}

              
    </div> */}
    <div className="overflow-x-auto shadow-lg mt-11">
      <table className="table-fixed border w-full min-w-max">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th className="p-3 border">img</th>
            <th className="p-3 border">name</th>
            <th className="p-3 border">price</th>
            <th className="p-3 border">rating</th>
            <th className="p-3 border">sold</th>
            <th className=" border">quantity</th>
            <th className="p-3 border">add to cart</th>
            <th className="p-3 border">delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.data?.data?.map((wishlistProdct) => (
            <tr key={wishlistProdct.id} className="hover:bg-gray-100 transition-colors duration-200 border">
                
              <td className="p-3 break-words ">
                <Link to={`/ProductDitelse/${wishlistProdct.id}`}>
                <LazyLoad height={200} offset={100} once>
                  <img
                    src={wishlistProdct.imageCover}
                    className="w-full rounded-t-lg"
                    alt={wishlistProdct.title}
                    loading="lazy"
                  />
                  </LazyLoad>
                </Link>
              </td>
              <td className="p-3 break-words text-green-500">{wishlistProdct.title.split(" ").slice(0, 3).join(" ")}</td>
              <td className="p-3 break-words">{wishlistProdct.price} EGP</td>
              <td className="p-3 break-words text-amber-500">
                <div className="flex justify-center items-center">
                  <span className="text-yellow-400">
                    <i className="fa-solid fa-star"></i> {wishlistProdct.ratingsAverage}
                  </span>
                </div>
              </td>
              <td className="p-3 break-words">{wishlistProdct.sold}</td>
              <td className="p-3 break-words">{wishlistProdct.quantity}</td>
              <td className="p-3 break-words">
                <button
                  onClick={() => addProdctInCart(wishlistProdct.id)}
                  className="capitalize bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-2 rounded-lg"
                >
                  +
                </button>
              </td>
              <td className="p-3 break-words">
                <button
                  onClick={() => removeProductFromWishlist(wishlistProdct.id)}
                  className="text-white cursor-pointer bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>}

    
  </div> 

        

    </>
}

export default Wishlist
