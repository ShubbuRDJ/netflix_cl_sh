import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const months = useMemo(()=> [
    "Jan","Feb","Mar","Apr","may","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ],[]
)
  const [userStats,setUserStats]= useState([]);
  useEffect(()=>{
    const getStats = async ()=>{
      const res = await axios.get("users/stats",{
        headers:{auth_token:"csckmcvs "+JSON.parse(localStorage.getItem('user')).accessToken}
      });
      const statsList = res.data.sort(function(a,b){
        return a._id - b._id;
      })
      statsList.map((item)=>{ return setUserStats(prev=>[...prev,{name:months[item._id-1],"New User":item.total}])})
    }
    getStats();
  },[months])
  return (
      <>
      <Topbar/>
      <div className="container">
      <Sidebar/>
      <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
      </div>
      </>
  );
}
