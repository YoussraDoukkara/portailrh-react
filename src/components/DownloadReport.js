import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReportDownload } from "../actions/report";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./LoadingSpinner";

const DownloadReport = () => {
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [date, setDate] = useState(currentDate);
    const [report, setReport] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch();

    const fetchReportDownloadData = async () => {
        setShowLoadingSpinner(true)
        setReport([]);
        const response = await dispatch(fetchReportDownload(date));
        if (response.payload.success) {
            setReport(response.payload.data.report);
        }
        setShowLoadingSpinner(false)
    };

    useEffect(() => {
        fetchReportDownloadData();
    }, []);

    const handleDateChange = async () => {
        setCurrentDate(date);
        fetchReportDownloadData();
    };

    if (showLoadingSpinner === true) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <>
            <Stack className="mb-3" direction="horizontal" gap={3}>
                <h2 className="text-nowrap">Générer et télécharger le rapport</h2>

                <Form.Label className="ms-auto">Date</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                    <Button
                        className="me-auto"
                        variant="primary"
                        onClick={handleDateChange}
                    >
                        Générer
                    </Button>
                </InputGroup>
            </Stack>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Row className="justify-content-md-center">
                <Col>
                    <Card className="mb-4">
                        <Card.Body className="text-center">
                            <p>Le rapport est prêt. Cliquez sur le bouton ci-dessous pour le télécharger.</p>
                            <a className="btn btn-primary btn-lg" href={report.download_url} target="_blank" download>
                                Télécharger
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DownloadReport;
