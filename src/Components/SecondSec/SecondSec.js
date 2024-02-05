import React from 'react';
import './SecondSec.css'
import imgTwo from './myImages/h1-img-2.jpg'


export default function SecondSec() {
  return (
    <div className="second-sec">
      <div className="container">
  <div className="row">
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 three">
      <img src={imgTwo} alt="" />
    </div>
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 four">
    <h1 style={{ color: '#928c81', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',marginTop:'80px' }}>OUR BI-MONTHLY EDITORIAL</h1>
            <h1 style={{ color: '#2e2e2d', fontWeight: 400, fontFamily: 'EB Garamond, serif',marginTop:'25px',fontSize:'2.4rem' }}>Understanding <span style={{ fontStyle: 'italic' }}>style</span> again</h1> {/* Fix font family syntax */}
          
              <p>
                <span style={{ fontWeight: 500 }}>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
                and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
                where fashion meets grace, and sophistication is effortless.
              </p>
            <button className='button'>SHOP NOW</button>
    </div>
  </div>
</div>
    </div>
  );
}


