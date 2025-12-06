import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const isAuth = localStorage.getItem("siga_auth") === "ok";
    const location = useLocation();

    if (!isAuth) {
        // si no está autenticado, lo mando a /login
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // si está autenticado, muestro el contenido protegido
    return children;
}