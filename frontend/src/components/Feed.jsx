import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PostCard from "./PostCard";

function Feed({ userPosts, username }) {
  const location = useLocation();

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("https://moonbloggers-backend.onrender.com/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {location.pathname === "/" && (
        <Container className="feed-sm mt-2">
          <Row xs={1} className="g-4 flex-grow-1">
            {allPosts.map((post) => {
              return (
                <Col
                  xs={12}
                  key={post.id}
                  className="d-flex justify-content-center"
                >
                  <PostCard post={post} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
      {location.pathname === `/${username}` && (
        <Container className="feed-sm mt-2">
          <Row xs={1} className="g-4 flex-grow-1">
            {userPosts.map((post) => {
              return (
                <Col
                  xs={12}
                  key={post.id}
                  className="d-flex justify-content-center"
                >
                  <PostCard post={post} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Feed;
