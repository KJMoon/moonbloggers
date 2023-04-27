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
import Profile from "./components/Profile";
import Post from "./components/Post";
import AddPost from "./components/AddPost";

// import bootstrap
import "./assets/scss/styles.scss";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/:username" element={<Profile />} />
      <Route path="/create" element={<AddPost />} />
      <Route path="/post/:postId" element={<Post />} />
    </Route>
  )
);

const root = createRoot(document.getElementById("root"));

const auth0Domain = process.env.REACT_APP_AUTH_ISSUER_BASE_URL;
const auth0ClientId = process.env.REACT_APP_AUTH_CLIENT_ID;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} fallbackElement={<Error />} />
    </Auth0Provider>
  </React.StrictMode>
);
