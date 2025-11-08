// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Importa todas tus páginas
import DashboardHome from "./pages/DashboardHome";
import FinancePage from "./pages/FinancePage";
import Login from "./pages/Login";
import MerchPage from "./pages/MerchPage";
import PlayersPage from "./pages/PlayersPage";
import PlayerNew from "./pages/PlayerNew";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import SociosPage from "./pages/SociosPage";
import SocioNew from "./pages/SocioNew";
import StaffPage from "./pages/StaffPage";
import StaffNew from "./pages/StaffNew";
import StatsPage from "./pages/StatsPage";

// --- Configuración base ---
beforeAll(() => {
  // Evita errores de Chart.js o ResizeObserver
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    value: jest.fn(() => ({})),
  });
});

const renderWithRouter = (ui) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

// --- 2 tests simples por página ---

// LOGIN
test("Login renderiza sin fallar", () => {
  renderWithRouter(<Login />);
  expect(screen.getByRole("button", { name: /iniciar sesión|entrar/i })).toBeInTheDocument();
});
test("Login muestra título del sistema", () => {
  renderWithRouter(<Login />);
  expect(screen.getByText(/los alces|siga/i)).toBeInTheDocument();
});

// DASHBOARD
test("Dashboard se renderiza sin errores", () => {
  renderWithRouter(<DashboardHome />);
  expect(true).toBe(true); // smoke
});


// FINANZAS
test("FinancePage se renderiza sin fallar", () => {
  renderWithRouter(<FinancePage />);
  expect(true).toBe(true);
});
test("FinancePage muestra 'Transferencia' o 'Finanzas'", () => {
  renderWithRouter(<FinancePage />);
  expect(screen.getByText(/transferencia|finanzas/i)).toBeInTheDocument();
});

// MERCH

test("MerchPage tiene botón 'Agregar' o similar", () => {
  renderWithRouter(<MerchPage />);
  expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
});

// JUGADORES
test("PlayersPage se renderiza sin errores", () => {
  renderWithRouter(<PlayersPage />);
  expect(true).toBe(true);
});
test("PlayersPage muestra 'Jugadores' o 'Plantel'", () => {
  renderWithRouter(<PlayersPage />);
  expect(screen.getByText(/jugadores|plantel/i)).toBeInTheDocument();
});

// NUEVO JUGADOR
test("PlayerNew renderiza formulario", () => {
  renderWithRouter(<PlayerNew />);
  expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
});
test("PlayerNew muestra botón 'Guardar' o 'Registrar'", () => {
  renderWithRouter(<PlayerNew />);
  expect(screen.getByRole("button", { name: /guardar|registrar/i })).toBeInTheDocument();
});

// PERFIL
test("ProfilePage renderiza sin fallar", () => {
  renderWithRouter(<ProfilePage />);
  expect(true).toBe(true);
});
test("ProfilePage muestra 'Perfil' o 'Usuario'", () => {
  renderWithRouter(<ProfilePage />);
  expect(screen.getByText(/perfil|usuario/i)).toBeInTheDocument();
});

// REPORTES
test("ReportsPage se renderiza correctamente", () => {
  renderWithRouter(<ReportsPage />);
  expect(true).toBe(true);
});


// CONFIGURACIÓN
test("SettingsPage se renderiza correctamente", () => {
  renderWithRouter(<SettingsPage />);
  expect(true).toBe(true);
});


// SOCIOS
test("SociosPage renderiza sin fallar", () => {
  renderWithRouter(<SociosPage />);
  expect(true).toBe(true);
});


// NUEVO SOCIO
test("SocioNew muestra formulario", () => {
  renderWithRouter(<SocioNew />);
  expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
});


// STAFF
test("StaffPage se renderiza sin errores", () => {
  renderWithRouter(<StaffPage />);
  expect(true).toBe(true);
});
test("StaffPage muestra 'Equipo Técnico' o 'Staff'", () => {
  renderWithRouter(<StaffPage />);
  expect(screen.getByText(/staff|técnico|equipo/i)).toBeInTheDocument();
});

// NUEVO STAFF
test("StaffNew muestra formulario", () => {
  renderWithRouter(<StaffNew />);
  expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
});
test("StaffNew tiene botón 'Guardar' o 'Registrar'", () => {
  renderWithRouter(<StaffNew />);
  expect(screen.getByRole("button", { name: /guardar|registrar/i })).toBeInTheDocument();
});



