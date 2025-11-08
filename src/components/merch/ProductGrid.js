import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd, money, imageFor }) {
    if (!products.length) {
        return <div className="alert alert-warning">No encontramos productos para tu búsqueda.</div>;
    }
    return (
        <div className="row g-3">
        {products.map(p => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard data={p} onAdd={()=>onAdd(p.id)} money={money} imageFor={imageFor}/>
            </div>
        ))}
        </div>
    );
}
