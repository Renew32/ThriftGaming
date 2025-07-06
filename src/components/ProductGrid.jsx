import useCart from '../hooks/useCart';
import ProductCard from './ProductCard';
import { Row, Col } from 'react-bootstrap';

export default function ProductGrid({ products }) {
  const cart = useCart();          // ← accès store

  return (
      <Row xs={2} sm={3} md={3} lg={4} className="g-4">
        {products.map((p) => (
            <Col key={p.id}>
              <ProductCard
                  product={p}
                  initialQty={cart.getQty(p.id)}
                  onAdd={cart.add}
                  onChange={(item, q) => cart.setQty(item.id, q)}
                  onRemove={(item) => cart.remove(item.id)}
              />
            </Col>
        ))}
      </Row>
  );
}