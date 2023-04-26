import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  let date_time = new Date();
  let year = date_time.getFullYear();

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center bg-primary-subtle"
        style={{ height: "70px" }}
        fluid
      >
        <Row>
          <Col sm>
            <p className="fw-bold m-0 p-0">&copy; {year} Eric Moon</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
