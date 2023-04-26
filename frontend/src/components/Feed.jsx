import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PostCard from "./PostCard";

function Feed() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
    </>
  );
}

export default Feed;
