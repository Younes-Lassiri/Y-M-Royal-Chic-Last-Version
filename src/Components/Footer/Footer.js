import React from 'react'
import './Footer.css'
import { Link } from 'react-scroll'
import Slider from '../Slider/Slider'

export default function Footer() {
  return (
    <div className='container-fluid footer'>
    <div className='row'>
        <div className='col-12 col-md-4'>
            <h1 className='logo-footer'>Y&M Royal Chic</h1>
        </div>
        <div className='col-12 col-md-4'>
            <div className='div-inp'>
            <p className='description-footer'>
                Subscribe to La Comète<br></br> newsletter and share our story.
            </p>
            <input type='email' placeholder='Your Email' className='footer-input'/>
            <button className='btnn'>Send</button>
            
            </div>
        </div>
        
        <div className='col-12 col-md-4 menuu'>
            <div className='ol'>
                <h6 className='footer-links'>ELSEWHERE</h6>
                <ul className="list-unstyled">
                <li className="nav-item">
            <Link className="nav-link" to="/wishList">
            WishList
                </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/y&m-admin">
            Pages
                </Link>
            </li>
            <li  className="nav-item"><Link to='/shop' className="nav-link">SHOP</Link></li>
            <li className="nav-item">
            <Link className="nav-link" aria-current="page" href="#">
                ELEMENTS
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart
                </Link>
            </li>
                </ul>
            </div>
        </div>
    </div>
    <hr/>
    <p className='para'>©Younes 2023 Y&M Royal Chic, ALL RIGHTS RESERVED</p>
    
</div>

  )
}
