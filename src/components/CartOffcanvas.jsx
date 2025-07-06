import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import './CartOffcanvas.css';

export default function CartOffcanvas({ show, onHide }) {
  const itemsObj = useCart((s) => s.items);
  const list  = Object.values(itemsObj);
  const total = list.reduce((s, it) => s + it.qty * it.product.price, 0);

  return (
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Panier ({list.length} articles)</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <ListGroup variant="flush" className="mb-3">
            {list.map(({ product, qty }) => (
                <ListGroup.Item key={product.id} className="d-flex justify-content-between">
                  {product.name}
                  <span>{qty} × {product.price}$</span>
                </ListGroup.Item>
            ))}
          </ListGroup>

          <h5>Total&nbsp;: {total.toFixed(2)} $</h5>

          {/* Boutons côte à côte */}
          <div className="d-flex gap-2 mt-3">
            <Link to="/cart" className="panier flex-grow-1" onClick={onHide}>
              <Button className="w-100">
                Voir le panier
              </Button>
            </Link>

            <Link to="/payment" className=" paiement flex-grow-1" onClick={onHide}>
              <Button className="w-100">
                Paiement
              </Button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
  );
}