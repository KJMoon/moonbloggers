import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "../components/Navigationbar";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

export default function RootLayout() {
  return (
    <>
      <Container className="mx-0 px-0" fluid>
        <header className="d-none d-sm-block mb-0">
          <Navigationbar />
        </header>
        <header className="d-sm-none mb-0">
          <Navigationbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}
