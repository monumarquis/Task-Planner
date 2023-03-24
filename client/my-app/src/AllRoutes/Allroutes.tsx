import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Privateroutes from '../components/PrivateRoutes'
import Auth from '../pages/Auth'
import Dashboard from '../pages/Dashboard'


const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Auth />}></Route>
            <Route path='/dashboard' element={<Privateroutes><Dashboard /></Privateroutes>}></Route>
        </Routes>
    )
}

export default AllRoutes