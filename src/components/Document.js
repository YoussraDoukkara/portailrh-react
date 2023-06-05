import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../actions/document";
import {
    fetchAllDocumentCategories,
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
import { useParams } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
} from "@fortawesome/free-solid-svg-icons";

const Document = () => {
    const { documentCategoryId } = useParams();

    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};

    const [documents, setDocuments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [documentCategories, setDocumentCategories] = useState([]);

    const [createLoading, setCreateLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [modalErrors, setModalErrors] = useState([]);
    const [modalErrorMessage, setModalErrorMessage] = useState("");

    const [createModalShow, setCreateModalShow] = useState(false);
    const [createDocumentCategoryId, setCreateDocumentCategoryId] = useState(0);
    const [createName, setCreateName] = useState("");
    const [createAttachments, setCreateAttachments] = useState(null);

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    const [editModalShow, setEditModalShow] = useState(false);
    const [documentToEdit, setDocumentToEdit] = useState(null);
    const [editDocumentCategoryId, setEditDocumentCategoryId] = useState(0);
    const [editName, setEditName] = useState("");
    const [editAttachments, setEditAttachments] = useState(null);

    const dispatch = useDispatch();

    const fetchDocumentsData = async () => {
        setShowLoadingSpinner(true)
        await dispatch(fetchDocuments(documentCategoryId, currentPage)).then((response) => {
            if (response.payload.success) {
                setDocuments(response.payload.data.documents.data);
                setTotalItems(response.payload.data.documents.total);
                setItemsPerPage(response.payload.data.documents.per_page);
            } else {
                setErrorMessage(response.payload.message);
            }
        });
        setShowLoadingSpinner(false)
    };

    const fetchDocumentCategoriesData = async () => {
        setShowLoadingSpinner(true)
        await dispatch(fetchAllDocumentCategories()).then((response) => {
            if (response.payload.success) {
                setDocumentCategories(response.payload.data.document_categories.data);
            }
        });
        setShowLoadingSpinner(false)
    };

    useEffect(() => {
        fetchDocumentsData();
        fetchDocumentCategoriesData();
    }, [documentCategoryId, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteClick = (document) => {
        setDocumentToDelete(document);
        setDeleteModalShow(true);
    };

    const handleCreateClick = (document) => {
        setCreateDocumentCategoryId(documentCategoryId);
        setCreateModalShow(true);
    };

    const handleEditClick = (document) => {
        setEditDocumentCategoryId(documentCategoryId);
        setDocumentToEdit(document);
        setEditName(document.name);
        setEditModalShow(true);
    };

    const handleDeleteModalClose = () => {
        setDocumentToDelete(null);
        setDeleteModalShow(false);
    };

    const handleCreateModalClose = () => {
        setCreateDocumentCategoryId(0);
        setCreateName("");
        setCreateAttachments(null);
        setCreateModalShow(false);
    };

    const handleEditModalClose = () => {
        setDocumentToEdit(null);
        setEditDocumentCategoryId(0);
        setEditName("");
        setEditAttachments(null);
        setEditModalShow(false);
    };

    const handleCreateDocument = () => {
        setCreateLoading(true);

        setModalErrors([]);
        setSuccessMessage("");
        setModalErrorMessage("");

        const createdDocument = {
            documentCategoryId: createDocumentCategoryId,
            name: createName,
            attachments: createAttachments,
        };

        dispatch(createDocument(documentCategoryId, createdDocument)).then((response) => {
            if (response.payload.success) {
                setSuccessMessage(response.payload.message);
                fetchDocumentsData();
                handleCreateModalClose();
            } else {
                setModalErrors(response.payload.errors);
                setModalErrorMessage(response.payload.message);
            }

            setCreateLoading(false);
        });
    };

    const handleEditDocument = () => {
        setEditLoading(true);

        setModalErrors([]);
        setSuccessMessage("");
        setModalErrorMessage("");

        const updatedDocument = {
            documentCategoryId: editDocumentCategoryId,
            name: editName,
            attachments: editAttachments,
        };

        dispatch(updateDocument(documentCategoryId, documentToEdit.id, updatedDocument)).then((response) => {
            if (response.payload.success) {
                setSuccessMessage(response.payload.message);
                fetchDocumentsData();
                handleEditModalClose();
            } else {
                setModalErrors(response.payload.errors);
                setModalErrorMessage(response.payload.message);
            }

            setEditLoading(false);
        });
    };

    const handleDeleteDocument = () => {
        setDeleteLoading(true);

        setSuccessMessage("");
        setErrorMessage("");

        dispatch(deleteDocument(documentCategoryId, documentToDelete.id)).then((response) => {
            if (response.payload.success) {
                setSuccessMessage(response.payload.message);
            } else {
                setErrorMessage(response.payload.message);
            }

            fetchDocumentsData();
            setDeleteLoading(false);
            setDeleteModalShow(false);
        });
    };

    if (showLoadingSpinner === true) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <>
            <Stack className="mb-3" direction="horizontal" gap={3}>
                <h2 className="me-auto">Documents</h2>

                {user.role === "admin" && (
                    <Button variant="primary" onClick={() => handleCreateClick()}>
                    Créer
                </Button>
                )}
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
                            {documents.map((document) => (
                                <tr key={document.id}>
                                    <td>{document.id}</td>
                                    <td>{document.name}</td>
                                    <td>
                                        <Stack direction="horizontal" gap={2}>
    <DropdownButton size="sm" id="dropdown-basic-button" title="Télécharger">
    {document.attachments.map((attachment) => (
      <Dropdown.Item href={attachment.original_url} target="_blank" download><FontAwesomeIcon icon={faDownload} /> {attachment.name.length > 50 ? attachment.name.slice(0, 50) + '...' : attachment.name}</Dropdown.Item>
      ))}
    </DropdownButton>
                {user.role === "admin" && (
                    <>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleEditClick(document)}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(document)}
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
                    <Modal.Title>Créer un document</Modal.Title>
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
                            <Form.Label>Catégorie de documents</Form.Label>
                            <Form.Select
                                onChange={(e) => setCreateDocumentCategoryId(e.target.value)}
                                disabled
                            >
                                <option>Choisirune catégorie de documents</option>
                                {documentCategories.map((documentCategory) => (
                                    <option key={documentCategory.id} value={documentCategory.id}
                                    selected={documentCategory.id == createDocumentCategoryId}>
                                        {documentCategory.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
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
                            onClick={handleCreateDocument}
                            disabled={createLoading}
                        >
                            {createLoading ? "Création en cours..." : "Créer"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={editModalShow} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le document</Modal.Title>
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
                            <Form.Label>Catégorie de documents</Form.Label>
                            <Form.Select
                                onChange={(e) => setEditDocumentCategoryId(e.target.value)}
                                disabled
                            >
                                <option>Choisir une catégorie de documents</option>
                                {documentCategories.map((documentCategory) => (
                                    <option
                                        key={documentCategory.id}
                                        value={documentCategory.id}
                                        selected={documentCategory.id == editDocumentCategoryId}
                                    >
                                        {documentCategory.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
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
                        <Button variant="secondary" onClick={handleEditModalClose}>
                            Annuler
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleEditDocument}
                            disabled={editLoading}
                        >
                            {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer le document</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment supprimer cette document?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteDocument}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? "Suppression en cours..." : "Supprimer"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Document;
