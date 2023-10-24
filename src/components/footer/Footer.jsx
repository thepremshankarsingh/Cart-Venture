
import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { TiSocialPinterest } from 'react-icons/ti';
import { FaRegCopyright } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Footer = () => {
  const [value, setValue] = useState('');
  function submithandler(event) {
    event.preventDefault();
    setValue('');
    toast.success("Subscribe Successfully", {
      autoClose: 1000,
      position: 'top-center'
    })
  }
  return (
    <div className='w-full mt-24 bg-gray-900 text-gray-300 py-2 px-2'>
      <div className='conatiner mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8 px-4'>
        <div className='col-span-2 py-8 md:pt-2'>
          <h1 className='font-bold text-white uppercase'>More about Cart-Venture</h1>
          <p className=' mr-10 mt-5'>The future of shopping is here. Shop smarter, not harder. </p>
          <div className='flex gap-3 sm:w-[300px] pt-4 text-2xl'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <TiSocialPinterest size={30} />
          </div>
        </div>

        <div>
          <h6 className='font-bold uppercare pt-2'>CATEGORIES</h6>
          <ul>
            <Link to={'/'}>
              <li className='py-1'>Home</li>
            </Link>
            <Link to={'/order'}>
              <li className='py-1'>Orders</li>
            </Link>

            <Link to='/allproducts'>
              <li className='py-1'>AllProducts</li>
            </Link>
            <Link to={'/cart'}>
              <li className='py-1'>Cart</li>
            </Link>
          </ul>
        </div>
        <div>
          <h6 className='font-bold uppercare pt-2'>Cart - Venture COMPANY</h6>
          <ul>
            <li className='py-1'>About</li>
            <li className='py-1'>Blog</li>
            <li className='py-1'>Jobs</li>
            <li className='py-1'>Career</li>
          </ul>
        </div>
        <div className='col-span-2 py-8 md:pt-2'>
          <p className='font-bold uppercase'>Subscribe to our newsletters</p>
          <p className='py-4'>
          Sign up for our email list and save money.
          </p>
          <form className='flex flex-col sm:flex-row' onSubmit={submithandler}>
            <input className='w-full p-2 mr-4 rounded-md mb-4 text-black outline' type='email' placeholder='Enter email..'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <button class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium 
            rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Subscribe</button>
          </form>
        </div>

      </div>

      <div className='flex  px-2 py-4 mx-auto justify-center sm:flex-row text-center text-gray-500'>
        <div className='py-4 flex items-center gap-1'>
          <FaRegCopyright />
          <span>Copyright 2023 |</span>
          <span>All Rights Reserved |</span>
          <span>Powered by Prem Shankar Singh</span>

        </div>
      </div>
    </div>
  );
};

export default Footer;