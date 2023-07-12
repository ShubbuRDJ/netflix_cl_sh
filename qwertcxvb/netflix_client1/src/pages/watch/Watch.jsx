import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const movie = location.state
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        setin="true"
        src={movie.video}
      />
    </div>
  );
}