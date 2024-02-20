import React from 'react'
import './Products.css'
import { useSelector } from 'react-redux'
export default function Products() {
    const products = useSelector((state) => state.products)
  return (
    <div className='container products-section'>
        <div className='row'>
            <div className='col-12'>
            <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>New</th>
                                <th>Promo Value</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.length > 0 ? products
                        .map((prod, i) => (
                            <tr key={i}>
                                <td>{prod.id}</td>
                                <td>{prod.name}</td>
                                <td style={{ color: 'green' }}>${prod.price.toLocaleString('en-US')}</td>
                                <td>{prod.isNew? "True" : "False"}</td>
                                <td>{prod.promoValue}</td>
                            </tr>
                        )) : <h2>No Products for now</h2>}
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}
