import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navigationbar from "../components/Navigationbar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import LoadingPage from "../components/LoadingPage";

export default function RootLayout() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading && !hasLoggedIn) {
      const body = {
        username: user.nickname,
        auth0_token: user.sub,
      };

      fetch("https://moonbloggers-backend.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setHasLoggedIn(true);
    }
  }, [isAuthenticated, hasLoggedIn]);

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
            className="bg-dark text-white pt-3 pb-4"
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
