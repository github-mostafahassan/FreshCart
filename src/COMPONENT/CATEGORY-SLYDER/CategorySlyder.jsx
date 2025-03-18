import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Loding from "../LODING/Loding";
import LazyLoad from "react-lazyload";


function CategorySlyder() {


        function getImageCategry() {
            return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        }

        let { data , isError , isLoading } = useQuery( "getImageCategry" , getImageCategry )



        if (isLoading) {
            return <Loding/>
        }
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay : true
            };
            return (
                <div className="mx-auto mt-6 container  text-center m-auto">
                    <Slider className=" m-auto rounded-2xl overflow-hidden container" {...settings}>
                    {data.data.data.map( (categry , idx )=>{
                        return <LazyLoad offset={100} once >
                            <img  className=" h-[200px] " key={ idx } src={categry.image} alt={categry.name} />
                             </LazyLoad> 
                    } )}
                </Slider>
                </div>
            );
            }

export default CategorySlyder



