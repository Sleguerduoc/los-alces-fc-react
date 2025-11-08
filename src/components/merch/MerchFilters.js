import React from "react";

export default function MerchFilters({ query, setQuery, sort, setSort, onlyStock, setOnlyStock, cartCount }) {
    return (
        <div className="row g-2 mt-3">
        <div className="col-12 col-md-6">
            <input
            className="form-control"
            placeholder="Buscar producto…"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
        <div className="col-6 col-md-3">
            <select className="form-select" value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="relevant">Ordenar: Relevancia</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="name_asc">Nombre A–Z</option>
            <option value="name_desc">Nombre Z–A</option>
            </select>
        </div>
        <div className="col-6 col-md-3">
            <select className="form-select" value={onlyStock} onChange={(e)=>setOnlyStock(e.target.value)}>
            <option value="all">Mostrar: todo</option>
            <option value="stock">Solo en stock</option>
            </select>
        </div>

        {}
        <div className="col-12 d-flex justify-content-end">
            <button
            className="btn btn-outline-dark position-relative"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartDrawer"
            >
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && (
                <span className="cart-counter">{cartCount}</span>
            )}
            </button>
        </div>
        </div>
    );
}
