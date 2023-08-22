import React, { useState } from 'react';
import './LeftSidebar.css';
import logo from '../assets/logo-black.png';
import { FaHome, FaUser } from 'react-icons/fa';
import {useLogoutUserMutation} from '../services/appApi'
import { useSelector} from "react-redux";

const LeftSidebar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const user =useSelector((state)=>state.user);
  const [logoutUser]=useLogoutUserMutation();

  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    window.location.replace("/");
  }


  return (
    <div className="left-sidebar-contents">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="tab-container">
        <div className="tab home-tab">
          <FaHome className="tab-icon" />
        </div>
        <div className="tab profile-tab">
          <FaUser className="self-tab-icon" onClick={() => setShowLogoutDialog(true)} />
          </div>
          {showLogoutDialog && (
            <div className="profile-menu2">
              <p className="menu-description">Are you sure you want to log out?</p>
              <button className="menu-button1" onClick={handleLogout}>
                Logout
              </button>
              <button className="menu-button2" onClick={() => setShowLogoutDialog(false)}>
                Cancel
              </button>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default LeftSidebar;
