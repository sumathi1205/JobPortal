import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "../src/Pages/Home"
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React,{useEffect} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import { useState } from "react";
import { auth } from "./firebase/firebase.config";

function App() {
  
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Navbar/>
      <Outlet/>
      
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
             
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" component={<Home/>} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
    
  );
};

export default App
