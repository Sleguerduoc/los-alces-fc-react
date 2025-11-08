import React from "react";

export default function CartDrawer({ cart, total, money, imageFor, onChangeQty, onRemove, onClear }) {

    return (
        <div className="offcanvas offcanvas-end offcanvas-cart" tabIndex="-1" id="cartDrawer">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title">Tu Carrito</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
            <ul className="list-group list-group-flush mb-3">
            {cart.map(i => (
                <li className="list-group-item d-flex align-items-center gap-2" key={i.id}>
                <img
                    src={imageFor(i.img)}
                    alt=""
                    width="42" height="42"
                    style={{objectFit:"cover", borderRadius:".5rem"}}
                />
                <div className="flex-fill">
                    <div className="fw-semibold">{i.name}</div>
                    <small>{money(i.price)} c/u</small>
                </div>
                <div className="btn-group" role="group" aria-label="cantidad">
                    <button className="btn btn-outline-secondary btn-sm" onClick={()=>onChangeQty(i.id,-1)}>–</button>
                    <button className="btn btn-outline-secondary btn-sm" disabled>{i.qty}</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={()=>onChangeQty(i.id, 1)}>+</button>
                </div>
                <button className="btn btn-outline-danger btn-sm ms-2" onClick={()=>onRemove(i.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                </li>
            ))}
            {cart.length === 0 && (
                <li className="list-group-item text-center text-muted">Tu carrito está vacío</li>
            )}
            </ul>

            <div className="mt-auto">
            <div className="d-flex justify-content-between mb-2">
                <strong>Total</strong>
                <strong>{money(total)}</strong>
            </div>
            <button className="btn btn-success w-100" disabled>Continuar al pago</button>
            <button className="btn btn-outline-secondary w-100 mt-2" onClick={onClear}>Vaciar carrito</button>
            </div>
        </div>
        </div>
    );
}
