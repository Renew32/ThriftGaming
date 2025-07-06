import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('Canada');
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (!fullName || !email || !address || !city || !postalCode) {
            return alert('Remplissez toutes les informations');
        }
        // TODO: send data to backend or context
        navigate('/payment');
    };

    return (
        <Container className="py-5" >
            <h2>Livraison et Contact</h2>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Georgina Grande"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Addresse Courriel</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="vous@example.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Addresse</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="45 Mann Ave"
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Ville</Form.Label>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Pays</Form.Label>
                        <Form.Select
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option>Canada</option>
                            <option>United States</option>
                            <option>France</option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control
                            type="text"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </Col>
                </Row>

                <Button className="continue-btn" variant="primary" type="submit">
                    Continuer au paiement
                </Button>
            </Form>
        </Container>
    );
}
