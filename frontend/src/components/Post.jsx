import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Likes from "./Likes";

function Post() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { postId } = useParams();

  const [show, setShow] = useState(false);

  const [post, setPost] = useState({
    id: "",
    content: "",
    user: "",
    user_id: "",
    updated_at: "",
  });

  const [updatedContent, setUpdatedContent] = useState("");

  //The following state is added for rendering purposes. Every time a user saves their changes when editing a post, this state will cause the useEffect to run to fetch the changed post
  const [editedState, setEditedState] = useState(false);

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
  }, [postId, editedState]);

  const handleClose = () => {
    setShow(false);
    setUpdatedContent("");
  };
  const handleShow = () => setShow(true);

  const maxChars = 400;

  const progress =
    updatedContent !== post.content.length
      ? (updatedContent.length / maxChars) * 100
      : (post.content.length / maxChars) * 100;

  const editPost = async (e) => {
    e.preventDefault();
    try {
      const body = { content: updatedContent };
      const res = await fetch(
        `http://localhost:5000/api/post/editPost/${postId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();

      setUpdatedContent("");

      window.alert(data.message);

      handleClose();

      setEditedState(!editedState);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deletePost = async () => {
    try {
      await fetch(`http://localhost:5000/api/post/deletePost/${postId}`, {
        method: "DELETE",
      });
      navigate(-1);
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
              <Card.Title>{post.user}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {post.updated_at}
              </Card.Subtitle>
              <hr className="bg-primary-subtle border-2 border-top border-primary-subtle" />
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-start align-items-center px-4 gap-2">
              <Likes postId={postId} />
              {user && user.nickname == post.user && (
                <div className="d-flex align-items-center py-0 pe-3 gap-2">
                  <div>
                    <Button
                      variant="light"
                      className="pt-0 pb-1 px-0"
                      onClick={() => {
                        handleShow();
                        setUpdatedContent(post.content);
                      }}
                    >
                      <FiEdit style={{ color: "blue" }} />
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
                            <Form.Control
                              as="textarea"
                              rows={3}
                              maxLength={maxChars}
                              defaultValue={post.content}
                              onChange={(e) =>
                                setUpdatedContent(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                        {updatedContent.length === maxChars ? (
                          <ProgressBar
                            variant="info"
                            now={progress}
                            label={
                              updatedContent !== post.content.length
                                ? `${updatedContent.length}`
                                : `${post.content.length}`
                            }
                          />
                        ) : (
                          <ProgressBar
                            striped
                            variant="info"
                            now={progress}
                            label={
                              updatedContent !== post.content.length
                                ? `${updatedContent.length}`
                                : `${post.content.length}`
                            }
                          />
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          disabled={
                            !updatedContent || updatedContent === post.content
                          }
                          onClick={editPost}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <Button
                    variant="light"
                    className="pt-0 pb-1 px-0"
                    onClick={deletePost}
                  >
                    <BsTrash style={{ color: "red" }} />
                  </Button>
                </div>
              )}
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  } else {
    return;
  }
}

export default Post;
