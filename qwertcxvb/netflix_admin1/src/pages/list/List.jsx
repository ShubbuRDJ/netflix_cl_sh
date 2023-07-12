import { Link,useLocation } from "react-router-dom";
import "./list.css";
// import { Publish } from "@material-ui/icons";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
// import { ListContext } from "../../context/listContext/ListContext";

export default function List() {
    // const history = useHistory();
    // const {dispatch}  = useContext(ListContext)
    const location = useLocation();
    const lis = location.list;
    const [list,setList] = useState(lis)

    const handleOhChange = (e)=>{
        const value = e.target.value;
        setList({...list,[e.target.name]:value})
    }

    const handleUpdate = (e)=>{
        e.preventDefault();
        alert("Update function not available");
    }
  return (
    <>
    <Topbar/>
    <div className="container">
      <Sidebar/>
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List title</label>
                  <input type="text" name="title"  onChange={handleOhChange} placeholder={lis.title} />
                  <label>Type</label>
                  <input type="text" name="type" onChange={handleOhChange} placeholder={lis.type} />
                  <label>Genre</label>
                  <input type="text" name="genre" onChange={handleOhChange} placeholder={lis.genre} />
                  
              </div>
              <div className="productFormRight">
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
    </div>
    </>
  );
}
