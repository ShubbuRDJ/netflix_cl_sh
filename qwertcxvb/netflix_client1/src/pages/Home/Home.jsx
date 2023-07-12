import "./home.scss"
// import AcUnitIcon from '@mui/icons-material/AcUnit';
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useState,useEffect } from "react";
import axios from 'axios'

export default function Home(props) {
  const [lists,setLists]=useState([]);
  const [genre]=useState(null);

  useEffect(()=>{
    const getRandomList =async ()=>{
      try {
        const res = await axios.get(`lists/fetchList${props.type?"?type="+props.type:""}${genre?"&genre="+genre:""}`,
        {headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}}
        )
        setLists(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getRandomList()
  },[props.type,genre])
  return (
    <div className='home'>
        <Navbar/>
        <Featured type={props.type}/>
        {lists.map((list,i)=>{
          return(<List list={list} key={i} />)
        })}
    </div>
  )
}
