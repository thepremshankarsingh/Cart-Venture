import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/MyState';
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import AllProducts from './pages/allproducts/AllProducts';


function App() {
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order/>
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />

            <Route path="/dashboard" element={
               <ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>
            } />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/productInfo/:id" element={<ProductInfo/>}/>
            <Route path="/addproduct" element={
              <ProtectedRouteForAdmin><AddProduct/></ProtectedRouteForAdmin>
            }/>
            <Route path="/updateproduct" element={
              <ProtectedRouteForAdmin><UpdateProduct/></ProtectedRouteForAdmin>
            }/>
           <Route path='/allproducts' element={<AllProducts/>}/>
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer/>
        </Router>
      </MyState>


    </div>
  );
}

export default App;
 
//  for normal user
export const ProtectedRoute = ({ children }) => {
  const user=JSON.parse(localStorage.getItem('user'))
  if(user)
  {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}
// for adimn
export const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email === 'premplaced@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}