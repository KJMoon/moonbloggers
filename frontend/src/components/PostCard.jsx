import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function PostCard({ post }) {
  const navigate = useNavigate();
  const [postOwner, setPostOwner] = useState({
    username: "",
  });

  useEffect(() => {
    const body = {
      user_id: post.user_id,
    };

    fetch("http://localhost:5000/api/user", {
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
      <div
        className="d-none d-sm-block"
        role="button"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <Card style={{ width: "35rem" }}>
          <Card.Body>
            <Card.Title>{postOwner.username}</Card.Title>
            <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div
        className="d-sm-none"
        role="button"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <Card style={{ width: "14rem" }}>
          <Card.Body>
            <Card.Title>{postOwner.username}</Card.Title>
            <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default PostCard;
