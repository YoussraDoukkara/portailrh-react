import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchTimes,
  createTime,
  updateTime,
  deleteTime,
} from "../actions/time";
import PaginationComponent from "./PaginationComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Time = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [times, setTimes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [modalErrors, setModalErrors] = useState([]);
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createCheckIn, setCreateCheckIn] = useState("");
  const [createCheckOut, setCreateCheckOut] = useState("");
  const [createIsBreakable, setCreateIsBreakable] = useState(false);
  const [createIsLeave, setCreateIsLeave] = useState(false);
  const [createIsRest, setCreateIsRest] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [timeToDelete, setTimeToDelete] = useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [timeToEdit, setTimeToEdit] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCheckIn, setEditCheckIn] = useState("");
  const [editCheckOut, setEditCheckOut] = useState("");
  const [editIsBreakable, setEditIsBreakable] = useState(false);
  const [editIsLeave, setEditIsLeave] = useState(false);
  const [editIsRest, setEditIsRest] = useState(false);

  const dispatch = useDispatch();

  const fetchTimesData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchTimes(currentPage)).then((response) => {
      if (response.payload.success) {
        setTimes(response.payload.data.times.data);
        setTotalItems(response.payload.data.times.total);
        setItemsPerPage(response.payload.data.times.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchTimesData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (time) => {
    setTimeToDelete(time);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (time) => {
    setCreateModalShow(true);
  };

  const handleEditClick = (time) => {
    setTimeToEdit(time);
    setEditName(time.name);
    setEditCheckIn(time.check_in);
    setEditCheckOut(time.check_out);
    setEditIsBreakable(time.is_breakable);
    setEditIsLeave(time.is_leave);
    setEditIsRest(time.is_rest);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setTimeToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateName("");
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setTimeToEdit(null);
    setEditName("");
    setEditModalShow(false);
  };

  const handleCreateTime = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdTime = {
      name: createName,
      check_in: !createIsLeave && !createIsRest ? createCheckIn : null,
      check_out: !createIsLeave && !createIsRest ? createCheckOut : null,
      is_breakable: createIsBreakable,
      is_leave: createIsLeave,
      is_rest: createIsRest,
    };

    dispatch(createTime(createdTime)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchTimesData();
        handleCreateModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setCreateLoading(false);
    });
  };

  const handleEditTime = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedTime = {
      name: editName,
      check_in: !editIsLeave && !editIsRest ? editCheckIn : null,
      check_out: !editIsLeave && !editIsRest ? editCheckOut : null,
      is_breakable: editIsBreakable,
      is_leave: editIsLeave,
      is_rest: editIsRest,
    };

    dispatch(updateTime(timeToEdit.id, updatedTime)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchTimesData();
        handleEditModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setEditLoading(false);
    });
  };

  const handleDeleteTime = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteTime(timeToDelete.id)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
      } else {
        setErrorMessage(response.payload.message);
      }

      fetchTimesData();
      setDeleteLoading(false);
      setDeleteModalShow(false);
    });
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <h2 className="me-auto">Horaires</h2>

        <Button variant="primary" onClick={() => handleCreateClick()}>
          Créer
        </Button>
      </Stack>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row className="justify-content-md-center">
        <Col>
          <Table bgcolor="white" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr key={time.id}>
                  <td>{time.id}</td>
                  <td>
                    {time.name}{" "}
                    {time.is_breakable && <Badge bg="secondary">Pause</Badge>}{" "}
                    {time.is_leave && <Badge bg="secondary">Congé</Badge>}{" "}
                    {time.is_rest && <Badge bg="secondary">Repos</Badge>}
                  </td>
                  <td>{time.check_in}</td>
                  <td>{time.check_out}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditClick(time)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(time)}
                      >
                        Supprimer
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <PaginationComponent
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></PaginationComponent>
        </Col>
      </Row>
      <Modal show={createModalShow} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une heure</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {Object.values(modalErrors).map((error, index) => (
              <Alert key={index} variant="danger">
                {error[0]}
              </Alert>
            ))}

            {modalErrorMessage && (
              <Alert variant="danger">{modalErrorMessage}</Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-breakable"
                label="Pause"
                checked={createIsBreakable}
                onChange={(e) => {
                  setCreateIsBreakable(e.target.checked);
                  setCreateIsLeave(false);
                  setCreateIsRest(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-leave"
                label="Congé"
                checked={createIsLeave}
                onChange={(e) => {
                  setCreateIsBreakable(false);
                  setCreateIsLeave(e.target.checked);
                  setCreateIsRest(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-rest"
                label="Repos"
                checked={createIsRest}
                onChange={(e) => {
                  setCreateIsBreakable(false);
                  setCreateIsLeave(false);
                  setCreateIsRest(e.target.checked);
                }}
              />
            </Form.Group>
            {!createIsLeave && !createIsRest ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Arrivée</Form.Label>
                  <Form.Control
                    type="text"
                    value={createCheckIn}
                    onChange={(e) => setCreateCheckIn(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Départ</Form.Label>
                  <Form.Control
                    type="text"
                    value={createCheckOut}
                    onChange={(e) => setCreateCheckOut(e.target.value)}
                  />
                </Form.Group>
              </>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTime}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'heure</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {Object.values(modalErrors).map((error, index) => (
              <Alert key={index} variant="danger">
                {error[0]}
              </Alert>
            ))}

            {modalErrorMessage && (
              <Alert variant="danger">{modalErrorMessage}</Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-breakable"
                label="Pause"
                checked={editIsBreakable}
                onChange={(e) => {
                  setEditIsBreakable(e.target.checked);
                  setEditIsLeave(false);
                  setEditIsRest(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-leave"
                label="Congé"
                checked={editIsLeave}
                onChange={(e) => {
                  setEditIsBreakable(false);
                  setEditIsLeave(e.target.checked);
                  setEditIsRest(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-rest"
                label="Repos"
                checked={editIsRest}
                onChange={(e) => {
                  setEditIsBreakable(false);
                  setEditIsLeave(false);
                  setEditIsRest(e.target.checked);
                }}
              />
            </Form.Group>
            {!editIsLeave && !editIsRest ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Arrivée</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCheckIn}
                    onChange={(e) => setEditCheckIn(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Départ</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCheckOut}
                    onChange={(e) => setEditCheckOut(e.target.value)}
                  />
                </Form.Group>
              </>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditTime}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'heure</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer cette heure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteTime}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Time;
