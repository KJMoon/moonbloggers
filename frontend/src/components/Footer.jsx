import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <>
      <Container className="bg-light" fluid>
        <Row style={{ height: "100px" }}>
          <Col sm className="text-center">
            Footer
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
