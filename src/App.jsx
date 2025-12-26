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
import PublicRoute from './components/PublicRoute';
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
        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        <Route path="/aboutus" element={
          <PublicRoute>
            <Aboutus />
          </PublicRoute>
        } />

        <Route path="/ourblog" element={
          <PublicRoute>
            <OurBlog />
          </PublicRoute>
        } />


        {/* ✅ User routes */}
        <Route path="/ourproduct" element={
          <PublicRoute>
            <OurProduct />
          </PublicRoute>
        }
        />

        <Route path="/myorder" element={
          <ProtectedRoute allowedRoles={["user"]}>
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