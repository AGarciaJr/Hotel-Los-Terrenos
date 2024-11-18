import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import serviceAPI from "./serviceAPI";

export const ProtectedRoute = ({element}) => {
    const location = useLocation();

    return serviceAPI.isAuthenticated() ? (
        element
    ) : (
        <Navigate to="/login" replace state={{from : location}}/>
    );
};

export const AdminRoute = ({element}) => {
    const location = useLocation();

    return serviceAPI.isAdmin() ? (
        element
    ) : (
        <Navigate to="/login" replace state={{from : location}}/>
    );
};