import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Landind.css'


import one from './myImages/blog-post-2.jpg'



export default function Landing() {

  useEffect(() => {
    const hid = document.getElementById('hidden');
    const timer = setTimeout(() => {
      if (hid) {
        hid.style.transform = 'translateY(0)';
      }
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []); 
  


  function hideEff(){
    const hid = document.getElementById('hidden');

    hid.style.display = 'none'
  }
  
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 700) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='landing-page' id='top'>
      <div><h1 className='logo'>Y&M Royal Chic</h1></div>
      <div className='description'>
        <h1 style={{ fontWeight: 300 }}>
          Burning <span style={{ fontStyle: 'italic', fontWeight: 100 }}>brightly </span>
          as a star, <span style={{ fontStyle: 'italic', fontWeight: 100 }}>new<br></br> collection </span>
          is here
        </h1>
      </div>
      <div className='scroll'>
        <ScrollLink className='a' to="menu" smooth={true} duration={500}>
          scroll down
        </ScrollLink>
      </div>
      <div className='scroll-line'></div>
      {showToTop && (
        <div className={`toTop ${showToTop ? 'show' : ''}`}>
        <ScrollLink className='span' to="top" smooth={true} duration={500}>
        ↑
        </ScrollLink>
      </div>
      )}
      

      
      <div style={{position: 'fixed', left: 0, bottom: 0, background: '#000009', height: '48vh', width: '100%', transform: "translateY(48vh)", transition: '1s', zIndex: 90000, padding: '35px'}} id='hidden'>
        <div className='row'>
          <div className='col-6'>
            <div className='row'>
              <div className='col-6' style={{textAlign: 'center'}}>
              <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/05/pop-up-img-1.jpg' style={{width: '80%', height: '250px'}}/>
              </div>

              <div className='col-6' style={{textAlign: 'center'}}>
                <img src={one} style={{width: '80%', height: '250px'}}/>
              </div>
            </div>         
          </div>

          <div className='col-6'>
            <div className='row'>
              <div className='col-6'>
              <h2 style={{fontFamily: 'EB Garamond,serif', color: '#f5f8f0', fontWeight: 400}}>Subscribe to Y&M<br></br> Royal Chic for ALL news</h2><br></br>
            <p style={{color: '#f5f8f0', fontSize: '18px'}}>We care about our customers - you<br></br> have always been an integral part of<br></br> who we are. Join today</p>
              </div>
              <div className='col-6'>
                <input type='email' value='Your Email' className='inputE' style={{color:'#f5f8f0'}}/>
              </div>
            </div>
          </div>
        </div>
        <button className='hideEff' onClick={() => hideEff()} style={{color:'#f5f8f0'}}>✖</button>
      </div>



    </div>
  );
}
