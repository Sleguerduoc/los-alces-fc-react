
import React, { useEffect, useMemo, useState } from "react";
import { imageFor } from "../data/products";
import MerchFilters from "../components/merch/MerchFilters";
import ProductGrid from "../components/merch/ProductGrid";
import CartDrawer from "../components/merch/CartDrawer";
import { getProductosMerch } from "../services/merchService";

const money = (clp) =>
    clp.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

    export default function MerchPage() {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filtros
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [onlyStock, setOnlyStock] = useState("all");
    const [sort, setSort] = useState("relevant");

    // Carrito (en localStorage)
    const [cart, setCart] = useState(() => {
        try {
        return JSON.parse(localStorage.getItem("merch_cart")) || [];
        } catch {
        return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("merch_cart", JSON.stringify(cart));
    }, [cart]);

  // Cargar productos desde la API al montar el componente
    useEffect(() => {
        let isMounted = true;

        const cargar = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProductosMerch();
            if (isMounted) {
            setProducts(data);
            }
        } catch (e) {
            console.error(e);
            if (isMounted) {
            setError(e.message || "Error al cargar productos");
            }
        } finally {
            if (isMounted) {
            setLoading(false);
            }
        }
        };

        cargar();

        return () => {
        isMounted = false;
        };
    }, []);

    // Lista filtrada/ordenada
    const list = useMemo(() => {
        const txt = query.trim().toLowerCase();

        return products
        .filter((p) => (category === "all" ? true : p.category === category))
        .filter((p) => (onlyStock === "all" ? true : p.stock > 0))
        .filter((p) => {
            if (!txt) return true;
            const haystack = [p.name, p.category, ...(p.tags || [])]
            .join(" ")
            .toLowerCase();
            return haystack.includes(txt);
        })
        .sort((a, b) => {
            switch (sort) {
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            case "name_asc":
                return a.name.localeCompare(b.name);
            case "name_desc":
                return b.name.localeCompare(a.name);
            default:
                return 0; // relevancia (por ahora, sin cambio)
            }
        });
    }, [products, query, category, onlyStock, sort]);

    // Carrito: agregar / cambiar / quitar
    const addToCart = (id) => {
        const p = products.find((x) => x.id === id);
        if (!p) return;

        setCart((prev) => {
        const exists = prev.find((i) => i.id === id);
        if (exists) {
            // Respetar stock máximo
            if (exists.qty < p.stock) {
            return prev.map((i) =>
                i.id === id ? { ...i, qty: i.qty + 1 } : i
            );
            }
            return prev;
        }
        return [
            {
            id: p.id,
            name: p.name,
            price: p.price,
            qty: 1,
            img: p.img,
            },
            ...prev,
        ];
        });
    };

    const changeQty = (id, delta) => {
        setCart((prev) =>
        prev.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        );
    };

    const removeFromCart = (id) =>
        setCart((prev) => prev.filter((i) => i.id !== id));

    const clearCart = () => setCart([]);

    const total = useMemo(
        () => cart.reduce((acc, i) => acc + i.price * i.qty, 0),
        [cart]
    );
    const count = useMemo(
        () => cart.reduce((acc, i) => acc + i.qty, 0),
        [cart]
    );

    return (
        <>
        {/* Hero y filtros */}
        <div className="merch-hero mb-3">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
                <h2 className="m-0">Tienda Oficial</h2>
                <small>Apoya al club con productos oficiales Los Alces F.C.</small>
            </div>

            {/* Chips de categoría */}
            <div className="d-flex flex-wrap gap-2">
                {["all", "Camisetas", "Accesorios", "Hogar"].map((val) => (
                <button
                    key={val}
                    className={`btn btn-sm filter-chip ${
                    category === val ? "active" : ""
                    }`}
                    onClick={() => setCategory(val)}
                >
                    {val === "all" ? "Todo" : val}
                </button>
                ))}
            </div>
            </div>

            {/* Filtros y botón carrito */}
            <MerchFilters
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
            onlyStock={onlyStock}
            setOnlyStock={setOnlyStock}
            cartCount={count}
            />
        </div>

        {/* Contenido principal: estado de carga, error o grilla */}
        {loading && (
            <div className="text-center py-5">
            <div className="spinner-border" role="status" />
            <p className="mt-2 mb-0">Cargando productos…</p>
            </div>
        )}

        {!loading && error && (
            <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && (
            <ProductGrid
            products={list}
            onAdd={addToCart}
            money={money}
            imageFor={imageFor}
            />
        )}

        {/* Info de despacho */}
        <div className="card mt-3">
            <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
                <h5 className="m-0">Despacho a todo Chile</h5>
                <small>3–5 días hábiles. Retiro en Coronel sin costo.</small>
            </div>
            <button
                className="btn btn-primary"
                disabled
                title="Compra desde el carrito"
            >
                Proceder al pago
            </button>
            </div>
        </div>

        {/* Drawer del carrito */}
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
