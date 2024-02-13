import React, { useEffect, useState } from 'react'
import './Team.css'

export default function Team() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users')
        .then((res) => res.json())
        .then((data) => {
            setTeam(data)
        })
    })
  return (
    <div className='order-section'>
                    <table className='tablee' style={{width:'100%'}}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #000009' }}>
                                <th className='th'>Admin Id</th>
                                <th className='th'>Admin Name</th>
                                <th className='th'>Admin Email</th>
                                <th className='th'>Admin Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.map((team, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'rgb(194, 194, 194)' }} className='td'>{team.id}</td>
                                    <td className='td'>{team.name}</td>
                                    <td className='td'>{team.email}</td>
                                    <td style={{ color: 'rgb(194, 194, 194)' }} className='td'>{team.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
  )
}
