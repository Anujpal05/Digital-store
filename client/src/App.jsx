import React, { useEffect } from 'react'
import Navbar from './Components/Navbar.jsx';
import Home from "./Pages/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import Category from './Pages/Category.jsx';
import ProductCard from './Components/ProductCard.jsx';
import AllProduct from './Pages/AllProduct.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import Cart from './Pages/Cart.jsx';
import PlaceOrder from './Pages/PlaceOrder.jsx';
import Order from './Pages/Order.jsx';


function App() {


  return (
    <div className="  w-screen h-screen overflow-x-hidden">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/product/:id' element={<ProductCard />} />
        <Route path='/all-product' element={<AllProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order/productid/:id' element={<PlaceOrder />} />
        <Route path='/myorder' element={<Order />} />
      </Routes>
    </div>
  )
}

export default App
