import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDocumentCategories,
  createDocumentCategory,
  updateDocumentCategory,
  deleteDocumentCategory,
} from "../actions/documentCategory";
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

const DocumentCategory = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [documentCategories, setDocumentCategories] = useState([]);
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
  const [documentCategoryToDelete, setDocumentCategoryToDelete] = useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [documentCategoryToEdit, setDocumentCategoryToEdit] = useState(null);
  const [editName, setEditName] = useState("");

  const dispatch = useDispatch();

  const fetchDocumentCategoriesData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchDocumentCategories(currentPage)).then((response) => {
      if (response.payload.success) {
        setDocumentCategories(response.payload.data.document_categories.data);
        setTotalItems(response.payload.data.document_categories.total);
        setItemsPerPage(response.payload.data.document_categories.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchDocumentCategoriesData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (documentCategory) => {
    setDocumentCategoryToDelete(documentCategory);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (documentCategory) => {
    setCreateModalShow(true);
  };

  const handleEditClick = (documentCategory) => {
    setDocumentCategoryToEdit(documentCategory);
    setEditName(documentCategory.name);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setDocumentCategoryToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateName("");
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setDocumentCategoryToEdit(null);
    setEditName("");
    setEditModalShow(false);
  };

  const handleCreateDocumentCategory = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdDocumentCategory = {
      name: createName,
    };

    dispatch(createDocumentCategory(createdDocumentCategory)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchDocumentCategoriesData();
        handleCreateModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setCreateLoading(false);
    });
  };

  const handleEditDocumentCategory = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedDocumentCategory = {
      name: editName,
    };

    dispatch(updateDocumentCategory(documentCategoryToEdit.id, updatedDocumentCategory)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchDocumentCategoriesData();
        handleEditModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setEditLoading(false);
    });
  };

  const handleDeleteDocumentCategory = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteDocumentCategory(documentCategoryToDelete.id)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
      } else {
        setErrorMessage(response.payload.message);
      }

      fetchDocumentCategoriesData();
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
        <h2 className="me-auto">Catégories de documents</h2>

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
              {documentCategories.map((documentCategory) => (
                <tr key={documentCategory.id}>
                  <td>{documentCategory.id}</td>
                  <td>{documentCategory.name}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditClick(documentCategory)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(documentCategory)}
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
          <Modal.Title>Créer une catégorie de documents</Modal.Title>
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
              onClick={handleCreateDocumentCategory}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la catégorie de documents</Modal.Title>
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
              onClick={handleEditDocumentCategory}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la catégorie de documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer cette catégorie de documents ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteDocumentCategory}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentCategory;
