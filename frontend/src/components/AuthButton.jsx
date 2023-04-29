import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    return (
      <div
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </div>
    );
  } else if (!isAuthenticated && !isLoading) {
    return (
      <Button
        className="rounded-pill mt-3"
        variant="outline-light"
        onClick={() => loginWithRedirect()}
      >
        Log In To Begin
      </Button>
    );
  } else {
    return;
  }
};

export default LoginButton;
