import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Feed from "./Feed";

function Home() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated && !isLoading) {
    return (
      <>
        <h2 className="text-center">Home</h2>
        <Feed />
      </>
    );
  } else if (!isAuthenticated && !isLoading) {
    return (
      <>
        <Container className="d-none d-sm-block" fluid>
          <Row className="d-flex justify-content-center align-items-center bg-dark text-white vh-100">
            <Col
              sm={6}
              className="d-flex flex-column justify-content-center align-items-center p-5"
              style={{ height: "500px" }}
            >
              <Image
                src="https://pic.onlinewebfonts.com/svg/img_7362.png"
                alt="logo"
                style={{
                  width: "250px",
                  objectFit: "contain",
                  filter:
                    "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
                }}
                fluid
              />
            </Col>
            <Col
              sm={6}
              className="d-flex flex-column justify-content-center align-items-start p-5"
              style={{ height: "500px" }}
            >
              <h1 className="mb-0">Welcome to Moonbloggers!</h1>
              <p className="mb-0 mt-3">
                A community that Moonblogs together, stays together
              </p>
              <Button
                className="rounded-pill mt-3"
                variant="outline-light"
                onClick={() => loginWithRedirect()}
              >
                Log In To Begin
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className="d-sm-none" fluid>
          <Row className="d-flex justify-content-center align-items-center bg-dark text-white vh-100">
            <Col
              sm
              className="d-flex flex-column justify-content-start align-items-center p-2"
              style={{ minWidth: "280px" }}
            >
              <h1 className="text-center mb-0">Welcome to Moonbloggers!</h1>
              <p className="text-center mb-0 mt-3">
                A community that Moonblogs together, stays together
              </p>
              <Button
                className="rounded-pill my-3"
                variant="outline-light"
                onClick={() => loginWithRedirect()}
              >
                Log In To Begin
              </Button>
              <Image
                src="https://pic.onlinewebfonts.com/svg/img_7362.png"
                alt="logo"
                style={{
                  width: "100px",
                  objectFit: "contain",
                  filter:
                    "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
                }}
                fluid
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return;
  }
}

export default Home;
