import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";

function AddPost() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [content, setContent] = useState("");

  const maxChars = 400;

  const progress = (content.length / maxChars) * 100;

  const addPost = async (e) => {
    e.preventDefault();

    try {
      const body = {
        auth0_token: user.sub,
        content: content,
      };

      const res = await fetch("http://localhost:5000/api/post/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      window.alert(data.message);

      setContent("");

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (isAuthenticated && !isLoading) {
    return (
      <>
        <Container
          className="d-flex justify-content-center align-items-center feed-sm mt-2"
          style={{ minWidth: "270px", minHeight: "calc(100vh - 120px)" }}
        >
          <Card style={{ width: "35rem" }}>
            <Card.Body>
              <Card.Title>Add a new post</Card.Title>
              <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
              <FloatingLabel controlId="floatingTextarea2" label="Content">
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ height: "100px" }}
                  placeholder="Content"
                  maxLength={maxChars}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </FloatingLabel>
              <ProgressBar now={progress} label={`${content.length}`} />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end gap-3">
              <Button variant="primary" disabled={!content} onClick={addPost}>
                Create post
              </Button>
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  } else {
    return;
  }
}

export default AddPost;
