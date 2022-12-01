import classes from'./App.module.scss';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import LogOut from './views/LogOut/LogOut';

import {ProtectedRoutes} from './core/AuthRoleUser';
import Home from './views/Home/Home';

import Stores from './views/Stores/Stores';
import Store from './views/Stores/Store/Store';
import Product from './components/Stores/Product/Product';
import Category from './views/Stores/Category/Category';

import StoreV from './views/Store/Store';
import StoreProduct from './views/Store/StoreProduct';

import Profile from './views/Profile/Profile';
import Activity from './views/Profile/Activity/Activity';
import WishList from './views/Profile/WishList/WishList';
import Orders from './views/Profile/Orders/Orders';
import Configuration from './views/Profile/Configuration/Configuration';

import Cart from './views/Cart/Cart';

import Users from './views/Users/Users';
import User from './views/Users/User/User';

import NotFound404 from './views/NotFound404/NotFound404';



function App() {

  return (
    <div className={classes["App"]}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="Stores" element={<Stores/>}>
              <Route path="Store/:id/:Store" element={<Store/>}>
                <Route path="Product/:idProduct/:Name" element={<Product/>}/>
              </Route>
              <Route path="Category/:Category" element={<Category/>}/>
              <Route path="*" element={<NotFound404/>}/>
            </Route> 
            <Route element={<ProtectedRoutes/>}>
              <Route path="Profile" element={<Profile/>} key={Date.now()}>
                <Route path="Activity" element={<Activity/>} key={Date.now()}/>
                <Route path="WishList" element={<WishList/>} key={Date.now()}/>
                <Route path="Orders" element={<Orders/>} key={Date.now()}/>
                <Route path="Configuration" element={<Configuration/>} key={Date.now()}/>
              </Route>
              <Route path="Store" element={<StoreV/>}>
                <Route path="StoreProduct" element={<StoreProduct/>}/>
                <Route path="StoreProduct/:id" element={<StoreProduct/>}/>
              </Route>
              <Route path="Users" element={<Users/>}>
                <Route path="User" element={<User/>}/>
                <Route path="User/:id" element={<User/>}/>
              </Route>
            </Route>
            <Route path="Cart" element={<Cart/>}/>
            <Route path="*" element={<NotFound404/>} />
            <Route path="/LogOut" element={<LogOut />}/>
          </Route>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>          
        </Routes>
      </Router>
    </div>
  )
}

export default App