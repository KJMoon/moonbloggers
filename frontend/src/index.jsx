import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./components/Home";
import "./assets/scss/styles.scss";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path="/:username" element={<Profile />} />
      <Route path="/post/:postId" element={<Post />} /> */}
    </Route>
  )
);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="https://dev-lxjzzdkv0pete2ea.us.auth0.com"
      clientId="j7uZ9FbsLsc5S16Fde6CKuw9yLFG9qpt"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} fallbackElement={<Error />} />
    </Auth0Provider>
  </React.StrictMode>
);
