// src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({
                                        product,
                                        onAdd,
                                        onChange,
                                        onRemove,
                                        initialQty = 0,
                                    }) {
    const [qty, setQty] = useState(initialQty);
    const [showCtl, setShowCtl] = useState(false);   // true → barre −1+

    /* cache la barre après 3 s d’inactivité */
    useEffect(() => {
        if (!showCtl || qty === 0) return;
        const id = setTimeout(() => setShowCtl(false), 8000);
        return () => clearTimeout(id);
    }, [showCtl, qty]);

    /* handlers */
    const handleFirstAdd = () => {
        setQty(1);
        setShowCtl(false);
        onAdd?.(product);
        onChange?.(product, 1);
    };

    const inc = () => {
        const q = qty + 1;
        setQty(q);
        onChange?.(product, q);
    };

    const dec = () => {
        const q = qty - 1;
        if (q === 0) {
            onRemove?.(product);
        }
        setQty(q);
        onChange?.(product, q);
    };

    const img = product.imgs?.[0]?? (Array.isArray(product.img) ? product.img[0] : product.img)


    /* rendu */
    return (
        <Card className="prod-card h-100 d-flex flex-column">

            <Link to={`/${product.brand}/${product.id}`}>
                <div className="prod-img-wrapper ">
                    <Card.Img src={img} alt={product.title} />
                </div>
            </Link>


            <Card.Body className="d-flex flex-column">
                {/* --- ZONE ACTION --- */}
                {qty === 0 ? (

                    <button className="btn-add mb-3" onClick={handleFirstAdd}>
                        <PlusLg className="me-1" /> Ajouter
                    </button>

                ) : showCtl ? (
                    <div
                        className="qty-control mb-3"
                        onMouseLeave={() => setShowCtl(false)}
                    >
                        <button onClick={dec}>
                            <DashLg size={22} />
                        </button>
                        <span>{qty}</span>
                        <button onClick={inc}>
                            <PlusLg size={22} />
                        </button>
                    </div>
                ) : (
                    <div
                        className="qty-badge mb-3"
                        onClick={() => setShowCtl(true)}
                        onMouseEnter={() => setShowCtl(true)}
                    >
                        {qty}
                    </div>
                )}

                {/* infos prix + texte */}
                <Link to={`/${product.brand}/${product.id}`} className='text1 text-decoration-none bold'>
                    <h4 className="text1 mb-2">{product.price.toFixed(2)} $</h4>
                    <div className=" text-uppercase fw-semibold small text-muted mb-1">
                        {product.brand}
                    </div>
                    <Card.Text className="text1 small lh-sm">{product.name}</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    );
}