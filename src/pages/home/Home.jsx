import React, { useContext,useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/MyContext';
import HeroSection from '../../components/herosecton/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productcard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import { Link } from 'react-router-dom';
import Explore from '../../components/explore/Explore';


function Home() {
  useEffect(()=>
  {
    window.scrollTo(0,0);
  },[]);
  return (
    <div>
         <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Explore/>
    </Layout>
    </div>
 
  )
}

export default Home;