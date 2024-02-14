import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import './Shop.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_REVIEW, ADD_TO_CART, ADD_WISH_PRODUCT } from '../redux/actions/actions';
import { ADD_SINGLE_QUANTITE } from '../redux/actions/actions';
import { MINUCE_SINGLE_QUANTITE } from '../redux/actions/actions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios
 from 'axios';

import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Shop() {
  const dispatch = useDispatch();
  const [initialStyle, setInitialStyle] = useState({});



  const [clientName, setClientName] = useState("")
  const [review, setReview] = useState("")




  









  

  function effect() {
    let images = document.querySelectorAll('.effect');
    let secondImg = document.querySelector('.secondImg');

    let clicked = false;

    images.forEach((image, i) => {
      image.addEventListener('click', function () {
        images.forEach((img) => img.classList.remove('clicked'));
        image.classList.add('clicked');

        secondImg.style.transform = image.style.transform;

        clicked = true;
      });

      if (i === 0 && !clicked) {
        setInitialStyle({});
      }
    });
  }
  


  const [content, setContent] = useState("Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error epicurei mea et. Mea facilisis urbanitas moderatius id. Vis ei rationibus definiebas, eu qui purto zril laoreet. Ex error omnium interpretaris pro, alia illum ea vim.")




  function showPro(content){
    setContent(content)
  }

 
  

  
  const products = useSelector((state) => state.products);
  const { name } = useParams();


  const [linkHovered, setLinkHovered] = useState("")

  useEffect(() => {
    document.title = `${name} - ${document.title}`;
  }, [name]);
  

  const product = products.find((product) => product.name === name);

  useEffect(() => {
    effect(); // Invoke the effect function when the component mounts
  }, [product]);

  if (!product) {
    return <div>Loading...</div>; // Placeholder for when product is not available yet
  }










  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
        productId: product.id, 
        clientName: clientName, 
        reviewContent: review
    };

    try {
        const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Error adding review');
        }

        const data = await response.json();
        console.log('Review sent successfully:', data);

        // Show success message using toast notification
        toast.success("Thank you for your review! Your review has been sent successfully.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        
        

    } catch (error) {
        console.error('Error adding order:', error);
        // Handle error - you can display an error message to the user
    }
};


  return (
    <div className='shop'>
      <Menu />
      <div className='title'>
        <h1>Shop</h1>
      </div>
      <div className='container h-100' style={{ marginTop: '150px' }}>
        <div className='row'>
          <div className='col-lg-2 col-12 text-center mb-3 mb-lg-0 order-lg-1 order-2' style={{ height: '95vh', position: 'relative' }}>
            
            <div
              className='raraa'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={product.thumbnail}
                style={{ width: '100%', height: '100%', transform: 'scale(2.5) translateX(-40px)' }}
                className='effect clicked'
              />
            </div>
            <div
              className='raraa twoo'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '30vh',
                marginTop: '13px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={product.thumbnail}
                style={{ width: '100%', height: '100%', transform: 'scale(2.7) translateX(-5px)' }}
                className='effect'
              />
            </div>
            <div
              className='raraa'
              style={{
                height: '30vh',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '60vh',
                marginTop: '26px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img src={product.thumbnail} style={{ width: '100%', height: '100%' }} className='effect' />
            </div>
          </div>
          <div className='col-lg-5 col-12 uu order-1' style={{ height: '95vh', position: 'relative' }}>
            <div className='' style={{ height: '99%', overflow: 'hidden', cursor: 'crosshair' }}>
              <img src={product.thumbnail} style={{ height: '100%', width: '100%', ...initialStyle }} className='secondImg' />

              {product.new && <div className='new'>NEW</div>}
              {product.promo && (
                <>
                  <div className='promo'>-{product.promoValue}%</div>
                  <div className='oldPrice'>${product.oldPrice}</div>
                </>
              )}
              {product.sold && <div className='sold'>SOLD</div>}
            </div>
          </div>
          <div className='col-lg-5 col-12 h-100 second order-3' style={{ padding: '0 35px', position: 'relative' }}>
            <div className='hideView'>
              <h1 style={{ fontSize: '40px', color: '#2e2e2d', fontWeight: 400, marginTop: '-10px' }}>{product.name}</h1>
            </div>
            <span style={{ fontSize: '22px', color: '#727272' }}>${product.price}</span>
            <br></br>
            <span style={{ color: '#bf402e', fontSize: '25px', letterSpacing: '10px' }}>★★★★★</span>
            <span style={{ fontSize: '16px', paddingLeft: '20px', color: '#727272' }}>(1 customer review)</span>
            <br></br>
            <p
              className='view-para'
              style={{
                padding: '30px 0',
                fontSize: '20px',
                color: '#727272',
              }}
            >
              Alie num phaed rum torquatos nec eu, vis detraxit per iculis ex, nihil expete ndis in mei. Mei an per icula
              eurip idis, hinc ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem ipsum dolor sit.
            </p>
            <br></br>
            {product.sold ? (
              <>
                <span className='yaya' style={{ cursor: 'auto', padding: '25px 0' }}>
                  OUT OF STOCK
                </span>
                <br></br>
                <div style={{ margin: '30px 0' }}>
                  <span onClick={() => dispatch({ type: ADD_WISH_PRODUCT, payload: product.id })}>
                    <a className='yaya'>ADD TO WISHLIST</a>
                  </span>
                </div>
                <br></br>
                <div className='infos'>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    SKU: 00{product.id}
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    CATEGORY: Creative
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    TAGS: Brand, New, Silver
                  </span>
                  <br></br>
                </div>
              </>
            ) : (
              <div className='shopOperation'>
                <div
                  className=''
                  style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px', marginBottom: '20px' }}
                >
                  <span style={{ color: '#727272', letterSpacing: '.2rem', fontSize: '17px' }}>Quantite</span>
                  <span
                    style={{
                      fontSize: '15px',
                      padding: '0px',
                      color: '#727272',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      style={{ color: '#727272', backgroundColor: 'transparent', fontWeight: 'bold', border: 'none', fontSize: '25px' }}
                      onClick={() => {dispatch({type:MINUCE_SINGLE_QUANTITE,payload:product.id})}}>
                      ‹
                    </button>
                    <span style={{ marginTop: '2px' }}>{product.quantite}</span>
                    <button
                      style={{ color: '#727272', backgroundColor: 'transparent', fontWeight: 'bold', border: 'none', fontSize: '25px' }}
                    onClick={() => {dispatch({type:ADD_SINGLE_QUANTITE,payload:product.id})}}>
                      ›
                    </button>
                  </span>
                  <button className='botonaa' onClick={() => dispatch({ type: ADD_TO_CART, payload: product.id })}>
                    Add to cart
                
                  </button>
                </div>
                <span onClick={() => dispatch({ type: ADD_WISH_PRODUCT, payload: product.id })}>
                  <a className='yaya'>ADD TO WISHLIST</a>
                </span>
                <br></br>
                <div className='infos' style={{ marginTop: '35px' }}>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    SKU: 00{product.id}
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    CATEGORY: Creative
                  </span>
                  <br></br>
                  <span style={{ color: '#727272', letterSpacing: '.1rem', fontSize: '13px', fontFamily: 'monospace', fontWeight: '900' }}>
                    TAGS: Brand, New, Silver
                  </span>
                  <br></br>
                </div>
              </div>
            )}
          </div>
          
        </div>


        

      </div>
      <div className='product-informations container' style={{padding:'60px 0'}}>
          <ul className='product-informations container-navbar' style={{display:'flex', gap:'50px', marginLeft:'-32px', alignItems:'center'}}>
            <li style={{color:'#727272', fontSize:'1rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer'}} onClick={() => showPro(
              "Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error epicurei mea et. Mea facilisis urbanitas moderatius id. Vis ei rationibus definiebas, eu qui purto zril laoreet. Ex error omnium interpretaris pro, alia illum ea vim."
            )}>Description</li>

            <li style={{color:'#727272', fontSize:'1rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer'}}
             className={linkHovered === "additional"? "active-nav-pro-before" :null} onClick={() => showPro(
              <h1>jjj</h1>
            )}>ADDITIONAL INFORMATION</li>

            <li style={{color:'#727272', fontSize:'1rem', fontWeight:300, fontFamily:'monospace', cursor:'pointer'}} onClick={() => showPro(
              <div>
                <h5>1 review for {product.name}</h5>
                <span>Add a review</span>
                <span>Your email address will not be published. Required fields are marked *</span><br></br>
                <form onSubmit={handleSubmit}>
                <label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Your review *</label><br></br>
                <textarea style={{width:'100%',height:'30vh', background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', outline:'none'}} onChange={(e) => setReview(e.target.value)}/><br></br>
                <label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Name *</label><br></br>
                <input type='text' style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} onChange={(e) => setClientName(e.target.value)}/><br></br>
                <label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Email *</label>
                <input type='email' style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}}/><br></br>
                <button type='submit' style={{padding:'14px 45px', color:'#000009', fontWeight:200, background:'transparent', border:'1px solid #000009',margin:'40px 0'}} className='review-btn'>Submit</button>
                </form>
              </div>
            )}>REVIEWS (1)</li>
          </ul>
          <p style={{padding:'25px 0'}}>
            {content}
          </p>

        </div>
      
      <Footer />
    </div>
  );
}
