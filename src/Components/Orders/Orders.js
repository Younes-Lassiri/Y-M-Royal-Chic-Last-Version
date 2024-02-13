import React, { useEffect, useState } from 'react';
import './Orders.css';
import Loader from '../Loader/Loader';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/orders')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false); 
            });
    }, []);

    return (
        <>
            {loading ? (
                <div style={{color:'#000009', fontSize:'20px', fontWeight:600}}>Loading...</div> // Show loading message while data is being fetched
            ) : orders.length > 0 ? (
                <div className='order-section'>
                    <table className='tablee' style={{width:'100%'}}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #000009' }}>
                                <th className='th'>Order⇅</th>
                                <th className='th'>Customer⇅</th>
                                <th className='th'>Email⇅</th>
                                <th className='th'>Price⇅</th>
                                <th className='th'>Items⇅</th>
                                <th className='th'>Method⇅</th>
                                <th className='th'>Payment⇅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'rgb(194, 194, 194)' }} className='td'>{order.orderId}</td>
                                    <td className='td'>{order.clientName}</td>
                                    <td className='td'>{order.clientContact}</td>
                                    <td style={{ color: 'rgb(194, 194, 194)' }} className='td'>{order.clientTotalPaid}</td>
                                    <td className='td'>{order.clientItems}</td>
                                    <td style={{ color: 'rgb(194, 194, 194)', textAlign:'center' }} className='td'>{order.clientPayMethod}</td>
                                    <td className='td'><span style={{background:'#046de6', padding:'6px 15px', borderRadius:'30px', color:'white', fontWeight:500, fontFamily:"'Protest Riot', sans-serif", fontSize:'0.8rem'}}>Completed</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{color:'#f5f8f0', fontSize:'15px', fontWeight:600, margin:'auto'}}><Loader/></div>
            )}
        </>
    );
}
