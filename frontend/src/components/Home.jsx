import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <>
      <Container className="d-none d-sm-block" fluid>
        <Row>
          <Col sm className="text-center">
            Home Page
          </Col>
          <Col sm className="text-center">
            Hello
          </Col>
        </Row>
      </Container>
      <Container className="d-sm-none" fluid>
        <Row style={{ height: "400px" }}>
          <Col sm className="text-center">
            Home Page
          </Col>
          <Col sm className="text-center">
            Hello
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
