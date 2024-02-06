import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
export default function Orders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/api/orders')
        .then((res) => res.json())
        .then((data) => {
            setOrders(data)
        })
    })



    
  return (
    <div style={{color:'#25255a'}} className='order-section'>
    <table className='tablee'>
        <tr style={{borderBottom:'1px solid rgb(194, 194, 194)'}}>
            <th>Order⇅</th>
            <th>Customer⇅</th>
            <th>Email⇅</th>
            <th>Price⇅</th>
            <th>Items⇅</th>
            <th>Method⇅</th>
            <th>Payment⇅</th>
        </tr>
        {orders.length > 0 ? (
    orders.map(function(order, i) {
        return (
            <tr key={i}>
                <td style={{color:'rgb(194, 194, 194)'}}>{order.orderId}</td>
                <td>{order.clientName}</td>
                <td>{order.clientContact}</td>
                <td style={{color:'rgb(194, 194, 194)'}}>{order.clientTotalPaid}</td>
                <td>{order.clientItems}</td>
                <td style={{color:'rgb(194, 194, 194)'}}>{order.clientPayMethod}</td>
                <td><button className='btn paid'>Paid</button></td>
            </tr>
        );
    })
) : (
    <tr>
        <td colSpan="7"><h2>No orders for now</h2></td>
    </tr>
)}

    </table>
    </div>
  )
}
