
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext(null);

const STORAGE_KEY = "siga_auth_user";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
        } catch {
        return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  // Mantener en localStorage
    useEffect(() => {
        if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
        localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    const login = async (email, password) => {
        setLoading(true);
        setError("");
        try {
        const u = await loginRequest(email, password);
        setUser(u);
        return u;
        } catch (e) {
        setError(e.message || "Error al iniciar sesión");
        throw e;
        } finally {
        setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }

    export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return ctx;
    }
