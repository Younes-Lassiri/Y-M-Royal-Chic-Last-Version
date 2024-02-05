import React from 'react'
import './Checkout.css'

import { useState } from 'react';



export default function Checkout(props) {


    const [index, setIndex] = useState(0)

    const products = props.products.filter(pro => pro.quantite != 0)

  return (
      <div className="card">
        <div className="leftside">
            <img src={products[index].thumbnail} style={{width:'100%', height:'85%'}}/>
            <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
            <span style={{textAlign:'center'}} className='check-name'>The {products[index].name}</span><br></br>

            <span style={{textAlign:'center'}} className='check-desc'>Style ‎428027 K0LCN 8685</span><br></br>
            
            <span style={{textAlign:'center'}} className='check-price'>
  $ { (products[index].quantite * products[index].price).toLocaleString('en-US') }
</span>
<br></br>

            </div>
            <button className={index === 0? 'prev-btn btn-disabled' : 'prev-btn'} onClick={() => setIndex(index-1)} disabled={index === 0}>‹</button>

            <button className={index === products.length - 1? 'next-btn btn-disabled' : 'next-btn'} onClick={() => setIndex(index+1)} disabled={index === products.length - 1}>›</button>
        </div>
        <div className="rightside">
          <form>
            <h2 style={{color:'#000009'}}>Payment Information <button style={{float:'right', background:'transparent', border:'none', color:'#000009', fontWeight:500}} onClick={() => props.setPay(false)}>✖</button></h2>
            <p style={{color:'#000009'}}>Cardholder Name</p>
            <input type="text" className="inputbox" name="name" required />
            <p style={{color:'#000009'}}>Card Number</p>
            <input type="number" className="inputbox" name="card_number" id="card_number" required />
            <p style={{color:'#000009'}}>Card Type</p>
            <select className="inputbox" name="card_type" id="card_type" required>
              <option value="">--Select a Card Type--</option>
              <option value="Visa">Visa</option>
              <option value="RuPay">RuPay</option>
              <option value="MasterCard">MasterCard</option>
            </select>
            <div className="expcvv">
              <p className="expcvv_text" style={{color:'#000009'}}>Expiry</p>
              <input type="date" className="inputbox" name="exp_date" id="exp_date" required />
              <p className="expcvv_text2">CVV</p>
              <input type="password" className="inputbox" name="cvv" id="cvv" required />
            </div>
            <div class="row">
                <div className='col-6' style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <input type='checkbox' style={{height:'13px', width:'13px'}}/>
                <label className='terms-text'>I have read and agree to the terms and conditions</label>
                
                </div>
                
              </div>
            <p><span>Total: $ {props.total.toLocaleString('en-US')}</span></p>
            <button type="submit" className="checkoutBtn">Pay Now</button>
          </form>
        </div>
      </div>
  );
}
