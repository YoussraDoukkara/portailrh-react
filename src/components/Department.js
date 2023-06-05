import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../actions/department";
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

const Department = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [departments, setDepartments] = useState([]);
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
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [editName, setEditName] = useState("");

  const dispatch = useDispatch();

  const fetchDepartmentsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchDepartments(currentPage)).then((response) => {
      if (response.payload.success) {
        setDepartments(response.payload.data.departments.data);
        setTotalItems(response.payload.data.departments.total);
        setItemsPerPage(response.payload.data.departments.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchDepartmentsData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (department) => {
    setCreateModalShow(true);
  };

  const handleEditClick = (department) => {
    setDepartmentToEdit(department);
    setEditName(department.name);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setDepartmentToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateName("");
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setDepartmentToEdit(null);
    setEditName("");
    setEditModalShow(false);
  };

  const handleCreateDepartment = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdDepartment = {
      name: createName,
    };

    dispatch(createDepartment(createdDepartment)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchDepartmentsData();
        handleCreateModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setCreateLoading(false);
    });
  };

  const handleEditDepartment = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedDepartment = {
      name: editName,
    };

    dispatch(updateDepartment(departmentToEdit.id, updatedDepartment)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchDepartmentsData();
          handleEditModalClose();
        } else {
          setModalErrors(response.payload.errors);
          setModalErrorMessage(response.payload.message);
        }

        setEditLoading(false);
      }
    );
  };

  const handleDeleteDepartment = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteDepartment(departmentToDelete.id)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
      } else {
        setErrorMessage(response.payload.message);
      }

      fetchDepartmentsData();
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
        <h2 className="me-auto">Départements</h2>

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
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.name}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditClick(department)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(department)}
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
          <Modal.Title>Créer un département</Modal.Title>
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
              onClick={handleCreateDepartment}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le département</Modal.Title>
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
              onClick={handleEditDepartment}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer le département</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer ce département ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteDepartment}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Department;
