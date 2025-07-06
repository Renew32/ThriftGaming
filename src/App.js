// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavbar   from './components/Navbar';
import Home         from './pages/Home';
import Category     from './pages/Category';
import ProductPage  from './ProductPage';
import Cart         from './pages/Cart';
import Checkout     from './pages/Checkout';
import Payment      from './pages/Payment';
import Completion      from './pages/Completion';


export default function App() {
    return (
        <BrowserRouter>
            <MainNavbar />
            <Routes>
                <Route path="/"               element={<Home />} />
                <Route path="/cart"           element={<Cart />} />
                <Route path="/checkout"       element={<Checkout />} />
                <Route path="/payment"        element={<Payment />} />
                <Route path="/:brand"         element={<Category />} />
                <Route path="/:brand/:id"     element={<ProductPage />} />
                <Route path="/completion"     element={<Completion />} />

            </Routes>
        </BrowserRouter>
    );
}
