import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Feed from "./Feed";

function Profile() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { username } = useParams();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch(`https://moonbloggers-backend.onrender.com/api/profile/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isAuthenticated && !isLoading) {
    return (
      <>
        <h2 className="text-center">Profile</h2>
        <Feed userPosts={userPosts} username={username} />
      </>
    );
  } else {
    return;
  }
}

export default Profile;
