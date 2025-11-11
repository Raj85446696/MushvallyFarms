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
import MyOrder from './pages/MyOrder';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import ListOrder from './pages/ListOrder';
import Unauthorized from './pages/Unauthorized';
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

        {/* ✅ User routes */}
        <Route path="/ourproduct" element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <OurProduct />
            </ProtectedRoute>
          }
        />

        <Route path="/myorder" element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MyOrder />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin routes */}
        <Route path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/addproduct"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListProduct />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListOrder />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      
    </>
  )
}

export default App