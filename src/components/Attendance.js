import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAttendances } from "../actions/attendance";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Attendance = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [date, setDate] = useState(currentDate);
  const [attendances, setAttendances] = useState([]);

  const dispatch = useDispatch();

  const fetchAllAttendancesData = async () => {
    setShowLoadingSpinner(true)
    setAttendances([]);
    const response = await dispatch(fetchAllAttendances(date));
    if (response.payload.success) {
      setAttendances(response.payload.data.attendances);
    }
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchAllAttendancesData();
  }, []);

  const handleDateChange = async () => {
    setCurrentDate(date);
    fetchAllAttendancesData();
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <h2 className="text-nowrap">Pointages</h2>

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
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Pause</th>
                <th>Resumption</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.employee.user.first_name} {attendance.employee.user.last_name}</td>
                  <td>{attendance.employee.team.name}</td>
                  <td>{attendance.employee.id_number}</td>
                  <td>{attendance.employee.registration_number}</td>
                  <td>{attendance.employee.payroll_number}</td>
                  <td>{attendance.time ? attendance.time.name : null}</td>
                  <td>{attendance.check_in}</td>
                  <td>{attendance.check_out}</td>
                  <td>{attendance.break_in}</td>
                  <td>{attendance.break_out}</td>
                  <td>
                    {attendance.is_present === true && (<Badge bg="success">Présent</Badge>)}
                    {attendance.is_absent === true && (<Badge bg="danger">Absent</Badge>)}
                    {attendance.is_late === true && (<Badge bg="warning">En retard</Badge>)}
                    {attendance.is_leave === true && (<Badge bg="secondary">Congé</Badge>)}
                    {attendance.is_rest === true && (<Badge bg="secondary">Repos</Badge>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Attendance;