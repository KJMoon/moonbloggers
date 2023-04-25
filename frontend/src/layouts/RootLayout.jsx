import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "../components/Navigationbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <header className="d-none d-sm-block mb-3" style={{ height: "70px" }}>
        <Navigationbar />
      </header>
      <header className="d-sm-none mb-1" style={{ height: "90px" }}>
        <Navigationbar />
      </header>
      <main style={{ height: "calc(100vh - 186px)" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
