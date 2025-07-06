import React from 'react';
import {
  Container, Row, Col, Breadcrumb,
  Carousel, Image, Button, Card,
  ListGroup, Badge
} from 'react-bootstrap';
import { CartFill, Truck, ShieldCheck } from 'react-bootstrap-icons';
import { useParams, Link } from 'react-router-dom';
import products from './data/products.json';
import useCart from './hooks/useCart';
import './ProductPage.css';



export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const cart    = useCart();
  const qty     = cart.getQty(id);

  if (!product) return (
      <Container className="py-5">
        <h3>Produit introuvable</h3>
        <Link to="/">← Retour à l’accueil</Link>
      </Container>
  );

  /* fallback images */
  const images = product.imgs?.length ? product.imgs : [product.img];

  return (
      <Container className="py-4">
        {/* --------- Fil d’Ariane --------- */}
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Accueil
          </Breadcrumb.Item>
          <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: `/${product.brand.toLowerCase()}` }}
          >
            {product.brand}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="g-4">
          {/* -------- Galerie -------- */}
          <Col md={6}>
            <Carousel variant="dark">
              {images.map((src, i) => (
                  <Carousel.Item key={i}>
                    <Image
                        fluid
                        src={src}
                        alt={product.name}
                        style={{ maxHeight: 400, objectFit: 'contain' }}
                    />
                  </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* -------- Infos + Achat -------- */}
          <Col md={6}>
            <h2 className="mb-3">{product.name}</h2>
            <h3 className="fw-bold">{product.price.toFixed(2)} $</h3>

            {product.rating && (
                <p className="text-muted mb-1">
                  ★ {product.rating.toFixed(1)} ({product.reviews} avis)
                </p>
            )}

            {product.highlights?.length > 0 && (
                <ListGroup variant="flush" className="mb-3">
                  {product.highlights.map((h) => (
                      <ListGroup.Item
                          key={h}
                          className="d-flex justify-content-between border-0 ps-0"
                      >
                        •&nbsp;{h}
                      </ListGroup.Item>
                  ))}
                </ListGroup>
            )}

            {/* ----- Bouton ou contrôle qty ----- */}
            {qty === 0 ? (
                <Button
                    variant="dark"
                    size="lg"
                    className="btn-add w-100"
                    onClick={() => cart.add(product)}
                >
                  <CartFill className="me-2" />
                  Ajouter au panier
                </Button>
            ) : (
                <div className="d-flex align-items-center gap-3 mb-3">

                  <button
                      type="button"
                      className="btn-qty minus"
                      onClick={() => cart.setQty(id, qty - 1)}
                  >
                    –
                  </button>

                  <h4 className="m-0">{qty}</h4>

                  <button
                      type="button"
                      className="btn-qty plus"
                      onClick={() => cart.setQty(id, qty + 1)}
                  >
                    +
                  </button>
                </div>
            )}

            {/* Livraison / garantie */}
            <Card className="mt-3 li">
              <Card.Body>
                <Card.Text className="d-flex align-items-center gap-2 mb-2">
                  <Truck /> Livraison standard gratuite{' '}
                  <Badge bg="success">24&nbsp;h</Badge>
                </Card.Text>
                <Card.Text className="d-flex align-items-center gap-2 mb-0">
                  <ShieldCheck /> Garantie 12&nbsp;mois inclue
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* -------- Description -------- */}
        {product.description && (
            <Row className="mt-5">
              <Col md={8}>
                <h4>Description</h4>
                <p>{product.description}</p>
                {product.about?.length > 0 && (
                    <ListGroup variant="flush">
                      {product.about.map((pt) => (
                          <ListGroup.Item
                              key={pt}
                              className="border-0 ps-0"
                          >
                            •&nbsp;{pt}
                          </ListGroup.Item>
                      ))}
                    </ListGroup>
                )}
              </Col>
            </Row>
        )}
      </Container>
  );
}