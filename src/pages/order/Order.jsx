
import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/MyContext';

function Order() {
  
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(MyContext);
  const { order } = context;
  useEffect(()=>
  {
    window.scrollTo(0,0);
  },[]);
  console.log(order.length);
  return (
        
  <Layout>
    {
    
    order.length > 0 ?(
        <div className=" h-full pt-10">
            <h1 className="mb-10 text-center text-2xl font-bold text-purple-500">Your Orders</h1>
          {
            order.filter(obj => obj.userid === userid).map((order) => {
            
              return (
                <div className="mx-auto  max-w-5xl flex flex-col items-center px-6 md:flex md:space-x-6 xl:px-0">
                  {
                    order.cartItems.map((item) => {
                      return (
                        <div className="rounded-lg md:w-2/3">
                          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" >
                            <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                                <p className="mt-1 text-xs text-gray-700">{item.description}</p>
                                <p className="mt-1 text-xs text-gray-700" >{item.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>):
      ( 
            
              <h2 className='text-center text-2xl font-bold '>No order</h2>
      )

    }
  </Layout>
)
  
}

export default Order;