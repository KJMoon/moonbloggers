import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="container">
        <div className="d-flex h-100 ">
          <header className="text-center vh-100">
            <h1>MoonBloggers</h1>
          </header>
          <main className="vh-100 px-0">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
