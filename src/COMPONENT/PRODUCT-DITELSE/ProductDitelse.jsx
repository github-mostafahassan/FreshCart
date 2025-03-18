import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loding from '../LODING/Loding';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { cartContext } from '../CART-CONTEXT/CartContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Aos from 'aos'
import "aos/dist/aos.css"

function ProductDitelse() {

            useEffect( ()=>{
                    Aos.init({ easing: 'ease-in-out', duration : 1500})
            } , [])

        let { addProductToCart } = useContext(cartContext)
    
    let { id } = useParams();

    function gitProductDitelse() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    let { data, isError, isLoading } = useQuery("gitProductDitelse", gitProductDitelse);


    if (isError) {
        console.log("mostafa");
        
    }


    if (isLoading) {
        return <Loding />;
    }

    async function addProduct(id) {
        await addProductToCart(id)
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    }

    return (
        <>
            <div className="container mx-auto p-12 mt-20 ">
                <div className="content lg:w-[80%] m-auto">
                {/* Slider for images */}
                {/* <Slider className=' mb-10 rounded-3xl overflow-hidden' {...settings}>
                    {data.data.data.images.map((img, index) => {
                        return <div key={ index } className=' flex '>
                                <LazyLoadImage loading='lazy' effect='opacity' className='w-full  ' src={img} alt={`Product image ${index + 1}`} key={index} />
                        </div> 
                    })}
                </Slider> */}

                {/* Product details */}
                <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-lg mt-8 border">
                    {/* Product image */}
                    <figure className="flex-1 mb-6 md:mb-0">
                        <LazyLoadImage
                            data-aos="zoom-in"
                            loading='lazy' 
                            effect='opacity'
                            style={{ width: "75%" }}
                            className="h-auto object-cover rounded-lg m-auto shadow-md"
                            src={data.data.data.imageCover}
                            alt={data.data.data.title}
                        />
                    </figure>

                    {/* Product description */}
                    <figcaption className="flex-1 md:ml-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{data.data.data.title}</h2>
                        <p className="text-gray-600 mb-6">{data.data.data.description}</p>

                        {/* Price Section */}
                        {data.data.data.priceAfterDiscount ? (
                            <div className="text-red-500 mb-6">
                                <h3 className="line-through capitalize text-gray-500">
                                Price before discount: {data.data.data.price} EGB
                                </h3>
                                <h3 className="text-2xl font-bold capitalize">
                                Price after discount: {data.data.data.priceAfterDiscount} EGB
                                </h3>
                            </div>
                        ) : (
                            <h3 className="text-2xl font-bold text-red-500 mb-6">
                                السعر: {data.data.data.price} جنيه
                            </h3>
                        )}


                        <div className=' w-full  text-white grid lg:grid-cols-1 my-3 '>
                        <Slider className='  rounded-3xl overflow-hidden' {...settings}>
                            {data.data.data.images.map((img, index) => {
                                return <div key={ index } className=' flex '>
                                        <LazyLoadImage loading='lazy' effect='opacity' className='w-full  ' src={img} alt={`Product image ${index + 1}`} key={index} />
                                </div> 
                            })}
                        </Slider>
                        </div>

                        {/* Add to cart button */}
                        <button onClick={()=>{
                            addProduct( data.data.data.id )
                        }} className="px-6 capitalize w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                            add to cart
                        </button>
                    </figcaption>
                </div>
                </div>
            </div>
        </>
    );
}

export default ProductDitelse;


