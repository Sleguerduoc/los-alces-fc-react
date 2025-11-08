// src/utils/auth.js
const FAKE_USER = { username: "admin", password: "1234" };
export async function login(u, p) {
    if (u === FAKE_USER.username && p === FAKE_USER.password) {
        const token = "fake_" + Date.now();
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify({ username: u }));
        return { ok: true, token };
    }
    return { ok: false, message: "Credenciales inválidas" };
}
export function logout(){ localStorage.removeItem("auth_token"); localStorage.removeItem("auth_user"); }
export function isLoggedIn(){ return !!localStorage.getItem("auth_token"); }
