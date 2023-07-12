import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import './featured.scss'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function Featured(props) {
  const [content,setContent]=useState({});
  useEffect(()=>{
    const getRandomMovie= async ()=>{
      try {
        const res = await axios.get(`movies/fetchRandomMovie${props.type?"?type="+props.type:""}`,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        setContent(res.data[0]);
      } catch (err) {
        console.log(err)
      }
    }
    getRandomMovie();
  },[props.type])
  return (
    <div className='featured'>
        {props.type && (
            <div className="category">
                <span>{props.type==="movies"?"Movies":"Series"}</span>
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
      <img
          src={content.imgTitle}
          alt=""
        />
        <span className="desc">
            {content.desc}
        </span>
        <div className="buttons">
            <button className="play">
                <PlayArrow/>
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlined/>
                <span>Info</span>
            </button>
        </div>
      </div>
    </div>
  )
}
