import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import OurBlog from './pages/OurBlog';
import OurProduct from './pages/OurProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/ourblog" element={<OurBlog />} />

        {/* ✅ Protected Route */}
        <Route
          path="/ourproduct"
          element={
            <ProtectedRoute>
              <OurProduct />
            </ProtectedRoute>
          }
        />
      </Routes>

    </>
  )
}

export default App