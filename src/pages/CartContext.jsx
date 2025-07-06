import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.map(p =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(prev =>
            prev
                .map(p => (p.id === id ? { ...p, quantity } : p))
                .filter(p => p.quantity > 0)
        );
    };

    const removeFromCart = (id) =>
        setCartItems(prev => prev.filter(p => p.id !== id));

    const clearCart = () => setCartItems([]);

    const totalPrice = cartItems.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// convenience hook
export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
};
