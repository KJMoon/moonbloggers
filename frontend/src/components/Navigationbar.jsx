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
  Image,
} from "react-bootstrap";
import AuthButton from "../components/AuthButton";

function Navigationbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated && !isLoading) {
    return (
      <Navbar fixed="top" bg="primary-subtle" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src="https://pic.onlinewebfonts.com/svg/img_7362.png"
              alt="logo"
              style={{
                width: "40px",
                objectFit: "contain",
              }}
              fluid
            />
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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href={`/${user.nickname}`}>Profile</Nav.Link>
                <NavDropdown
                  title="Menu"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="/create">Add Post</NavDropdown.Item>
                  <NavDropdown.Item>
                    <AuthButton />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="rounded-pill" variant="outline-dark">
                  Search
                </Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar fixed="top" bg="primary-subtle" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src="https://pic.onlinewebfonts.com/svg/img_7362.png"
              alt="logo"
              style={{
                width: "40px",
                objectFit: "contain",
              }}
              fluid
            />
            Moonbloggers
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Navigationbar;
