import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loding from '../LODING/Loding'

function Order() {

  async function getAllOrders() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/orders/")
  }

  let { data, isError, isLoading } = useQuery("getAllOrders", getAllOrders)

  console.log(data?.data);
  

  if (isLoading) {
    return <Loding />
  }

  return (
    <div className="container py-20 m-auto px-6">
      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {data.data.data.map((order, idx) => (
          <div key={idx} className='bg-white shadow-lg rounded-lg overflow-hidden  border border-blue-500   duration-100'>
              <h3 className=' bg-gray-100 p-2 text-stone-500'>User Information :</h3>
            <div className="user p-4   rounded-b-none border-b-2">
              <h2 className="font-bold text-lg text-green-500">Name: {order.user.name}</h2>
              <h3 className="text-sm text-gray-600">Email: {order.user.email}</h3>
              <h3 className="text-sm text-gray-600">Phone: {order.user.phone}</h3>
            </div>

                <h3 className=' bg-gray-100 p-2 text-stone-500'>User Information :</h3> 
              <div className="user p-4  border-b-2  rounded-t-none">
              <h4 className=" text-sm text-gray-800">city: {order.shippingAddress?.city ? order.shippingAddress?.city  : "" }</h4>
              <h4 className=" text-sm text-gray-800">phone: {order.shippingAddress?.phone ? order.shippingAddress?.phone  : "" }</h4>
              <h4 className=" text-sm text-gray-800">ditalce: {order.shippingAddress?.details ? order.shippingAddress?.details  : "" }</h4>
            </div>  

            <h3 className=' bg-gray-100 p-2 text-stone-500'>product Information :</h3>
            <table className="w-full table-fixed border-collapse text-center py-640">
         <thead className=' border text-center'>
                <tr className="bg-gray-100 text-center">
                <th className="p-4 font-semibold text-gray-700 text-center">
                    <h3>Img</h3>
                </th>


                <th className="p-4  font-semibold text-gray-700 text-center">
                  <h3>
                  Title
                  </h3>
                  </th> 


              <th className='p-4  font-semibold text-gray-700 text-center'>
                <h3>price</h3>
              </th>
    </tr>
  </thead>
  <tbody className=' text-center'>
    {order.cartItems.map((product, index) => (
      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 border ">
        <td className="p-4  flex justify-center items-center ">
          <img
            className="w-24 h-24 object-cover rounded-lg shadow-md"
            src={product?.product.imageCover}
            alt={product?.product.title}
          />
        </td>
        <td className="p-4 text-gray-800 border">{product?.product.title}
        </td>
        <td className=' border'>
          <p className=' capitalize text-blue-600 font-bold '>{product?.price} EGB</p>
          </td>
      </tr>
    ))}
  </tbody>
</table>






{/* <div key={index} className="product p-4 pb-20 grid grid-cols-2">
              <figure className='mb-4'>
                <img className='w-full h-auto rounded-lg object-cover'  src={prouduct?.product.imageCover} alt={prouduct?.product.title} />
              </figure>
              <figcaption className="text-center text-gray-700 font-semibold flex justify-center items-center">
                <p>{prouduct?.product.title}</p>
              </figcaption>
            </div> */}











            

            {/* Pricing Information */}
            <div className="pricing p-4 bg-gray-50 ">
                <h4 className=' border text-center rounded-md py-1'>payment Method : { order.paymentMethodType == "card" ?   <i class="fa-solid fa-money-check-dollar"></i> : order.paymentMethodType } </h4>
              <h4 className="text-gray-600">Tax Price: <span className="font-bold text-blue-600">{order.taxPrice} EGP</span></h4>
              <h4 className="text-gray-600">Shipping Price: <span className="font-bold text-blue-600">{order.shippingPrice} EGP</span></h4>
              <h3 className="text-xl font-semibold text-gray-800">Total Price: <span className="text-red-600">{order.totalOrderPrice} EGP</span></h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order

