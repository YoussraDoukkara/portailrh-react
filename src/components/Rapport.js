import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllReports } from "../actions/report";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Report = (props) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [date, setDate] = useState(currentDate);
  const [reports, setReports] = useState([]);

  const dispatch = useDispatch();

  const fetchAllReportsData = async () => {
    setShowLoadingSpinner(true)
    setReports([]);
    const response = await dispatch(fetchAllReports(date, props.status));
    if (response.payload.success) {
      setReports(response.payload.data.reports);
    }
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchAllReportsData();
  }, [props.status]);

  const handleDateChange = async () => {
    setCurrentDate(date);
    fetchAllReportsData();
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <h2 className="text-nowrap">
          {(() => {
            switch (props.status) {
              case "present":
                return "Rapport de présences";
              case "absence":
                return "Rapport d'absences";
              case "late":
                return "Rapport de retards";
              case "leave":
                return "Rapport de congés";
              case "rest":
                return "Rapport de repos";
              default:
                return "";
            }
          })()}
        </h2>

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
            Go
          </Button>
        </InputGroup>
      </Stack>

      <Row className="justify-content-md-center">
        <Col>
          <Table bgcolor="white" striped bordered hover>
            <thead>
              <tr>
                <th>Employé</th>
                <th>Équipe</th>
                <th>CIN</th>
                <th>Numéro d'immatriculation</th>
                <th>Numéro de paie</th>
                <th>Horaire</th>
                {props.status === "late" || props.status === "present" ? (
                  <>
                    <th>Arrivée</th>
                    <th>Départ</th>
                    <th>Pause</th>
                    <th>Reprise</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>
                    {report.employee.user.first_name}{" "}
                    {report.employee.user.last_name}
                  </td>
                  <td>{report.employee.team.name}</td>
                  <td>{report.employee.id_number}</td>
                  <td>{report.employee.registration_number}</td>
                  <td>{report.employee.payroll_number}</td>
                  <td>{report.time ? report.time.name : null}</td>
                  {props.status === "late" || props.status === "present" ? (
                    <>
                      <td>{report.check_in}</td>
                      <td>{report.check_out}</td>
                      <td>{report.break_in}</td>
                      <td>{report.break_out}</td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Report;
