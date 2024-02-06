
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Menu from '../Menu/Menu';
import FirstSec from '../FirstSec/FirstSec';
import SecondSec from '../SecondSec/SecondSec';
import Collection from '../Collection/Collection';
import FiveSec from '../FiveSec/FiveSec';
import Footer from '../Footer/Footer';
import WishList from '../wishList/WishList';
import Cart from '../Cart/Cart';
import Shop from '../Shop/Shop';
import Sliderr from '../Slider/Slider';
import Login from '../Login/Login';
import SignUp from '../Admin/SignUp';
import Profile from '../Connexion/Profile';
import Checkout from '../Checkout/Checkout';
import Notification from '../Notification/Notification';
export default function Navigation() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Landing/>
              <div>
                <Menu/>
                <FirstSec/>
                <SecondSec/>
              </div>
              <div className='issue'>
                </div>
              <div><Collection/></div>
              <div><FiveSec/></div>
              <div><Notification/></div>
              <Footer/>
            </div>
          }
        />
        <Route path="/landing" element={<Landing/>} />
        <Route path='/wishList' element={<WishList/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:name' element={<Shop/>}/>

        <Route path='/y&m-admin' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/profile" element={<Profile/>} />

        <Route path="/checkout" element={<Checkout/>} />

        <Route path="/xx" element={<Notification/>} />
        
        <Route path='/elements/product-carousel' element={<Sliderr/>}/>
      </Routes>
      
    </Router>
  )
}
