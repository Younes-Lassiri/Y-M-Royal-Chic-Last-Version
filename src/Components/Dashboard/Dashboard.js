import React, { useEffect, useState } from 'react'
import './Dashboard.css'

export default function Dashboard() {
const [orders, setOrders] = useState([])

const [messages, setMessages] = useState([])

function calculateTimePassed(createdAt) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
  
    const timeDifference = currentDate - createdDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return `${secondsDifference} seconds ago`;
    }
  }

  



useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/orders')
    .then((res) => res.json())
    .then((data) => {
        setOrders(data)
    })

    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
    .then((res) => res.json())
    .then((data) => {
        setMessages(data)
    })
}, [])
  return (
    <div className='dashboard-section container' style={{padding:'5px 10px'}}>

<div className='row' style={{display:'flex', justifyContent:'space-around'}}>
    <div className='col-4' style={{display:'flex', alignItems:'center', justifyContent:'start', gap:'30px', background:'white', borderRadius:'18px',padding:'20px 20px', width:'310px', cursor:'pointer'}}>
    <i class='bx bxs-calendar-check' style={{fontSize:'2.7rem', 
    background:'#acd3ff', padding:'10px 10px', borderRadius:'10px', color:'#046de6'}}></i>
    <div>
        <h1 style={{fontWeight:600, fontSize:'1.3rem'}}>{orders.length}</h1>
        <span style={{fontWeight:500, fontSize:'1rem'}}>New Order</span>
    </div>
    </div>


    <div className='col-4' style={{display:'flex', alignItems:'center', justifyContent:'start', gap:'30px', background:'white', borderRadius:'18px',padding:'20px 20px', width:'310px', cursor:'pointer'}}>
    <i class='bx bxs-user-account' style={{fontSize:'2.7rem', 
    background:'rgb(250, 250, 116)', padding:'10px 10px', borderRadius:'10px', color:'rgb(197, 197, 0)'}}></i>
    <div>
        <h3 style={{fontWeight:600, fontSize:'1.3rem'}}>2834</h3>
        <span style={{fontWeight:500, fontSize:'1rem'}}>Visitors</span>
    </div>
    </div>

    <div className='col-4' style={{display:'flex', alignItems:'center', justifyContent:'start', gap:'30px', background:'white',  borderRadius:'18px',padding:'20px 20px', width:'310px', cursor:'pointer'}}>
    <i class='bx bxs-dollar-circle' style={{fontSize:'2.7rem', 
    background:'rgb(255, 209, 122)', padding:'10px 10px', borderRadius:'10px', color:'rgb(233, 151, 0)'}}></i>
    <div>
    <h3 style={{ fontWeight: 600, fontSize: '1.3rem' }}>
  ${orders.reduce((total, order) => total + order.clientTotalPaid, 0).toLocaleString()}
</h3>


        <span style={{fontWeight:500, fontSize:'1rem'}}>Total Sales</span>
    </div>
    </div>
    <div className='container' style={{padding:'30px 35px 0 35px'}}>
    <div class="dashbord-row" style={{display:'flex', gap:'19px'}}>
        <div class="dashbord-left-column" style={{padding:'20px 20px'}}>
            <h1 className='recent-orders' style={{fontWeight:600, color:'#000009', fontSize:'1.8rem'}}>Recent Orders</h1>
<div className='row' style={{padding:'15px 0'}}>
    <div className='col-4' style={{color:'#000009', fontWeight:600, fontFamily:"'Protest Riot', sans-serif"}}>User</div>
    <div className='col-4' style={{color:'#000009', fontWeight:600, fontFamily:"'Protest Riot', sans-serif"}}>Date Order</div>
    <div className='col-4' style={{color:'#000009', fontWeight:600, fontFamily:"'Protest Riot', sans-serif"}}>Status</div>
</div>
{orders.length > 0? orders.slice().reverse().slice(0,4).map(function(order, i){
    return(
        <div className='row' style={{padding:'12px 0'}} key={i}>
    <div className='col-4' style={{display:'flex', alignItems:'center', gap:'10px', fontWeight:600, fontFamily:"'Protest Riot', sans-serif"}}><i class='bx bxs-user-circle' style={{fontSize:'1.3rem'}}></i>{order.clientName}</div>
    <div className='col-4' style={{fontWeight:500, fontFamily:"'Protest Riot', sans-serif"}}>{new Date(order.created_at).toLocaleDateString()}</div>
    <div className='col-4'><span style={{background:'#046de6', padding:'6px 17px', borderRadius:'30px', color:'white', fontWeight:500, fontFamily:"'Protest Riot', sans-serif", fontSize:'0.8rem'}}>Completed</span></div>
</div>
    )
}) : <h2 style={{color:'#000009'}}>No Orders For Now</h2>}



        </div>
        <div class="dashbord-right-column" style={{padding:'10px 10px'}}>
        <h1 className='recent-orders' style={{fontWeight:600, color:'#000009', fontSize:'1.8rem'}}>Notifications</h1>
        {messages.slice().reverse().slice(0, 5).map(function(message, i){
            return(
                <div style={{width:'100%',borderRadius:'5px', padding:'10px 10px', 
                display:'flex', alignItems:'center', gap:'10px'}} key={i}>



                    <div className='row'>
                        <div className='col-2'><i class='bx bxs-chat' style={
                    {color:'#046de6', fontSize:'2rem'}}></i></div>
                        <div className='col-10'><span style={{fontWeight:'bold'}}>{message.userName} send you a message </span>"{message.contactMessage}" <span style={{color
                        :'#046de6'}}>{calculateTimePassed(message.created_at)}</span></div>
                    </div>
                    </div>
                    
            )
        })}
        </div>
    </div>
    </div>

</div>



    </div>
  )
}
