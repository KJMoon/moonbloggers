import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

function Likes({ post, postId }) {
  const { user } = useAuth0();

  const [currentUsersId, setCurrentUsersId] = useState("");
  const [postLiked, setPostLiked] = useState(false);
  const [likes, setLikes] = useState("");
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const body = {
      username: user.nickname,
    };

    fetch("http://localhost:5000/api/users/currentuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsersId(data.id);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const body = {
      post_id: post ? post.id : postId,
    };

    fetch("http://localhost:5000/api/likes/likescount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setLikedUsers(data.likedUsers);
      })
      .catch((err) => console.log(err));
  }, [postLiked, post]);

  useEffect(() => {
    if (likedUsers && likedUsers.includes(currentUsersId)) {
      setPostLiked(true);
    }
  }, [likedUsers, currentUsersId]);

  const handleLike = async () => {
    try {
      const body = {
        user_id: currentUsersId,
        post_id: post ? post.id : postId,
      };

      const res = await fetch(`http://localhost:5000/api/likes/addlike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setPostLiked(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLikeDelete = async () => {
    try {
      const body = {
        user_id: currentUsersId,
        post_id: post ? post.id : postId,
      };

      const res = await fetch(`http://localhost:5000/api/likes/deletelike`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setPostLiked(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn d-flex align-items-center p-0"
        style={{ color: "red" }}
        onClick={() => {
          likedUsers && likedUsers.includes(currentUsersId)
            ? handleLikeDelete()
            : handleLike();
        }}
      >
        {postLiked ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </button>
      <span className="p-0 m-0">{likes}</span>
    </>
  );
}

export default Likes;
