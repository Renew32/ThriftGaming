// src/components/Navbar.jsx
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import CartOffcanvas from './CartOffcanvas';
import { useState } from 'react';
import useCart from '../hooks/useCart';

export default function MainNavbar() {
  const { totalQty } = useCart();
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="white" expand="lg" className="border-bottom sticky-top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className='title'>ThriftGaming</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto gap-4 fw-semibold">
              <LinkContainer to="/playstation"><Nav.Link>PLAYSTATION</Nav.Link></LinkContainer>
              <LinkContainer to="/xbox"><Nav.Link>XBOX</Nav.Link></LinkContainer>
              <LinkContainer to="/nintendo"><Nav.Link>NINTENDO</Nav.Link></LinkContainer>
            </Nav>

            <Nav.Link onClick={() => setShow(true)} className="position-relative">
              <Cart size={22} />
              {totalQty > 0 && (
                <Badge pill bg="dark" className="position-absolute top-0 start-100 translate-middle">
                  {totalQty}
                </Badge>
              )}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartOffcanvas show={show} onHide={() => setShow(false)} />
    </>
  );
}