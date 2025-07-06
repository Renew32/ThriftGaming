// src/pages/Cart.jsx
import React from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import './Cart.css';


export default function Cart() {
    const { items, totalPrice, setQty, remove } = useCart();
    const navigate = useNavigate();

    const cartItems = Object.values(items);

    if (cartItems.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>Votre panier est vide</h2>
                <Button className="continue-btn" onClick={() => navigate('/')}>
                Continuer à magasiner
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2>Your Cart</h2>
            <Table responsive className="mt-4">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Price ($)</th>
                    <th>Qty</th>
                    <th>Total ($)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map(({ product, qty }) => (
                    <tr key={product.id}>
                        {/* IMAGE + NAME CELL */}
                        <td className="d-flex align-items-center">
                            <img
                                src={product.imgs[0]}
                                alt={product.name}
                                style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: 'cover',
                                    marginRight: 12,
                                    borderRadius: 4
                                }}
                            />
                            <span>{product.name}</span>
                        </td>

                        {/* PRICE CELL */}
                        <td>{product.price.toFixed(2)}</td>

                        {/* QUANTITY CONTROL */}
                        <td style={{ maxWidth: 80 }}>
                            <Form.Control
                                type="number"
                                min="1"
                                value={qty}
                                onChange={e =>
                                    setQty(product.id, Number(e.target.value))
                                }
                            />
                        </td>

                        {/* LINE TOTAL */}
                        <td>{(product.price * qty).toFixed(2)}</td>

                        {/* REMOVE BUTTON */}
                        <td>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => remove(product.id)}
                            >
                                Remove
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <Button className="checkout" onClick={() => navigate('/checkout')}>
                    Passer au paiement
                </Button>
            </div>
        </Container>
    );
}
