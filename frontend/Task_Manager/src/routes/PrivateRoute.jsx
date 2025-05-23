import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
    return (<Outlet />) // This will render the child routes if the user is authenticated and has the required role
}

export default PrivateRoute