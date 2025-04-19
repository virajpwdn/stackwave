import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Signup from '../ui/Auth/Signup'
import Login from '../ui/Auth/Login'
import Authentication from './Authentication';
import Tour from '../ui/Tour/Tour';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/tour' element={<Tour />} />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
        </Routes>
    </Router>
  )
}

export default AppRoutes