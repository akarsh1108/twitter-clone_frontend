import React from 'react';
import './LeftSidebar.css';
import logo from '../assets/logo-black.png';
import { FaHome, FaUser } from 'react-icons/fa';

const LeftSidebar = () => {
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
          <FaUser className="self-tab-icon" />
          <div className="profile-menu">
            <button className="menu-button">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
