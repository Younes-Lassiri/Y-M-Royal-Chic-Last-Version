import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './settings.css'

export default function Settings(props) {
const [newName, setNewName] = useState('')

const [newEmail, setNewEmail] = useState('')

const [newPassword, setNewPassword] = useState('')


    const [itemDisplay, setItemDisplay] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Update display
          const displayResponse = await fetch('https://royalchicapi-80983a16710e.herokuapp.com/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ display: itemDisplay }),
          });
    
          // Update user
          const userResponse = await fetch(`https://royalchicapi-80983a16710e.herokuapp.com/api/users`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              oldEmail: props.user[0].email,
              newEmail: newEmail || props.user[0].email,
              name: newName || props.user[0].name,
              password: newPassword || props.user[0].password,
            }),
          });
    
          // Check response status for both fetch requests
          if (displayResponse.ok || userResponse.ok) {
            toast.success('Settings and user information updated successfully');
            setTimeout(function(){window.location.reload()}, 2000)
          } else {
            toast.error('Failed to update settings or user information');
          }
        } catch (error) {
          console.error('Error updating settings or user information:', error);
          toast.error('Failed to update settings or user information');
        }
      };



  return (
    <div>
        <ToastContainer />
        <div><h3 style={{color:'#f5f8f0', padding:'15px 0'}}>Account Settings</h3></div>
        <div style={{width:'90%', borderRadius:'3px', position:'relative', height:'90vh'}}>
            <p style={{position:'absolute', right:'20px'}} className='setting-p'>Need to update your profile? <Link style={{color:'#f5f8f0', fontWeight:800, textDecoration:'underline overline #f5f8f0'}} onClick={() => props.setSelectedContent('profile')}> Go to My Profile</Link></p><br/>
            <div className='row'>
                <div className='col-12'><hr style={{width:'92%', color:'#f5f8f0', margin:'25px 0 30px 30px'}}></hr></div>
            </div>


            <div className='form-settings'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-5'>
                            <label className='settingLabel'>Full Name</label>
                        </div>
                        <div className='col-7'>
                            <input type='text' placeholder={`${props.user[0].name}`} className='settingInput' onChange={(e) => setNewName(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row' style={{padding:'30px 0'}}>
                        <div className='col-5'>
                            <label className='settingLabel'>Email</label>
                        </div>
                        <div className='col-7'>
                            <input type='text' placeholder={`${props.user[0].email}`} className='settingInput' onChange={(e) => setNewEmail(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-5'>
                            <label className='settingLabel'>Password</label>
                        </div>
                        <div className='col-7'>
                            <input type='password' placeholder={`${props.user[0].password}`} className='settingInput' onChange={(e) => setNewPassword(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row' style={{padding:'30px 0'}}>
                        <div className='col-5'>
                            <label className='settingLabel'>Collection Items Number</label>
                        </div>
                        <div className='col-7'>
                            <input type='number' className='settingInput' placeholder='How many items you want to show' onChange={(e) => setItemDisplay(e.target.value)}/>
                        </div>
                    </div>


                            <button type="submit" className='btn btn-primary botonaSubmit yayaSave botonaSubmit'>Save Changes</button>
                        

                    


                </form>
            </div>
        </div>
    </div>
  )
}
