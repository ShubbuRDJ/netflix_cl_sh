import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {
  const [newUser,setNewUser]=useState([]);
  useEffect(()=>{
    const getUsers = async ()=>{
      const res = await axios.get("users/findAllUser?new=true",{
        headers:{auth_token:"csckmcvs "+JSON.parse(localStorage.getItem('user')).accessToken}
      })
      setNewUser(res.data)
    }
    getUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user)=>{
          return (<li key={user._id} className="widgetSmListItem">
          <img
            src={user.profilePic || "https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3" }
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.userName}</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>)
        })}
      </ul>
    </div>
  );
}
