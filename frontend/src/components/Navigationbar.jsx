import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import AuthButton from "../components/AuthButton";

function Navigationbar() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Navbar fixed="top" bg="light" expand="sm">
        <Container fluid>
          <Navbar.Brand href="http://localhost:3000/">
            Moonbloggers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Moonbloggers
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
                <Nav.Link href="http://localhost:3000/">Profile</Nav.Link>
                <NavDropdown
                  title="Menu"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="http://localhost:3000/">
                    Add Post
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <AuthButton />
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="http://localhost:3000/">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="rounded-pill" variant="outline-dark">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar fixed="top" bg="light" expand="sm">
        <Container fluid>
          <Navbar.Brand href="http://localhost:3000/">
            Moonbloggers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Moonbloggers
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <AuthButton />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}

export default Navigationbar;