import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchLeaveAbsenceRequest,
} from "../actions/leaveAbsenceRequest";
import {
    fetchLeaveAbsenceRequestComments,
    createLeaveAbsenceRequestComment,
} from "../actions/leaveAbsenceRequestComment";
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
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
} from "@fortawesome/free-solid-svg-icons";

const LeaveAbsenceRequestView = () => {
    const { id } = useParams();

    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [leaveAbsenceRequestCommentShowLoadingSpinner, setLeaveAbsenceRequestCommentShowLoadingSpinner] = useState(true);

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};

    const [leaveAbsenceRequest, setLeaveAbsenceRequest] = useState([]);
    const [leaveAbsenceRequestComments, setLeaveAbsenceRequestComments] = useState([]);
    const [leaveAbsenceRequestCommentsTotalItems, setLeaveAbsenceRequestCommentsTotalItems] = useState(0);
    const [leaveAbsenceRequestCommentsItemsPerPage, setLeaveAbsenceRequestCommentsItemsPerPage] = useState(0);
    const [leaveAbsenceRequestCommentsCurrentPage, setLeaveAbsenceRequestCommentsCurrentPage] = useState(1);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [createLeaveAbsenceRequestCommentErrors, setCreateLeaveAbsenceRequestCommentErrors] = useState([]);
    const [createLeaveAbsenceRequestCommentErrorMessage, setCreateLeaveAbsenceRequestCommentErrorMessage] = useState("");
    const [createLeaveAbsenceRequestCommentSuccessMessage, setCreateLeaveAbsenceRequestCommentSuccessMessage] = useState("");

    const [createLeaveAbsenceRequestCommentBody, setCreateLeaveAbsenceRequestCommentBody] = useState("");
    const [createLeaveAbsenceRequestCommentAttachments, setCreateLeaveAbsenceRequestCommentAttachments] = useState(null);

    const [createLeaveAbsenceRequestCommentLoading, setCreateLeaveAbsenceRequestCommentLoading] = useState(false);

    const dispatch = useDispatch();

    const handleCreateLeaveAbsenceRequestComment = () => {
        setCreateLeaveAbsenceRequestCommentLoading(true);

        setCreateLeaveAbsenceRequestCommentSuccessMessage("");
        setCreateLeaveAbsenceRequestCommentErrorMessage("");
        setCreateLeaveAbsenceRequestCommentErrors("");

        const createdLeaveAbsenceRequestComment = {
            body: createLeaveAbsenceRequestCommentBody,
            attachments: createLeaveAbsenceRequestCommentAttachments,
        };

        dispatch(createLeaveAbsenceRequestComment(id, createdLeaveAbsenceRequestComment)).then(
            (response) => {
                if (response.payload.success) {
                    setCreateLeaveAbsenceRequestCommentSuccessMessage(response.payload.message);
                    fetchLeaveAbsenceRequestCommentsData();

                    setCreateLeaveAbsenceRequestCommentBody("");
                    setCreateLeaveAbsenceRequestCommentAttachments(null);
                } else {
                    setCreateLeaveAbsenceRequestCommentErrors(response.payload.errors);
                    setCreateLeaveAbsenceRequestCommentErrorMessage(response.payload.message);
                }

                setCreateLeaveAbsenceRequestCommentLoading(false);
            }
        );
    };

    const fetchLeaveAbsenceRequestData = async () => {
        setShowLoadingSpinner(true)
        await dispatch(fetchLeaveAbsenceRequest(id)).then((response) => {
            if (response.payload.success) {
                setLeaveAbsenceRequest(
                    response.payload.data.leave_absence_request
                );
            } else {
                setErrorMessage(response.payload.message);
            }
        });
        setShowLoadingSpinner(false)
    };

    useEffect(() => {
        fetchLeaveAbsenceRequestData();
    }, []);

    const leaveAbsenceRequestCommentsHandlePageChange = (pageNumber) => {
        setLeaveAbsenceRequestCommentsCurrentPage(pageNumber);
    };

    const fetchLeaveAbsenceRequestCommentsData = async () => {
        setLeaveAbsenceRequestCommentShowLoadingSpinner(true)
        await dispatch(fetchLeaveAbsenceRequestComments(id, leaveAbsenceRequestCommentsCurrentPage)).then((response) => {
            if (response.payload.success) {
                setLeaveAbsenceRequestComments(
                    response.payload.data.leave_absence_request_comments.data
                );
                setLeaveAbsenceRequestCommentsTotalItems(response.payload.data.leave_absence_request_comments.total);
                setLeaveAbsenceRequestCommentsItemsPerPage(response.payload.data.leave_absence_request_comments.per_page);
            } else {
                setCreateLeaveAbsenceRequestCommentErrorMessage(response.payload.message);
            }
        });
        setLeaveAbsenceRequestCommentShowLoadingSpinner(false)
    };

    useEffect(() => {
        fetchLeaveAbsenceRequestCommentsData();
    }, [leaveAbsenceRequestCommentsCurrentPage]);

    if (showLoadingSpinner === true) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <>
            <Stack className="mb-3" direction="horizontal" gap={3}>
                <h2 className="me-auto">Demande de congé n° {leaveAbsenceRequest.id}</h2>
            </Stack>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Row className="justify-content-md-center">
                <Col>
                    <Table bgcolor="white" striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Raison</th>
                                <td>
                                    {leaveAbsenceRequest.reason == 'illness' ? (
                                        <Badge bg="info">Maladie</Badge>
                                    ) : leaveAbsenceRequest.status == 'mission' ? (
                                        <Badge bg="info">Mission</Badge>
                                    ) : (
                                        <Badge bg="info">Autre</Badge>
                                    )}
                                </td>
                            </tr>
                            {(user.role === "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && (
                                <tr>
                                    <th>Employé</th>
                                    <td>
                                        {leaveAbsenceRequest.employee.user.first_name}{" "}
                                        {leaveAbsenceRequest.employee.user.last_name}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <th>Corps</th>
                                <td>
                                    {leaveAbsenceRequest.body}
                                </td>
                            </tr>
                            <tr>
                                <th>Commence à</th>
                                <td>{leaveAbsenceRequest.starts_at}</td>
                            </tr>
                            <tr>
                                <th>Fini à</th>
                                <td>{leaveAbsenceRequest.ends_at}</td>
                            </tr>
                            <tr>
                                <th>Approuvé à</th>
                                <td>{leaveAbsenceRequest.approved_at}</td>
                            </tr>
                            <tr>
                                <th>Rejeté à</th>
                                <td>{leaveAbsenceRequest.rejected_at}</td>
                            </tr>
                            <tr>
                                <th>Statut</th>
                                <td>
                                    {leaveAbsenceRequest.approved_at ? (
                                        <Badge bg="success">Approuvé</Badge>
                                    ) : leaveAbsenceRequest.rejected_at ? (
                                        <Badge bg="danger">Rejeté</Badge>
                                    ) : (
                                        <Badge bg="info">En attente</Badge>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Stack className="mb-3" direction="horizontal" gap={3}>
                <h3 className="me-auto">Pièces jointes</h3>
            </Stack>

            <Row className="justify-content-md-center">
                <Col>
                    <Table bgcolor="white" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveAbsenceRequest.attachments.map((attachment) => (
                                <tr key={attachment.id}>
                                    <td>{attachment.name}</td>
                                    <td>
                                        <a className="btn btn-primary btn-sm" href={attachment.original_url} target="_blank" download>
                                            Télécharger
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Stack className="mb-3" direction="horizontal" gap={3}>
                <h3 className="me-auto">Commentaires</h3>
            </Stack>

            {leaveAbsenceRequestCommentShowLoadingSpinner === true ? (
                <LoadingSpinner />
            ) : (
                <>
                    {leaveAbsenceRequestComments.map((leaveAbsenceRequestComment) => (
                        <Card className="mb-4">
                            <Card.Body>
                                <h5 className="mb-0">
                                    {leaveAbsenceRequestComment.employee.user.first_name}{" "}
                                    {leaveAbsenceRequestComment.employee.user.last_name}
                                </h5>
                                <div className="mb-3">
                                    <span className="text-muted">{leaveAbsenceRequestComment.created_at}</span>
                                </div>
                                <p>{leaveAbsenceRequestComment.body}</p>

                                <Stack className="mb-3" direction="horizontal" gap={3}>
                                    <h6 className="me-auto">Pièces jointes</h6>
                                </Stack>

                                <ListGroup>
                                    {leaveAbsenceRequestComment.attachments.map((attachment) => (
                                        <ListGroup.Item><a href={attachment.original_url} target="_blank" download>
                                            <FontAwesomeIcon icon={faDownload} /> {attachment.name}
                                        </a></ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}

                    <Form className="mb-4">
                        <Card>
                            <Card.Header>
                                <Card.Title>Ajouter un commentaire</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {Object.values(createLeaveAbsenceRequestCommentErrors).map((error, index) => (
                                    <Alert key={index} variant="danger">
                                        {error[0]}
                                    </Alert>
                                ))}

                                {createLeaveAbsenceRequestCommentErrorMessage && <Alert variant="danger">{createLeaveAbsenceRequestCommentErrorMessage}</Alert>}

                                {createLeaveAbsenceRequestCommentSuccessMessage && <Alert variant="success">{createLeaveAbsenceRequestCommentSuccessMessage}</Alert>}

                                <Form.Group className="mb-3">
                                    <Form.Label>Corps</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: "100px" }}
                                        value={createLeaveAbsenceRequestCommentBody}
                                        onChange={(e) => setCreateLeaveAbsenceRequestCommentBody(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Pièces jointes</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setCreateLeaveAbsenceRequestCommentAttachments(e.target.files)}
                                        multiple
                                    />
                                </Form.Group>
                            </Card.Body>

                            <Card.Footer>
                                <Button
                                    variant="primary"
                                    onClick={handleCreateLeaveAbsenceRequestComment}
                                    disabled={createLeaveAbsenceRequestCommentLoading}
                                >
                                    {createLeaveAbsenceRequestCommentLoading ? "Ajout en cours..." : "Ajouter"}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Form>

                    <PaginationComponent
                        totalItems={leaveAbsenceRequestCommentsTotalItems}
                        itemsPerPage={leaveAbsenceRequestCommentsItemsPerPage}
                        currentPage={leaveAbsenceRequestCommentsCurrentPage}
                        onPageChange={leaveAbsenceRequestCommentsHandlePageChange}
                    />
                </>
            )}
        </>
    );
};

export default LeaveAbsenceRequestView;
