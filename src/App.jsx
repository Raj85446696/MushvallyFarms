import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import OurBlog from './pages/OurBlog';
import OurProduct from './pages/OurProduct'; 
function App() {
  return (
    <>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/aboutus' Component={Aboutus}/>
      <Route path='/ourblog' Component={OurBlog}/>
      <Route path='/ourproduct' Component={OurProduct}/>
    </Routes>
    </>
  )
}

export default App