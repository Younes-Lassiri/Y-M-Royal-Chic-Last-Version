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

    return (
        <>
            {loading ? (
                <div style={{color:'#f5f8f0', fontSize:'20px', fontWeight:600, margin:'auto'}}>Loading...</div> // Show loading message while data is being fetched
            ) : messages.length > 0 ? (
                <div className='noti-section'>
                    <table className='tablee'>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgb(194, 194, 194)' }}>
                                <th>Customer⇅</th>
                                <th>Email⇅</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((messages, i) => (
                                <tr key={i}>
                                    <td style={{ color: '#000009' }}>{messages.userName}</td>
                                    <td style={{ color: '#000009' }}>{messages.userEmail}</td>
                                    <td style={{ color: '#000009' }}>{messages.contactMessage}</td>
                                    
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
