import React from "react";
import "./DashboardHeader.css";
import bellIcon from "../assets/TCAssets/BellIcon.png";
import Messages from "../assets/TCAssets/Messages.png";
import Search from "../assets/TCAssets/Search.png";
import Profile from "../assets/TCAssets/Trainerprof.png";

const DashboardHeader = ({
  role,
  userName,
  profileImage,
  notificationCount = 0,
  messageCount = 0,
}) => {
  return (
    <header className="po-header">
      <div className="po-header-search">
        <img src={Search} alt="Search Icon" className="po-header-search-icon" />
        <input type="text" placeholder="Search companies, drives..." />
      </div>

      <div className="po-header-right">
        <div className="po-header-icon-box po-header-icon-box--bell" title="Notifications">
          <img src={bellIcon} alt="Notifications" className="po-header-icon" />
          {notificationCount > 0 && (
            <span className="po-header-badge">{notificationCount}</span>
          )}
        </div>

        <div className="po-header-icon-box po-header-icon-box--message" title="Messages">
          <img src={Messages} alt="Messages" className="po-header-icon" />
          {messageCount > 0 && (
            <span className="po-header-badge">{messageCount}</span>
          )}
        </div>

        <div className="po-header-profile">
          <img
            src={profileImage || Profile}
            alt={`${userName} Profile`}
            className="po-header-profile-img"
          />
          <div className="po-header-profile-info">
            <h4 className="po-header-profile-name">{userName}</h4>
            <p className="po-header-profile-role">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;