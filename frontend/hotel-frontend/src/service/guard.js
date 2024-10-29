import React from "react";
import {Navigate, userLocation} from "react-router-dom";
import serviceAPI from "./serviceAPI";

export const ProtectedRoute = ({element : Component}) => {
    const location = useLocation();

    return serviceAPI.isAuthenticted() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{from : location}}/>
    );
};

export const AdminRoute = ({element : Component}) => {
    const location = useLocation();

    return serviceAPI.isAdmin() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{from : location}}/>
    );
};