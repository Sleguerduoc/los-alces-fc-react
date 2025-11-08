import React from "react";

export default function ProductCard({ data, onAdd, money, imageFor }) {
    const discount = data.oldPrice ? Math.round(100 - (data.price*100/data.oldPrice)) : 0;
    const disabled = data.stock <= 0;
    const badge = data.stock <= 0
        ? <span className="badge bg-secondary">Sin stock</span>
        : data.oldPrice
        ? <span className="badge bg-success">-{discount}%</span>
        : null;

    const oldP = data.oldPrice ? <span className="old-price">{money(data.oldPrice)}</span> : null;
    const src = imageFor(data.img);

    return (
        <>
        <div className="position-relative product-card">
            {badge}
            <button className="fav-btn" title="Agregar a favoritos" type="button">
            <i className="fa-regular fa-heart"></i>
            </button>
            <img src={src} alt={data.name} style={{width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:".75rem"}} />
        </div>
        <div className="pt-2">
            <div className="small text-muted">{data.category}</div>
            <div className="fw-semibold">{data.name}</div>
            <div className="price">{money(data.price)} {oldP}</div>
            <button className="btn btn-primary w-100 mt-2" onClick={onAdd} disabled={disabled}>
            <i className="fa-solid fa-cart-plus me-1"></i>Agregar
            </button>
        </div>
        </>
    );
}
