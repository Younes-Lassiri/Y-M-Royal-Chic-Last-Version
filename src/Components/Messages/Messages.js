import React from 'react'
import './Messages.css'
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
                console.log(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

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

    return (
        <>
            {loading ? (
                <div style={{color:'#f5f8f0', fontSize:'20px', fontWeight:600, margin:'auto'}}>Loading...</div> // Show loading message while data is being fetched
            ) : messages.length > 0 ? (
                <div className='noti-section'>
                    <table className='tablee' style={{width:'100%'}}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #000009' }}>
                                
                                <th>Customer⇅</th>
                                <th>Email⇅</th>
                                <th>Message⇅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, i) => (
                                <tr key={i}>
                                    <td style={{ color: '#000009', textAlign:'left', display:'flex', alignItems:'center', gap:'10px' }}><i class='bx bxs-chat' style={
                    {color:'#046de6', fontSize:'2rem'}}></i>{message.userName}<span style={{color:'#046de6', fontSize:'0.7rem', fontWeight:500}}>{calculateTimePassed(message.created_at)}</span></td>
                                    <td style={{ color: '#000009', textAlign:'left' }}>{message.userEmail}</td>
                                    <td style={{ color: '#000009', textAlign:'left' }}>{message.contactMessage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            ) : (
                <div>No Messages For Now</div>
            )}
        </>
    );
}
