import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Likes from "./Likes";

function PostCard({ post }) {
  const navigate = useNavigate();

  const [postOwner, setPostOwner] = useState({
    username: "",
  });

  useEffect(() => {
    const body = {
      user_id: post.user_id,
    };

    fetch("http://localhost:5000/api/users/postuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostOwner({
          username: data.username,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="d-none d-sm-block">
        <Card style={{ width: "35rem" }}>
          <Card.Body role="button" onClick={() => navigate(`/post/${post.id}`)}>
            <Card.Title>{postOwner.username}</Card.Title>
            <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-start align-items-center px-4 gap-1">
            <Likes post={post} />
          </Card.Footer>
        </Card>
      </div>
      <div className="d-sm-none">
        <Card style={{ width: "14rem" }}>
          <Card.Body role="button" onClick={() => navigate(`/post/${post.id}`)}>
            <Card.Title>{postOwner.username}</Card.Title>
            <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-start align-items-center px-4 gap-1">
            <Likes post={post} />
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default PostCard;
