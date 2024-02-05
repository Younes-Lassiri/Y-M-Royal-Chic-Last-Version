
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Menu from '../Menu/Menu';
import FirstSec from '../FirstSec/FirstSec';
import SecondSec from '../SecondSec/SecondSec';
import Collection from '../Collection/Collection';
import Last from '../Last/Last';
import FiveSec from '../FiveSec/FiveSec';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_DATA } from '../redux/actions/actions';
import WishList from '../wishList/WishList';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Shop from '../Shop/Shop';
import axios from 'axios';
import Slider from 'react-slick';
import Sliderr from '../Slider/Slider';
import Login from '../Login/Login';
import SignUp from '../Admin/SignUp';
import Profile from '../Connexion/Profile';
import ThirdSec from '../ThirdSec/ThirdSec';
import Checkout from '../Checkout/Checkout';
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
        
        <Route path='/elements/product-carousel' element={<Sliderr/>}/>
      </Routes>
      
    </Router>
  )
}
