import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToAppOutlined, AccountCircleRounded } from "@material-ui/icons";

export default function Topbar() {
  const forLogout = ()=>{
      const element = document.getElementById('logout');
      element.classList.remove("logout_toggle")
      const profileImg = document.getElementById("profileImg");
      const html = document.querySelector('html');
      html.addEventListener("click",(e)=>{
        if(e.target !== profileImg){
          element.classList.add("logout_toggle");
        }
      });
  }
  const logout = ()=>{
    localStorage.clear();
    window.location.reload(1);
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">netflixAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div id="logout" className="logout_toggle">
          <div className="topbarLogoutContainer">
            <div className="logout_content">
            <span>Profile</span>
            <AccountCircleRounded/>
            </div>
            <hr style={{marginTop:"4px"}} />
            <div className="logout_content" onClick={logout}>
            <span>Logout</span>
            <ExitToAppOutlined />
            </div>
            <hr style={{marginTop:"4px"}} />
          </div>
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" id="profileImg" className="topAvatar" onClick={forLogout} />
        </div>
      </div>
    </div>
  );
}
