import React, { useEffect, useState } from 'react';
import './Orders.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading to true initially

    useEffect(() => {
        fetch('http://localhost:4000/api/orders')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false); // Update loading state once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false); // Update loading state in case of error
            });
    }, []); // Add an empty dependency array to run the effect only once

    return (
        <>
            {loading ? (
                <div style={{color:'#f5f8f0', fontSize:'20px', fontWeight:600, margin:'auto'}}>Loading...</div> // Show loading message while data is being fetched
            ) : orders.length > 0 ? (
                <div style={{ color: '#25255a' }} className='order-section'>
                    <table className='tablee'>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgb(194, 194, 194)' }}>
                                <th>Order⇅</th>
                                <th>Customer⇅</th>
                                <th>Email⇅</th>
                                <th>Price⇅</th>
                                <th>Items⇅</th>
                                <th>Method⇅</th>
                                <th>Payment⇅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'rgb(194, 194, 194)' }}>{order.orderId}</td>
                                    <td>{order.clientName}</td>
                                    <td>{order.clientContact}</td>
                                    <td style={{ color: 'rgb(194, 194, 194)' }}>{order.clientTotalPaid}</td>
                                    <td>{order.clientItems}</td>
                                    <td style={{ color: 'rgb(194, 194, 194)' }}>{order.clientPayMethod}</td>
                                    <td><button className='btn paid'>Paid</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{color:'#f5f8f0', fontSize:'25px', fontWeight:600, margin:'auto'}}>No orders for now</div>
            )}
        </>
    );
}
