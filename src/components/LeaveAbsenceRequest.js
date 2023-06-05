import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchLeaveAbsenceRequests,
  createLeaveAbsenceRequest,
  updateLeaveAbsenceRequest,
  deleteLeaveAbsenceRequest,
  approveLeaveAbsenceRequest,
  rejectLeaveAbsenceRequest,
} from "../actions/leaveAbsenceRequest";
import PaginationComponent from "./PaginationComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import LoadingSpinner from "./LoadingSpinner";
import { NavLink } from 'react-router-dom';

const LeaveAbsenceRequest = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const [leaveAbsenceRequests, setLeaveAbsenceRequests] = useState([]);
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
  const [createBody, setCreateBody] = useState("");
  const [createReason, setCreateReason] = useState("");
  const [createStartsAt, setCreateStartsAt] = useState("");
  const [createEndsAt, setCreateEndsAt] = useState("");
  const [createAttachments, setCreateAttachments] = useState(null);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [leaveAbsenceRequestToDelete, setLeaveAbsenceRequestToDelete] =
    useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [leaveAbsenceRequestToEdit, setLeaveAbsenceRequestToEdit] =
    useState(null);
  const [editBody, setEditBody] = useState("");
  const [editReason, setEditReason] = useState("");
  const [editStartsAt, setEditStartsAt] = useState("");
  const [editEndsAt, setEditEndsAt] = useState("");

  const [approveLoadingKey, setApproveLoadingKey] = useState(0);
  const [rejectLoadingKey, setRejectLoadingKey] = useState(0);

  const dispatch = useDispatch();

  const fetchLeaveAbsenceRequestsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchLeaveAbsenceRequests(currentPage)).then((response) => {
      if (response.payload.success) {
        setLeaveAbsenceRequests(
          response.payload.data.leave_absence_requests.data
        );
        setTotalItems(response.payload.data.leave_absence_requests.total);
        setItemsPerPage(response.payload.data.leave_absence_requests.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchLeaveAbsenceRequestsData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (leaveAbsenceRequest) => {
    setLeaveAbsenceRequestToDelete(leaveAbsenceRequest);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (leaveAbsenceRequest) => {
    setCreateModalShow(true);
  };

  const handleEditClick = (leaveAbsenceRequest) => {
    setLeaveAbsenceRequestToEdit(leaveAbsenceRequest);
    setEditBody(leaveAbsenceRequest.body);
    setEditReason(leaveAbsenceRequest.reason);
    setEditStartsAt(leaveAbsenceRequest.starts_at);
    setEditEndsAt(leaveAbsenceRequest.ends_at);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setLeaveAbsenceRequestToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateBody("");
    setCreateReason("");
    setCreateStartsAt("");
    setCreateEndsAt("");
    setCreateAttachments(null);
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setLeaveAbsenceRequestToEdit(null);
    setEditBody("");
    setEditReason("");
    setEditStartsAt("");
    setEditEndsAt("");
    setEditModalShow(false);
  };

  const handleCreateLeaveAbsenceRequest = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdLeaveAbsenceRequest = {
      body: createBody,
      reason: createReason,
      starts_at: createStartsAt,
      ends_at: createEndsAt,
      attachments: createAttachments,
    };

    dispatch(createLeaveAbsenceRequest(createdLeaveAbsenceRequest)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchLeaveAbsenceRequestsData();
          handleCreateModalClose();
        } else {
          setModalErrors(response.payload.errors);
          setModalErrorMessage(response.payload.message);
        }

        setCreateLoading(false);
      }
    );
  };

  const handleEditLeaveAbsenceRequest = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedLeaveAbsenceRequest = {
      body: editBody,
      reason: editReason,
      starts_at: editStartsAt,
      ends_at: editEndsAt,
    };

    dispatch(
      updateLeaveAbsenceRequest(
        leaveAbsenceRequestToEdit.id,
        updatedLeaveAbsenceRequest
      )
    ).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchLeaveAbsenceRequestsData();
        handleEditModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setEditLoading(false);
    });
  };

  const handleDeleteLeaveAbsenceRequest = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteLeaveAbsenceRequest(leaveAbsenceRequestToDelete.id)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
        } else {
          setErrorMessage(response.payload.message);
        }

        fetchLeaveAbsenceRequestsData();
        setDeleteLoading(false);
        setDeleteModalShow(false);
      }
    );
  };

  const handleApproveClick = (leaveAbsenceRequest) => {
    setApproveLoadingKey(leaveAbsenceRequest.id);

    setSuccessMessage("");
    setModalErrorMessage("");

    dispatch(approveLeaveAbsenceRequest(leaveAbsenceRequest.id)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchLeaveAbsenceRequestsData();
        } else {
          setErrorMessage(response.payload.message);
        }

        setApproveLoadingKey(0);
      }
    );
  };

  const handleRejectClick = (leaveAbsenceRequest) => {
    setRejectLoadingKey(leaveAbsenceRequest.id);

    setSuccessMessage("");
    setModalErrorMessage("");

    dispatch(rejectLeaveAbsenceRequest(leaveAbsenceRequest.id)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchLeaveAbsenceRequestsData();
        } else {
          setErrorMessage(response.payload.message);
        }

        setRejectLoadingKey(0);
      }
    );
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <h2 className="me-auto">Demandes de congé</h2>

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
                {(user.role === "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && <th>Employé</th>}
                <th>Commence à</th>
                <th>Fini à</th>
                <th>Approuvé à</th>
                <th>Rejeté à</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveAbsenceRequests.map((leaveAbsenceRequest) => (
                <tr key={leaveAbsenceRequest.id}>
                  <td>{leaveAbsenceRequest.id}</td>
                  {(user.role === "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && (
                    <td>
                      {leaveAbsenceRequest.employee.user.first_name}{" "}
                      {leaveAbsenceRequest.employee.user.last_name}
                    </td>
                  )}
                  <td>{leaveAbsenceRequest.starts_at}</td>
                  <td>{leaveAbsenceRequest.ends_at}</td>
                  <td>{leaveAbsenceRequest.approved_at}</td>
                  <td>{leaveAbsenceRequest.rejected_at}</td>
                  <td>
                    {leaveAbsenceRequest.approved_at ? (
                      <Badge bg="success">Approuvé</Badge>
                    ) : leaveAbsenceRequest.rejected_at ? (
                      <Badge bg="danger">Rejeté</Badge>
                    ) : (
                      <Badge bg="info">En attente</Badge>
                    )}
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      {(user.role === "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && !leaveAbsenceRequest.approved_at &&
                        !leaveAbsenceRequest.rejected_at ? (
                        <>
                        {(user.role === "admin" || (user.employee && user.employee.id != leaveAbsenceRequest.employee.id)) && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              handleApproveClick(leaveAbsenceRequest)
                            }
                            disabled={
                              approveLoadingKey === leaveAbsenceRequest.id
                            }
                          >
                            {approveLoadingKey === leaveAbsenceRequest.id
                              ? "Approbation en cours..."
                              : "Approuver"}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleRejectClick(leaveAbsenceRequest)
                            }
                            disabled={
                              rejectLoadingKey === leaveAbsenceRequest.id
                            }
                          >
                            {rejectLoadingKey === leaveAbsenceRequest.id
                              ? "Rejet en cours..."
                              : "Rejeter"}
                          </Button>
                        </>
                        )}
                        </>
                      ) : null}

                      <NavLink to={`/leave-absence-requests/${leaveAbsenceRequest.id}`} className="btn btn-info btn-sm">
                        Afficher
                      </NavLink>
                      {user.role === "admin" && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditClick(leaveAbsenceRequest)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(leaveAbsenceRequest)}
                          >
                            Supprimer
                          </Button>
                        </>
                      )}
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
          <Modal.Title>Créer une demande de congé</Modal.Title>
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
              <Form.Label>Corps</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={createBody}
                onChange={(e) => setCreateBody(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raison</Form.Label>
              <Form.Select onChange={(e) => setCreateReason(e.target.value)}>
                <option>Choisir une raison</option>
                <option
                  key="illness"
                  value="illness"
                  selected={"illness" == createReason}
                >
                  Maladie
                </option>
                <option
                  key="mission"
                  value="mission"
                  selected={"mission" == createReason}
                >
                  Mission
                </option>
                <option
                  key="other"
                  value="other"
                  selected={"other" == createReason}
                >
                  Autre
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Commence à</Form.Label>
              <Form.Control
                type="date"
                value={createStartsAt}
                onChange={(e) => setCreateStartsAt(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Se termine à</Form.Label>
              <Form.Control
                type="date"
                value={createEndsAt}
                onChange={(e) => setCreateEndsAt(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pièces jointes</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCreateAttachments(e.target.files)}
                multiple
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateLeaveAbsenceRequest}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'demande de congé</Modal.Title>
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
              <Form.Label>Corps</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raison</Form.Label>
              <Form.Select onChange={(e) => setEditReason(e.target.value)}>
                <option>Choisir une raison</option>
                <option
                  key="illness"
                  value="illness"
                  selected={"illness" == editReason}
                >
                  Maladie
                </option>
                <option
                  key="mission"
                  value="mission"
                  selected={"mission" == editReason}
                >
                  Mission
                </option>
                <option
                  key="other"
                  value="other"
                  selected={"other" == editReason}
                >
                  Autre
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Commence à</Form.Label>
              <Form.Control
                type="date"
                value={editStartsAt}
                onChange={(e) => setEditStartsAt(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Se termine à</Form.Label>
              <Form.Control
                type="date"
                value={editEndsAt}
                onChange={(e) => setEditEndsAt(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleEditLeaveAbsenceRequest}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'demande de congé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment supprimer cette demande de congé ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteLeaveAbsenceRequest}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaveAbsenceRequest;
