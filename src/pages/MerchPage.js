import React, { useEffect, useMemo, useState } from "react";
import PRODUCTS, { imageFor } from "../data/products";
import MerchFilters from "../components/merch/MerchFilters";
import ProductGrid from "../components/merch/ProductGrid";
import CartDrawer from "../components/merch/CartDrawer";

const money = (clp) => clp.toLocaleString("es-CL", { style:"currency", currency:"CLP" });

export default function MerchPage() {

  // Filtros
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all"); 
    const [onlyStock, setOnlyStock] = useState("all"); 
    const [sort, setSort] = useState("relevant");     
  // Carrito
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem("merch_cart")) || []; } catch { return []; }
    });
    useEffect(() => {
    localStorage.setItem("merch_cart", JSON.stringify(cart));
    }, [cart]);

  // Lista filtrada/ordenada
    const list = useMemo(() => {
    const txt = query.trim().toLowerCase();
    return PRODUCTS
        .filter(p => category === "all" || p.category === category)
        .filter(p => onlyStock === "all" ? true : p.stock > 0)
        .filter(p => {
            if (!txt) return true;
            const haystack = [p.name, p.category, ...(p.tags||[])].join(" ").toLowerCase();
            return haystack.includes(txt);
        })
        .sort((a,b) => {
        switch (sort) {
            case "price_asc":  return a.price - b.price;
            case "price_desc": return b.price - a.price;
            case "name_asc":   return a.name.localeCompare(b.name);
            case "name_desc":  return b.name.localeCompare(a.name);
            default:           return 0;
            }
        });
    }, [query, category, onlyStock, sort]);

  // Carrito: agregar / cambiar / quitar
    const addToCart = (id) => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return;
        setCart(prev => {
        const exists = prev.find(i => i.id === id);
        if (exists) {
            if (exists.qty < p.stock) exists.qty += 1;
            return [...prev];
        }
        return [{ id:p.id, name:p.name, price:p.price, qty:1, img:p.img }, ...prev];
        });
    };
    const changeQty = (id, delta) => {
        setCart(prev => prev.map(i => i.id===id ? {...i, qty: Math.max(1, i.qty+delta)} : i));
    };
    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
    const clearCart = () => setCart([]);

    const total = useMemo(() => cart.reduce((acc,i)=>acc + i.price*i.qty, 0), [cart]);
    const count = useMemo(() => cart.reduce((acc,i)=>acc + i.qty, 0), [cart]);

    return (
        <>
        {}
        <div className="merch-hero mb-3">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
                <h2 className="m-0">Tienda Oficial</h2>
                <small>Apoya al club con productos oficiales Los Alces F.C.</small>
            </div>

            {}
            <div className="d-flex flex-wrap gap-2">
                {["all","Camisetas","Accesorios","Hogar"].map(val => (
                <button
                    key={val}
                    className={`btn btn-sm filter-chip ${category===val ? "active":""}`}
                    onClick={()=>setCategory(val)}
                >
                    {val==="all" ? "Todo" : val}
                </button>
                ))}
            </div>
            </div>

            {}
            <MerchFilters
            query={query} setQuery={setQuery}
            sort={sort} setSort={setSort}
            onlyStock={onlyStock} setOnlyStock={setOnlyStock}
            cartCount={count}
            />
        </div>

        {}
        <ProductGrid
            products={list}
            onAdd={addToCart}
            money={money}
            imageFor={imageFor}
        />

        {}
        <div className="card mt-3">
            <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
                <h5 className="m-0">Despacho a todo Chile</h5>
                <small>3–5 días hábiles. Retiro en Coronel sin costo.</small>
            </div>
            <button className="btn btn-primary" disabled title="Compra desde el carrito">Proceder al pago</button>
            </div>
        </div>

        {}
        <CartDrawer
            cart={cart}
            total={total}
            money={money}
            imageFor={imageFor}
            onChangeQty={changeQty}
            onRemove={removeFromCart}
            onClear={clearCart}
        />
        </>
    );
}
