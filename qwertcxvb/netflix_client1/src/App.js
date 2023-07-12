import './app.scss'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/Home/Home'
import Watch from './pages/watch/Watch';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from './context/authContext/AuthContext'

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user?<Home />:<Navigate to="/register" replace={true} />} />
        <Route exact path="/register" element={!user?<Register />:<Navigate to="/" replace={true} />} />
        <Route exact path="/login" element={!user?<Login />:<Navigate to="/" replace={true} />} />
        {user && (
          <>
          <Route exact path="/movies" element={<Home type="movies" />} />
          <Route exact path="/series" element={<Home type="series" />} />
          <Route exact path="/watch" element={<Watch />} /></>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
