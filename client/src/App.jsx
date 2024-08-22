import React from 'react'
import Navbar from './Components/Navbar.jsx';
import Home from "./Pages/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import Category from './Pages/Category.jsx';
import ProductCard from './Components/ProductCard.jsx';
import AllProduct from './Pages/AllProduct.jsx';

function App() {
  return (
    <div className="  w-screen h-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/product/:id' element={<ProductCard />} />
        <Route path='/all-product' element={<AllProduct />} />
      </Routes>
    </div>
  )
}

export default App
