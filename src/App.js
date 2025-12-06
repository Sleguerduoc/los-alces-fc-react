import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import PlayersPage from "./pages/PlayersPage";
import PlayerNew from "./pages/PlayerNew";
import StaffPage from "./pages/StaffPage.js";
import StaffNew from "./pages/StaffNew";
import StatsPage from "./pages/StatsPage";
import FinancePage from "./pages/FinancePage";
import SociosPage from "./pages/SociosPage";
import SocioNew from "./pages/SocioNew";
import ReportsPage from "./pages/ReportsPage";
import MerchPage from "./pages/MerchPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("siga_auth") === "ok";
  return isLogged ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Login público en "/" */}
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/jugadores"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <PlayersPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/jugadores/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <PlayerNew />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/equipo-tecnico"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <StaffPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/equipo-tecnico/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <StaffNew />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/estadisticas"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <StatsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/finanzas"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <FinancePage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/socios"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <SociosPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/socios/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <SocioNew />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/reportes"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ReportsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/merch"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MerchPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/configuracion"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Cualquier ruta desconocida redirige al login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
