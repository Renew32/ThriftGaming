// src/pages/Completion.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Completion.css';

export default function Completion() {
    const [consoleChoice, setConsoleChoice] = useState('');
    const [rating, setRating]             = useState(0);
    const [submitted, setSubmitted]       = useState(false);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleRating = value => setRating(value);

    return (
        <Container className="py-5 text-center">
            {!submitted ? (
                <>
                    <h2 className="mb-4">Paiement Accepté&nbsp;!</h2>
                    <p style={{ marginBottom: '2rem' }}>
                    Merci pour votre achat!
                    </p>
                    <Form onSubmit={handleSubmit}>
                        {/* Console request */}
                        <Form.Group controlId="consoleRequest" className="mb-4">
                            <Form.Label>
                                Quelle(s) console(s) souhaitez-vous que nous ajoutions à notre collection&nbsp;?
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex : GameCube, PlayStation Vita, Retro Playstation 1"
                                value={consoleChoice}
                                onChange={e => setConsoleChoice(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Star rating */}
                        <div className="rating-section mb-4">
                            <Form.Label>Notez notre service&nbsp;:</Form.Label>
                            <div className="stars mt-2">
                                {[1,2,3,4,5].map(value => (
                                    <FaStar
                                        key={value}
                                        size={32}
                                        className="star"
                                        color={value <= rating ? '#ffc107' : '#e4e5e9'}
                                        onClick={() => handleRating(value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <Button  className="retroaction-btn" variant="primary" type="submit" >
                            Envoyer la rétroaction
                        </Button>
                    </Form>
                </>
            ) : (
                <>
                    <h2 className="mb-4">Merci&nbsp;!</h2>
                    <p>
                        Bien reçu nous serons à la recherche de : <strong>{consoleChoice}</strong>!
                    </p>
                    <p>
                        Merci pour votre note : <strong>{rating} / 5</strong>
                    </p>
                    <Button variant="success" onClick={() => navigate('/')}>
                        Retour à l'accueil
                    </Button>
                </>
            )}
        </Container>
    );
}
