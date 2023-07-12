import { Link,useLocation,useHistory  } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import storage from "../../firebs";
import { updateMovie } from "../../context/movieContext/movie_API_call";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Product() {
    const history = useHistory();
    const {dispatch}  = useContext(MovieContext)
    const location = useLocation();
    const movi = location.movie;
    const [movie,setMovie] = useState(movi)
    const [img,setImg] = useState(movi.img);
    const [imgTitle,setImgTitle] = useState(movi.imgTitle);
    const [imgSm,setImgSm] = useState(movi.imgSm);
    const [trailer,setTrailer] = useState(movi.trailer);
    const [video,setVideo] = useState(movi.video);
    const handleOhChange = (e)=>{
        const value = e.target.value;
        setMovie({...movie,[e.target.name]:value})
    }

    const upload = (items)=>{
        items.forEach(item => {
          const fileName = new Date().getTime()+item.label+item.file.name;
          const uploadTask = storage.ref(`/updateItems/${fileName}`).put(item.file);
          uploadTask.on("state_changed",snapshot=>{
            const progress = (snapshot.bytesTransferred /snapshot.totalBytes)*100;
            console.log("uploading is "+progress+"% done....");
          },(err)=>{console.log(err)},()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
              setMovie((prev)=>{
                return {...prev,[item.label]:url}
              });
            });
          });
        });
      }
      const handleUpload = (e)=>{
        e.preventDefault();
        upload([
          {file:img,label:"img"},
          {file:imgTitle,label:"imgTitle"},
          {file:imgSm,label:"imgSm"},
          {file:trailer,label:"trailer"},
          {file:video,label:"video"}
        ])
      }

    const handleUpdate = (e)=>{
        e.preventDefault();
        updateMovie(movi._id,movie,dispatch)
        history.goBack();
    }
  return (
    <>
    <Topbar/>
    <div className="container">
      <Sidebar/>
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movi.img} alt="" className="productInfoImg" />
                  <span className="productName">{movi.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movi._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movi.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movi.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movi.limit}</span>
                  </div>
                  
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Name</label>
                  <input type="text" name="title"  onChange={handleOhChange} placeholder={movi.title} />
                  <label>Movie Description</label>
                  <input type="text" name="desc" onChange={handleOhChange} placeholder={movi.desc} />
                  <label>Duration</label>
                  <input type="text" name="duration" onChange={handleOhChange} placeholder={movi.duration} />
                  <label>Year</label>
                  <input type="text" name="year" onChange={handleOhChange} placeholder={movi.year} />
                  <label>Genre</label>
                  <input type="text" name="genre" onChange={handleOhChange} placeholder={movi.genre} />
                  <label>Limit</label>
                  <input type="text" name="limit" onChange={handleOhChange} placeholder={movi.limit} />
                  <label>Is Series?</label>
                  <select name="isSeries" id="isSeries" onChange={handleOhChange} placeholder={movi.isSeries}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                  <label>Image</label>
                  <input type="file" name="img" onChange={(e)=>setImg(e.target.files[0])} />
                  <label>Title Image</label>
                  <input type="file" name="imgTitle" onChange={(e)=>setImgTitle(e.target.files[0])} />
                  <label>Thumbnail Image</label>
                  <input type="file" name="imgSm" onChange={(e)=>setImgSm(e.target.files[0])} />
                  <label>Trailer</label>
                  <input type="file" name="trailer" onChange={(e)=>setTrailer(e.target.files[0])} />
                  <label>Video</label>
                  <input type="file" name="video" onChange={(e)=>setVideo(e.target.files[0])} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movi.img} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleUpdate}>Update</button>
                  <button className="productButton" onClick={handleUpload}>Upload</button>
              </div>
          </form>
      </div>
    </div>
    </div>
    </>
  );
}
