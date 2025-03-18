

import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loding from '../LODING/Loding'
import { Helmet } from 'react-helmet'


function Categores() {

    function gitAllCategores() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let { data , isError , isLoading } = useQuery("gitAllCategores" , gitAllCategores )
    

    if (isLoading) {
        return <Loding/>
    }

    return <>

    <Helmet>
      <title>Categores</title>
    </Helmet>
    
    <div className="container p-10 my-20 m-auto">
        <div className="row grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {data.data.data.length > 0 ? <>
                {data.data.data.map( ( category , idx )=>{
                return     <div className='  ' key={ idx }>
                <div className="card relative shadow-lg pb-3 transition duration-300 hover:scale-[1.1] rounded-lg text-center">
                    <figure>
                        <img style={ { height : " 200px" } } className=' w-full rounded-lg rounded-b-none   ' src={category.image} alt={category.name} />
                    </figure>
                    <figcaption className=' py-2'>
                        <h2>{category.name}</h2>
                    </figcaption>
                </div>
          </div>
            } )}
            </> : <Loding/> }
            


        </div>
    </div>

    </>
}

export default Categores
