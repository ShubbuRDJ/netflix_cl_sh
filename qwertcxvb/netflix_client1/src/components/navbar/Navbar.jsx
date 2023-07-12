import { ArrowDropDown, Notifications, Search } from "@mui/icons-material"
import { useState } from "react"
import "./navbar.scss"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [isScrolled,setIsScrolled] = useState(false)
    window.onscroll = ()=>{
        setIsScrolled(window.scrollY === 0? false:true);
        return ()=>(window.onscroll=null);
    }
  return (
    <div className={isScrolled?"navbar scrolled": "navbar"}>
      <div className="container">
        <div className="left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
            <Link className="link" to="/"><span>Homepage</span></Link>
            <Link className="link" to="/series"><span>Series</span></Link>
            <Link className="link" to="/movies"><span>Movies</span></Link>
            <span>New and Popular</span>
            <span>My List</span>
        </div>
        <div className="right">
            <Search className="icon"/>
            <span>Kid</span>
            <Notifications className="icon"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Teo_garc%C3%ADa_actor_Netflix.jpg" alt="" />
            <div className="profile">
            <ArrowDropDown className="icon"/>
            <div className="options">
                <span>Settings</span>
                <span>Logout</span>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}
