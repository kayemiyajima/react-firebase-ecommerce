import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useAdminAuth from './context/AdminContext'

const AdminRoute = ({ component: Component, ...rest }) => {
    const isAdmin = useAdminAuth();
    console.log(isAdmin);

    return (
        <Route
            {...rest}
            render={props => {
                return isAdmin ? <Component {...props} /> : <Redirect to='login' />
            }}
        >
        </Route>
    )
};

export default AdminRoute;