import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productcard/ProductCard';
import MyContext from '../../context/MyContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';

function AllProducts() {
  const context=useContext(MyContext);
  const {product,searchkey,filterPrice,filterType}=context;
  const dispatch=useDispatch();
  function addCart(item)
  {
       dispatch(addToCart(item))
       toast.success("Added successfully",{
        position: "top-center",
        autoClose: 1000
       })
  }
  useEffect(()=>
  {
      window.scrollTo(0,0);
  },[])
  return (
    <div>
      <Layout>
       <Filter/>
       <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" 
                >Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {
                        product.filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
                        .filter((obj) => obj.price.includes(filterPrice)).map((item, index) =>
                        {
                            return ( <div className="p-4 md:w-1/4  drop-shadow-lg " key={index} >
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"  >
                                <div className="flex justify-center cursor-pointer" 
                                 onClick={()=> window.location.href = `/productinfo/${item.id}`}>
                                    <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item.imageUrl} alt="blog" />
                                </div>
                                <div className="p-5 border-t-2">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" >Cart-Venture</h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3" >{item.title}</h1>
    
                                    <p className="leading-relaxed mb-3" >₹ {item.price}</p>
                                    <div className=" flex justify-center">
                                        <button onClick={()=>addCart(item)} className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
    )
                        })
             }
                  

                    

                </div>

            </div>
        </section >
      </Layout>
    </div>
  )
}

export default AllProducts;