import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "../actions/designation";
import PaginationComponent from "./PaginationComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Designation = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [designations, setDesignations] = useState([]);
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

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [designationToEdit, setDesignationToEdit] = useState(null);
  const [editName, setEditName] = useState("");

  const dispatch = useDispatch();

  const fetchDesignationsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchDesignations(currentPage)).then((response) => {
      if (response.payload.success) {
        setDesignations(response.payload.data.designations.data);
        setTotalItems(response.payload.data.designations.total);
        setItemsPerPage(response.payload.data.designations.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchDesignationsData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (designation) => {
    setDesignationToDelete(designation);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (designation) => {
    setCreateModalShow(true);
  };

  const handleEditClick = (designation) => {
    setDesignationToEdit(designation);
    setEditName(designation.name);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setDesignationToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateName("");
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setDesignationToEdit(null);
    setEditName("");
    setEditModalShow(false);
  };

  const handleCreateDesignation = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdDesignation = {
      name: createName,
    };

    dispatch(createDesignation(createdDesignation)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchDesignationsData();
        handleCreateModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setCreateLoading(false);
    });
  };

  const handleEditDesignation = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedDesignation = {
      name: editName,
    };

    dispatch(updateDesignation(designationToEdit.id, updatedDesignation)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchDesignationsData();
          handleEditModalClose();
        } else {
          setModalErrors(response.payload.errors);
          setModalErrorMessage(response.payload.message);
        }

        setEditLoading(false);
      }
    );
  };

  const handleDeleteDesignation = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteDesignation(designationToDelete.id)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
      } else {
        setErrorMessage(response.payload.message);
      }

      fetchDesignationsData();
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
        <h2 className="me-auto">Désignations</h2>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((designation) => (
                <tr key={designation.id}>
                  <td>{designation.id}</td>
                  <td>{designation.name}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditClick(designation)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(designation)}
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
          <Modal.Title>Créer une désignation</Modal.Title>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateDesignation}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la désignation</Modal.Title>
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
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleEditDesignation}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la désignation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment supprimer cette désignation ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteDesignation}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Designation;
