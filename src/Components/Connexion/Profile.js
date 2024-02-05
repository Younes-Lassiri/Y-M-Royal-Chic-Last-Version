import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../helpers/authContext";
import { BrowserRouter, Route, Link, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import profileImg from './myImages/profile-svgrepo-com.png'
import Login from "../Login/Login";
import AddProduct from "../addProduct/AddProduct";
import Settings from "../settings/Settings";














export default function Profil() {

  const [activeLink, setActiveLink] = useState('profile');
  const [selectedContent, setSelectedContent] = useState('addProducts');

  // Function to handle link clicks and update selectedContent state
  const handleLinkClick = (content) => {
    setSelectedContent(content);
    setActiveLink(content);
  };

  // Render content based on selectedContent state
  const renderContent = () => {
    switch (selectedContent) {
      case 'addProducts':
        return <AddProduct/>;
        case 'settings':
          return <Settings user={user} setSelectedContent={setSelectedContent}/>;
      default:
        return null;
    }
  };
  const { logged, setLogged, user, setUser } = useContext(authContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    checkLogin();
    userInfo();
  }, []);

  const checkLogin = () => {
    if (!localStorage.getItem("userToken")) {
      setLogged(false);
      console.log("You are not connected");
      navigate("/login");
    }
  };

  const userInfo = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      // Handle error if needed
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };



  




  

  const renderView = loading ? (
    <div>Loading...</div>
  ) : (
    <div className="profile-container">
      <Menu profile={true}/>
  <div className="row">
    <div className="col-3">
      <aside className="user-nav">
        <div className="profile-section">
          <div className="img-sec"><img src='https://ih1.redbubble.net/image.4765480208.4702/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg'/></div>
          <h1>{user[0].name}<br></br>
            <span style={{fontWeight:'300', fontSize:'12px'}}>{user[0].email}</span>
          </h1>
        </div>
        <ul className="profile-ul">
        <li onClick={() => handleLinkClick('profile')} className={activeLink === 'profile' ? 'visited' : ''}><Link className="a">Profile</Link></li>

        <li onClick={() => handleLinkClick('orders')} className={activeLink === 'orders' ? 'visited' : ''}><Link className="a">Orders</Link></li>

        <li onClick={() => handleLinkClick('notifications')} className={activeLink === 'notifications' ? 'visited' : ''}><Link className="a">Notifications</Link></li>
          <li onClick={() => handleLinkClick('addProducts')} className={activeLink === 'addProducts' ? 'visited' : ''}><Link className="a">Add Products</Link></li>
          


          <li onClick={() => handleLinkClick('settings')} className={activeLink === 'settings' ? 'visited' : ''}><Link className="a">Settings</Link></li>


          <li onClick={handleLogout}><Link className="a logOut">Log Out</Link></li>

        </ul>
      </aside>
    </div>
    <div className="col-9">
      {renderContent()}
    </div>
  </div>
  {/*<li><button onClick={handleLogout} style={{color:'white'}} className="nav-link">Log Out</button></li>*/}
</div>



  );

  return <>{renderView}</>;
}
