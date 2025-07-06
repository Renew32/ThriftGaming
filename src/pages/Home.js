// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { FaTools, FaTags, FaTruck } from 'react-icons/fa';
import './Home.css';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';

export default function Home() {
    // ---- 2 produits par marque (6 total) ----
    const recommended = ['PlayStation', 'Xbox', 'Nintendo']
        .flatMap((brand) =>
            products.filter((p) => p.brand === brand).slice(0, 3)
        );

    // ---- groupes de 3 pour le carrousel ----
    const slides = [];
    for (let i = 0; i < recommended.length; i += 3) {
        slides.push(recommended.slice(i, i + 3));
    }

    const cart = useCart();

    return (
        <>
            <section
                style={{
                    height: 220,
                    background: '#426E4E',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container>
                    <h2 className="display-6 fw-semibold text-white">
                        Du reconditionné à <em>prix caliente</em>, ça vous chauffe&nbsp;?
                    </h2>
                </Container>
            </section>

            <section className="how-it-works py-5">
                <Container>
                    <h3 className="comment-marche">COMMENT ÇA MARCHE?</h3>
                    <Row className="g-4">
                        {/* ÉTAPE 1 */}
                        <Col md={4} className="text-center">
                            <FaTools className="how-step-icon mb-3" size={60} />
                            <h5 className="how-step-title">1. Reconditionnement</h5>
                            <p className="how-step-desc">
                                <em>Nous</em> sélectionnons et reconditionnons des console
                                d’occasion, performant tests, nettoyage et réparations nécessaires.
                            </p>
                        </Col>

                        <Col md={4} className="text-center">
                            <FaTags className="how-step-icon mb-3" size={60} />
                            <h5 className="how-step-title">2. Prix avantageux</h5>
                            <p className="how-step-desc">
                                Grâce à notre partenaires, nous vous proposons des tarifs
                                inférieurs aux prix réguliers—sans impacter sur la qualité.
                            </p>
                        </Col>

                        {/* ÉTAPE 3 */}
                        <Col md={4} className="text-center">
                            <FaTruck className="how-step-icon mb-3" size={60} />
                            <h5 className="how-step-title">3. Livraison rapide</h5>
                            <p className="how-step-desc">
                                Une fois votre commande validée, nous expédions directement
                                la console <em>à vous</em>, en 24-72 heures
                                partout dans le monde.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="pb-5">
                <h5 className="recommender text-center mb-4">
                    RECOMMANDÉS POUR VOUS
                </h5>
                <Carousel indicators={false} className="recommend-carousel">
                    {slides.map((group, i) => (
                        <Carousel.Item key={i}>
                            <Row
                                xs={1}
                                sm={2}
                                md={5}
                                className="g-4 justify-content-center"
                            >
                                {group.map((prod) => (
                                    <Col key={prod.id}>
                                        <ProductCard
                                            product={prod}
                                            initialQty={cart.getQty(prod.id)}
                                            onAdd={cart.add}
                                            onChange={(item, q) => cart.setQty(item.id, q)}
                                            onRemove={(item) => cart.remove(item.id)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
            <footer className="footer-bar">
                ThriftGaming™ - Jorge Guetchom et Antoine Missoup Konga
            </footer>
        </>
    );
}
