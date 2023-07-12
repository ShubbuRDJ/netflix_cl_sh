import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newList.css";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { getMovies } from "../../context/movieContext/movie_API_call";
import { createList } from "../../context/listContext/list_API_call";
import { useHistory } from "react-router-dom"


export default function NewList() {
  const history = useHistory()
  const [list,setList] = useState(null);

  const {movies,dispatch:dispatchMovie}  = useContext(MovieContext)
  const {dispatch}  = useContext(ListContext)

  useEffect(()=>{
    getMovies(dispatchMovie)
    alert("Press and Hold ctrl key to select movie");
  },[dispatchMovie])
  const handleOhChange = (e)=>{
    const value = e.target.value;
    setList({...list,[e.target.name]:value})
  }

  const handleSelect = (e)=>{
    const value = Array.from(e.target.selectedOptions,(option)=>option.value)
    setList({...list,[e.target.name]:value})
  }
  
  const handleCreate = (e)=>{
    e.preventDefault();
    createList(list,dispatch);
    history.push("/lists")
  }
  return (
    <>
    <Topbar/>
    <div className="container">
      <Sidebar/>
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">

        <div className="addProductItem">
          <label>List Title</label>
          <input type="text" placeholder="Enter title here" name="title" onChange={handleOhChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Enter genre here" name="genre" onChange={handleOhChange}  />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name="type" id="type" onChange={handleOhChange}>
            <option>type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        </div>
        <div className="formRight">

        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" id="content" onChange={handleSelect} style={{height:"280px"}}>
            {movies.map((movie)=>(
              <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))}
          </select>
        </div>
        </div>
        <button className="addProductButton" onClick={handleCreate}>Create</button>
      </form>
    </div>
    </div>
    </>
  );
}
