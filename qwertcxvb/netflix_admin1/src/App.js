// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      <Switch>
        <>
        <Route exact path="/login">
        {user?<Redirect to="/"/>:<Login />}
      </Route>
          <Route exact path="/">
            {!user?<Redirect to="/login"/>:<Home />}
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <ProductList />
          </Route>
          <Route path="/lists">
            <ListList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/list/:listId">
            <List />
          </Route>
          <Route path="/newList">
            <NewList />
          </Route>
        </>
      </Switch>
    </Router>
  );
}

export default App;
