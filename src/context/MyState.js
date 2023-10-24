import React from 'react'
import MyContext from './MyContext';
import { useState, useEffect } from 'react';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';


function MyState(props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  });
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully",{
        position: "top-center",
        autoClose: 1000
      });
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
      getProductData();

    } catch (error) {
      console.log(error);
    }
  }

  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
      });


      return () => data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
    toast.success("Product Updated successfully",{
      position: "top-center",
      autoClose: 1000
    })

      getProductData();

      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)

    } catch (error) {
      console.log(error)
    }
    setProducts("")
  }
  const deleteProduct = async (item) => {

    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully',{
        position: "top-center",
        autoClose: 1000
      })
      getProductData()
    } catch (error) {
      console.log(error);
    }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());

      });
      setOrder(ordersArray);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getOrderData()

  },[]);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider value={{
      loading, setLoading, products, setProducts, addProduct, product, setProduct, edithandle,
      deleteProduct, updateProduct, order, getOrderData, searchkey, setSearchkey, filterPrice, setFilterPrice, 
      filterType, setFilterType,getOrderData
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState;