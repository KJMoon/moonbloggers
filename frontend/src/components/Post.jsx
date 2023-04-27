import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function Post() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { postId } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [post, setPost] = useState({
    id: "",
    content: "",
    user: "",
    user_id: "",
    updated_at: "",
  });

  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    content: "",
    user: "",
    user_id: "",
    updated_at: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/post/${postId}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({
          id: data.id,
          content: data.content,
          user: data.user,
          user_id: data.user_id,
          updated_at: format(new Date(data.updated_at), "MMM dd, yyyy h:mm a"),
        });
      })
      .catch((err) => err);
  }, [postId, updatedPost, setUpdatedPost]);

  const editPost = async (e) => {
    e.preventDefault();
    try {
      const body = { content: updatedPost.content };
      const res = await fetch(
        `http://localhost:5000/api/post/editPost/${postId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      setUpdatedPost({
        id: "",
        content: "",
        user: "",
        user_id: "",
        updated_at: "",
      });
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deletePost = async () => {
    try {
      await fetch(`http://localhost:5000/api/post/deletePost/${postId}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center feed-sm mt-2"
        style={{ minWidth: "270px", minHeight: "calc(100vh - 120px)" }}
      >
        <Card style={{ width: "35rem" }}>
          <Card.Body>
            <Card.Title>{post.user}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {post.updated_at}
            </Card.Subtitle>
            <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
          {user && user.nickname == post.user && (
            <Card.Footer className="d-flex justify-content-end gap-3">
              <Button variant="outline-primary" onClick={handleShow}>
                <FiEdit />
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Edit your post below</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                          setUpdatedPost({
                            ...updatedPost,
                            content: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!updatedPost.content}
                    onClick={editPost}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button variant="outline-danger" onClick={deletePost}>
                <BsTrash />
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Container>
    </>
  );
}

export default Post;