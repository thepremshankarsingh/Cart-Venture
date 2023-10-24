import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import Model from '../../components/model/Model';
import { deleteFromCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';
import { useContext, useEffect ,useState} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import MyContext from '../../context/MyContext';
import { Link } from 'react-router-dom';
function Cart() {
     const cartItems=useSelector((state)=>state.cart);
     const dispatch=useDispatch();
     const context=useContext(MyContext);
    const  { getOrderData}=context;
     function deleteCart(item)
     {
        dispatch(deleteFromCart(item));
        toast.success("Deleted successfully",{
          position: "top-center",
          autoClose: 1000,
        });
     }
     useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
      let temp = 0;
      cartItems.forEach((cartItem) => {
        temp = temp + parseInt(cartItem.price)
      })
      setTotalAmount(temp);
    }, [cartItems])
  
    const shipping = parseInt(100);
    const grandTotal = shipping + totalAmount

    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    async function buyNow()
    {
      if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
        return toast.error("All fields are required", {
          position: "top-center",
          autoClose: 1000,
        });
      }

      const addressInfo = {
        name,
        address,
        pincode,
        phoneNumber,
      };

      var options = {
        key: "rzp_test_v09mUTKYQoyx0D",
        key_secret: "tUmEaBvV0gC1bxplLkhx2BoY",
        amount: parseInt(grandTotal * 100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + name,
        name: "Cart-Venture",
        description: "for testing purpose",
        handler: function (response) {
            toast.success('Payment Successful',{
              position: "top-center",
              autoClose: 1000
            });
            const paymentId=response.razorpay_payment_id;
            const orderInfo={
              cartItems,
              addressInfo,
              date: new Date().toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              ),
              email:JSON.parse(localStorage.getItem('user')).user.email,
              userid:JSON.parse(localStorage.getItem('user')).user.uid,
              paymentId
           }

           try {
            const orderRef=collection(fireDB,'orders');
             addDoc(orderRef,orderInfo);
             getOrderData();


            
           } catch (error) {
                console.log(error);
           }
        },
    
        theme: {
            color: "#3399cc"
        }
    };
    
    var pay = new window.Razorpay(options);
    pay.open();
    }
    useEffect(()=>
    {
      window.scrollTo(0,0);
    },[]);
  return (
    <Layout >
      <div className="pt-5 mb-[5%] ">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">

            {
                cartItems.length>0?(

                  cartItems.map((item,index)=>
                  {
                    return(  <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  
                    sm:flex  sm:justify-start"  key={index}>
                      <img src={item.imageUrl} alt="product-image"
                        className="w-full rounded-lg sm:w-40" />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                          <h2 className="text-sm  text-gray-900" >{item.description}</h2>
                          <p className="mt-1 text-xs font-semibold text-gray-700" >₹{item.price}</p>
                        </div>
                        <div onClick={()=>deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
        
                        </div>
                      </div>
                    </div>)
                  })
                ):(<div className='flex flex-col items-center gap-6'>
                  <div className=' text-purple-500 text-bold text-lg'>Cart Empty</div>
                  <Link to={'/allproducts'} className='text-center'>
                  <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Shop Now</button>
                  </Link>
                  </div>)


            }

          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" >Subtotal</p>
              <p className="text-gray-700">₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700" >{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" >Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold">₹{grandTotal}</p>
              </div>
            </div>
            {/* <Modal  /> */}
            <Model
            name={name} 
            address={address} 
            pincode={pincode} 
            phoneNumber={phoneNumber} 
            setName={setName} 
            setAddress={setAddress} 
            setPincode={setPincode} 
            setPhoneNumber={setPhoneNumber} 
            buyNow={buyNow} 
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart