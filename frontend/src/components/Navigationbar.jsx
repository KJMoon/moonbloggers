import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import AuthButton from "../components/AuthButton";

function Navigationbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const closeOffcanvas = () => setShowOffcanvas(false);

  const navigateTo = (path) => {
    closeOffcanvas();
    // navigate to the path
    navigate(path);
  };

  if (isAuthenticated && !isLoading) {
    return (
      <Navbar fixed="top" bg="primary-subtle" expand="sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={() => navigateTo("/")}>
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
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-sm`}
            onClick={() => setShowOffcanvas((prev) => !prev)}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
            show={showOffcanvas}
            onHide={closeOffcanvas}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Moonbloggers
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={() => navigateTo("/")}>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={`/${user.nickname}`}
                  onClick={() => navigateTo(`/${user.nickname}`)}
                >
                  Profile
                </Nav.Link>
                <NavDropdown
                  title="Menu"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/create"
                    onClick={() => navigateTo("/create")}
                  >
                    Add Post
                  </NavDropdown.Item>
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
          <Navbar.Brand as={Link} to="/" onClick={() => navigate("/")}>
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
