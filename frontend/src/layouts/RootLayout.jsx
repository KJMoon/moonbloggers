import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navigationbar from "../components/Navigationbar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import LoadingPage from "../components/LoadingPage";

export default function RootLayout() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <Container className="mx-0 px-0" fluid>
          <header className="mb-0" style={{ height: "60px" }}>
            <Navigationbar />
          </header>
          <main
            className="bg-dark text-white py-3"
            style={{ minHeight: "calc(100vh - 120px)" }}
          >
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </Container>
      </>
    );
  }
}
