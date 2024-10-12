import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar.jsx';
import Home from "./Pages/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import Category from './Pages/Category.jsx';
import AllProduct from './Pages/AllProduct.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import Cart from './Pages/Cart.jsx';
import PlaceOrder from './Pages/PlaceOrder.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import Order from './Pages/Order.jsx';
import OrderDetails from './Pages/OrderDetails.jsx';
import Footer from './Components/Footer.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import AddProduct from './Pages/AddProduct.jsx';
import AllOrders from './Pages/AllOrders.jsx';
import NotFound from './Pages/NotFound.jsx';
import AllUsers from './Pages/AllUsers.jsx';
import { useDispatch, useSelector } from 'react-redux';
import GetAllSalesman from './Components/GetAllSalesman';
import SalesmanRequest from './Components/SalesmanRequest';
import Salesman from './Pages/Salesman.jsx';
import SalesmanProducts from './Pages/SalesmanProducts';
import UpdateProduct from './Pages/UpdateProduct';
import WatchListProduct from './Pages/WatchListProduct';
import UpdateUser from './Pages/UpdateUser';
import ScrollToTop from './Components/ScrollToTop';
import axios from 'axios';
import { useUser } from './store/context';
import { authActions } from './store/auth';
import ResetPassword from './Pages/ResetPassword';
import PaymentCard from './Components/paymentCard';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Failure from './Pages/Failure';
import SuccessPage from './Pages/success.jsx';

// const stripePromise = loadStripe(import.meta.env.VITE_PUBLISABLEKEY);

function App() {
  const role = useSelector(state => state.auth.role);
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();
  const [darkMode, setdarkMode] = useState();
  const { setprofilePhoto } = useUser();

  useEffect(() => {
    const fetch = async () => {
      dispatch(authActions.changeRole(localStorage.getItem('role') ? localStorage.getItem("role") : "customer"));
      if (isLogin === true) {
        const userData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
        if (userData) {
          const avatar = userData.data.user.avatar && userData.data.user.avatar.slice(0, 8) === "/uploads" ? import.meta.env.VITE_SERVER_URL + userData.data.user.avatar : userData.data.user.avatar;
          setprofilePhoto(avatar)
        }
      } else {
        setprofilePhoto()
      }
    }
    fetch();
  }, [isLogin])

  useEffect(() => {
    const mode = localStorage.getItem("dark-mode") === 'true';
    setdarkMode(mode);
  }, [])



  const toggleMode = () => {
    const mode = !darkMode;
    setdarkMode(mode);
    localStorage.setItem('dark-mode', mode)
  }


  return (
    <div className={` w-screen h-screen ${darkMode ? 'dark' : ""} `}>
      <Toaster />
      <Navbar toggleMode={toggleMode} />
      <ScrollToTop />
      <div className=' dark:bg-gray-950'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:category' element={<Category />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/all-product' element={<AllProduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order/productid/:id' element={<PlaceOrder />} />
          <Route path='/place-order-from-cart' element={<PlaceOrder />} />
          <Route path='/myorder' element={<Order />} />
          <Route path='/order-details/:orderid' element={<OrderDetails />} />
          {(role === 'admin' || role === 'salesman') && <Route path='/admin-dashboard' element={<Dashboard />} >
            <Route path='add-product' element={<AddProduct />} />
            <Route index element={<AllOrders />} />
            <Route path='all-orders' element={<AllOrders />} />
            {role === 'admin' && <Route path='all-users' element={<AllUsers />} />}
            {role === 'admin' && <Route path='salesman' element={<Salesman />} >
              <Route index element={<GetAllSalesman />} />
              <Route path='all-salesman' element={<GetAllSalesman />} />
              <Route path='salesman-request' element={<SalesmanRequest />} />
            </Route>}
          </Route>}
          {(role === 'admin' || role === 'salesman') && <Route path='/salesman-products/:id' element={<SalesmanProducts />} />}
          {(role === 'admin' || role === 'salesman') && <Route path='/update-product/:id' element={<UpdateProduct />} />}
          <Route path='/user-details' element={<UpdateUser />} />
          <Route path='/get-watchList' element={<WatchListProduct />} />

          {/* <Route path='/checkout' element={<Elements stripe={stripePromise}>
            <PaymentCard />
          </Elements>} /> */}
          <Route path='*' element={<NotFound />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/cancel' element={<Failure />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
