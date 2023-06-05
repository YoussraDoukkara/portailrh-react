import React, { useState, useEffect } from "react";
import { fetchData } from "../actions/data";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  checkInAttendance,
  checkOutAttendance,
  breakInAttendance,
  breakOutAttendance,
} from "../actions/attendance";
import {
  faRightToBracket,
  faRightFromBracket,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Stack } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import PaginationComponent from "./PaginationComponent";
import {
  fetchNotes,
  createNote,
} from "../actions/note";
import {
  fetchPosts,
  createPost,
} from "../actions/post";

const Dashboard = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  const [notesShowLoadingSpinner, setNotesShowLoadingSpinner] = useState(true);
  const [postsShowLoadingSpinner, setPostsShowLoadingSpinner] = useState(true);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const [createNoteErrors, setCreateNoteErrors] = useState([]);
  const [createNoteErrorMessage, setCreateNoteErrorMessage] = useState("");
  const [createNoteSuccessMessage, setCreateNoteSuccessMessage] = useState("");

  const [createNoteBody, setCreateNoteBody] = useState("");

  const [createNoteLoading, setCreateNoteLoading] = useState(false);

  const [createPostErrors, setCreatePostErrors] = useState([]);
  const [createPostErrorMessage, setCreatePostErrorMessage] = useState("");
  const [createPostSuccessMessage, setCreatePostSuccessMessage] = useState("");

  const [createPostBody, setCreatePostBody] = useState("");

  const [createPostLoading, setCreatePostLoading] = useState(false);

  const [notes, setNotes] = useState([]);
  const [notesTotalItems, setNotesTotalItems] = useState(0);
  const [notesItemsPerPage, setNotesItemsPerPage] = useState(0);
  const [notesCurrentPage, setNotesCurrentPage] = useState(1);

  const [posts, setPosts] = useState([]);
  const [postsTotalItems, setPostsTotalItems] = useState(0);
  const [postsItemsPerPage, setPostsItemsPerPage] = useState(0);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);

  const [notesErrorMessage, setNotesErrorMessage] = useState("");
  const [postsErrorMessage, setPostsErrorMessage] = useState("");

  const fetchDataData = async () => {
    setShowLoadingSpinner(true)
    setData([]);
    const response = await dispatch(fetchData());
    if (response.payload.success) {
      setData(response.payload.data);
    }
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchDataData();
  }, []);

  useEffect(() => {
    fetchNotesData();
  }, [notesCurrentPage]);

  useEffect(() => {
    fetchPostsData();
  }, [postsCurrentPage]);

  const handleNotesPageChange = (pageNumber) => {
    setNotesCurrentPage(pageNumber);
  };

  const handlePostsPageChange = (pageNumber) => {
    setPostsCurrentPage(pageNumber);
  };

  const handleArriveeClick = () => {
    setModalMessage("Bonjour " + user.first_name + " " + user.last_name + "!");
    setShowModal(true);
    setStatus("check-in");
  };

  const handleDepartClick = () => {
    setModalMessage(
      "Au revoir " + user.first_name + " " + user.last_name + "!"
    );
    setShowModal(true);
    setStatus("check-out");
  };

  const handleDebutPauseClick = () => {
    setModalMessage("La pause commence maintenant.");
    setShowModal(true);
    setStatus("break-in");
  };

  const handleFinPauseClick = () => {
    setModalMessage("La pause est terminée.");
    setShowModal(true);
    setStatus("break-out");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const fetchNotesData = async () => {
    setNotesShowLoadingSpinner(true)
    await dispatch(fetchNotes(notesCurrentPage)).then((response) => {
      if (response.payload.success) {
        setNotes(response.payload.data.notes.data);
        setNotesTotalItems(response.payload.data.notes.total);
        setNotesItemsPerPage(response.payload.data.notes.per_page);
      } else {
        setNotesErrorMessage(response.payload.message);
      }
    });
    setNotesShowLoadingSpinner(false)
  };

  const fetchPostsData = async () => {
    setPostsShowLoadingSpinner(true)
    await dispatch(fetchPosts(postsCurrentPage)).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.data.posts.data);
        setPostsTotalItems(response.payload.data.posts.total);
        setPostsItemsPerPage(response.payload.data.posts.per_page);
      } else {
        setPostsErrorMessage(response.payload.message);
      }
    });
    setPostsShowLoadingSpinner(false)
  };

  const handleCreateNote = () => {
    setCreateNoteLoading(true);

    setCreateNoteSuccessMessage("");
    setCreateNoteErrorMessage("");
    setCreateNoteErrors("");

    const createdNote = {
      body: createNoteBody,
    };

    dispatch(createNote(createdNote)).then(
      (response) => {
        if (response.payload.success) {
          setCreateNoteSuccessMessage(response.payload.message);
          fetchNotesData();

          setCreateNoteBody("");
        } else {
          setCreateNoteErrors(response.payload.errors);
          setCreateNoteErrorMessage(response.payload.message);
        }

        setCreateNoteLoading(false);
      }
    );
  };

  const handleCreatePost = () => {
    setCreatePostLoading(true);

    setCreatePostSuccessMessage("");
    setCreatePostErrorMessage("");
    setCreatePostErrors("");

    const createdPost = {
      body: createPostBody,
    };

    dispatch(createPost(createdPost)).then(
      (response) => {
        if (response.payload.success) {
          setCreatePostSuccessMessage(response.payload.message);
          fetchPostsData();

          setCreatePostBody("");
        } else {
          setCreatePostErrors(response.payload.errors);
          setCreatePostErrorMessage(response.payload.message);
        }

        setCreatePostLoading(false);
      }
    );
  };

  const handleConfirmClick = async () => {
    setLoading(true);

    try {
      switch (modalStatus) {
        case "check-in":
          await dispatch(checkInAttendance());
          break;
        case "check-out":
          await dispatch(checkOutAttendance());
          break;
        case "break-in":
          await dispatch(breakInAttendance());
          break;
        case "break-out":
          await dispatch(breakOutAttendance());
          break;
        default:
          break;
      }
    } catch (error) { }

    setLoading(false);
    handleModalClose();

    fetchDataData();
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <Row
        as={Stack}
        className="justify-content-md-center g-4 mb-5"
        direction="horizontal"
      >
        <Col xs={12} sm={6} md={6} lg={3} className="flex-grow-1" style={{ height: 200 }}>
          <Button
            variant="primary"
            size="lg"
            className={`px-5 py-4 w-100 h-100 ${data.check_in != null ? 'disabled' : ''}`}
            onClick={handleArriveeClick}
          >
            <FontAwesomeIcon icon={faRightToBracket} size="3x" className="text-white" />
            {data.check_in == null && (
              <div>Arrivée</div>
            )}
            {data.check_in != null && (
              <div>Arrivé à {data.check_in}</div>
            )}
          </Button>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3} className="flex-grow-1" style={{ height: 200 }}>
          <Button
            variant="primary"
            size="lg"
            className={`px-5 py-4 w-100 h-100 ${data.check_in == null || data.check_out != null || data.break_in != null ? 'disabled' : ''}`}
            onClick={handleDebutPauseClick}
          >
            <FontAwesomeIcon icon={faPause} size="3x" className="text-white" />
            {data.break_in == null && (
              <div>Début pause</div>
            )}
            {data.break_in != null && (
              <div>La pause a commencé à {data.break_in}</div>
            )}
          </Button>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3} className="flex-grow-1" style={{ height: 200 }}>
          <Button
            variant="primary"
            size="lg"
            className={`px-5 py-4 w-100 h-100 ${data.check_in == null || data.break_in == null || data.break_out != null ? 'disabled' : ''}`}
            onClick={handleFinPauseClick}
          >
            <FontAwesomeIcon icon={faPlay} size="3x" className="text-white" />
            {data.break_out == null && (
              <div>Fin de pause</div>
            )}
            {data.break_out != null && (
              <div>La pause s'est terminée à {data.break_out}</div>
            )}
          </Button>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3} className="flex-grow-1" style={{ height: 200 }}>
          <Button
            variant="primary"
            size="lg"
            className={`px-5 py-4 w-100 h-100 ${data.check_in == null || (data.break_in != null && data.break_out == null) || data.check_out != null ? 'disabled' : ''}`}
            onClick={handleDepartClick}
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="3x" className="text-white" />
            {data.check_out == null && (
              <div>Départ</div>
            )}
            {data.check_out != null && (
              <div>Départ à {data.check_out}</div>
            )}
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmClick}
            disabled={loading}
          >
            {loading ? "Confirmation en cours..." : "Confirmer"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row
        className="justify-content-md-center g-4"
      >
        <Col sm={12} lg={6} className="flex-grow-1">
          <Card>
            <Card.Header className="bg-primary text-white"><h2 className="h3">Mes notes</h2></Card.Header>
            {notesErrorMessage && (
              <>
                <Card.Body>
                  <Alert variant="danger">{notesErrorMessage}</Alert>
                </Card.Body>
              </>
            )}
            {notesShowLoadingSpinner === false ? (
              <>
                <ListGroup variant="flush">
                  {notes.map((note) => (
                    <ListGroup.Item className="py-3">
                      <div className="h6 mb-3">
                        <span className="text-muted">{note.created_at}</span>
                      </div>
                      <p class="mb-0">{note.body}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Body>
                  <PaginationComponent
                    totalItems={notesTotalItems}
                    itemsPerPage={notesItemsPerPage}
                    currentPage={notesCurrentPage}
                    onPageChange={handleNotesPageChange}
                  ></PaginationComponent>
                </Card.Body>
              </>
            ) : (
              <Card.Body>
                <LoadingSpinner />
              </Card.Body>
            )}
            <Card.Body>
              {Object.values(createNoteErrors).map((error, index) => (
                <Alert key={index} variant="danger">
                  {error[0]}
                </Alert>
              ))}

              {createNoteErrorMessage && <Alert variant="danger">{createNoteErrorMessage}</Alert>}

              {createNoteSuccessMessage && <Alert variant="success">{createNoteSuccessMessage}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={createNoteBody}
                  onChange={(e) => setCreateNoteBody(e.target.value)}
                />
              </Form.Group>
            </Card.Body>

            <Card.Footer>
              <Button
                variant="primary"
                onClick={handleCreateNote}
                disabled={createNoteLoading}
              >
                {createNoteLoading ? "Ajout en cours..." : "Ajouter"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col sm={12} lg={6} className="flex-grow-1">
          <Card>
            <Card.Header className="bg-primary text-white"><h2 className="h3">Messages publics</h2></Card.Header>
            {postsErrorMessage && (
              <>
                <Card.Body>
                  <Alert variant="danger">{postsErrorMessage}</Alert>
                </Card.Body>
              </>
            )}
            {postsShowLoadingSpinner === false ? (
              <>
                <ListGroup variant="flush">
                  {posts.map((post) => (
                    <ListGroup.Item className="py-3">
                      <h5 className="h6 mb-0">
                        {post.user.first_name}{" "}{post.user.last_name}
                      </h5>
                      <div className="mb-3">
                        <span className="text-muted">{post.created_at}</span>
                      </div>
                      <p class="mb-0">{post.body}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Body>
                  <PaginationComponent
                    totalItems={postsTotalItems}
                    itemsPerPage={postsItemsPerPage}
                    currentPage={postsCurrentPage}
                    onPageChange={handlePostsPageChange}
                  ></PaginationComponent>
                </Card.Body>
              </>
            ) : (
              <Card.Body>
                <LoadingSpinner />
              </Card.Body>
            )}
            <Card.Body>
              {Object.values(createPostErrors).map((error, index) => (
                <Alert key={index} variant="danger">
                  {error[0]}
                </Alert>
              ))}

              {createPostErrorMessage && <Alert variant="danger">{createPostErrorMessage}</Alert>}

              {createPostSuccessMessage && <Alert variant="success">{createPostSuccessMessage}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Publication</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={createPostBody}
                  onChange={(e) => setCreatePostBody(e.target.value)}
                />
              </Form.Group>
            </Card.Body>

            <Card.Footer>
              <Button
                variant="primary"
                onClick={handleCreatePost}
                disabled={createPostLoading}
              >
                {createPostLoading ? "Publication en cours..." : "Publier"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
