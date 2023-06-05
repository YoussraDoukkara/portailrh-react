import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTimesheets, createTimesheets } from "../actions/timesheet";
import { fetchAllTimes } from "../actions/time";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Timesheet = () => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const [weekNumber, setWeekNumber] = useState(Math.ceil(days / 7));
  const [week, setWeek] = useState(weekNumber);
  const [timesheets, setTimesheets] = useState([]);
  const [times, setTimes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editTimesheet, setEditTimesheet] = useState([]);

  const dispatch = useDispatch();

  const handleTimeIdChange = async (timeId, employee, week, day) => {
    const newData = {
      employee_id: employee.id,
      time_id: timeId,
      week: week,
      day: day,
    };

    const index = editTimesheet.findIndex(
      (data) =>
        data.employee_id === newData.employee_id &&
        data.week === newData.week &&
        data.day === newData.day
    );

    if (index >= 0) {
      editTimesheet[index] = newData;
    } else {
      editTimesheet.push(newData);
    }

    setEditTimesheet(editTimesheet);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors([]);
    setSuccessMessage("");
    setErrorMessage("");

    const updatedTimesheets = {
      timesheets: editTimesheet,
    };

    await dispatch(createTimesheets(updatedTimesheets)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);

        setEditTimesheet([]);
        fetchAllTimesData();
      } else {
        setErrors(response.payload.errors ?? []);
        setErrorMessage(response.payload.message);
      }
    });

    setLoading(false);
  };

  const fetchAllTimesData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllTimes()).then((response) => {
      if (response.payload.success) {
        setTimes(response.payload.data.times.data);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchAllTimesData();
  }, []);

  const fetchAllTimesheetsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllTimesheets(week)).then((response) => {
      if (response.payload.success) {
        setTimesheets(response.payload.data.timesheets);
      }
    });
    setShowLoadingSpinner(false)
  };

  function getDayName(dayNumber) {
    const dayNames = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];

    return dayNames[dayNumber - 1];
  }

  function getDayNumberInMonth(weekNumber, dayNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const firstMondayOfYear = 1 + (8 - (new Date(year, 0, 1).getDay() || 7));
    const dayOfYear =
      firstMondayOfYear + (weekNumber - 1) * 7 + (dayNumber - 1);
    const dayOfMonth = new Date(year, 0, dayOfYear).getDate();
    return dayOfMonth;
  }

  function getMonthName(weekNumber, dayNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const firstMondayOfYear = 1 + (8 - (new Date(year, 0, 1).getDay() || 7));
    const dayOfYear =
      firstMondayOfYear + (weekNumber - 1) * 7 + (dayNumber - 1);
    const monthIndex = new Date(year, 0, dayOfYear).getMonth();
    const monthNames = [
      "Janv",
      "Févr",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sept",
      "Oct",
      "Nov",
      "Déc",
    ];
    return monthNames[monthIndex];
  }

  const handleWeekChange = async () => {
    setShowLoadingSpinner(true)
    setTimesheets([]);
    setWeekNumber(week);
    await dispatch(fetchAllTimesheets(week)).then((response) => {
      if (response.payload.success) {
        setTimesheets(response.payload.data.timesheets);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchAllTimesheetsData();
  }, []);

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <h2 className="text-nowrap">Feuilles de temps</h2>

        <Form.Label className="ms-auto">Semaine</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            value={week}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 1 && value <= 52) {
                setWeek(value);
              }
            }}
            min="1"
            max="52"
          />
          <Button
            className="me-auto"
            variant="primary"
            onClick={handleWeekChange}
          >
            Go
          </Button>
        </InputGroup>

        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Enregistrement en cours..." : "Enregistrer"}
        </Button>
      </Stack>

      {Object.values(errors).map((error, index) => (
        <Alert key={index} variant="danger">
          {error[0]}
        </Alert>
      ))}

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row className="justify-content-md-center">
        <Col>
          <Table bgcolor="white" striped bordered hover>
            <thead>
              <tr>
                <th rowspan="2" className="align-middle text-center">
                  Semaine {weekNumber}
                </th>
                {Array.from({ length: 7 }, (_, index) => (
                  <th className="text-center">
                    {getDayNumberInMonth(weekNumber, index + 1)}-
                    {getMonthName(weekNumber, index + 1)}
                  </th>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 7 }, (_, index) => (
                  <th className="text-center">{getDayName(index + 1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timesheets.map((timesheet) => (
                <tr key={timesheet.id}>
                  <td>
                    {timesheet.employee.user.first_name}{" "}
                    {timesheet.employee.user.last_name}
                  </td>
                  {timesheet.times.map((timesheetTime, index) => (
                    <th>
                      <Form.Group>
                        <Form.Select
                          onChange={(e) =>
                            handleTimeIdChange(
                              e.target.value,
                              timesheet.employee,
                              weekNumber,
                              index + 1
                            )
                          }
                        >
                          <option></option>
                          {times.map((time) => (
                            <option
                              key={
                                time.id +
                                "-" +
                                timesheet.employee +
                                "-" +
                                weekNumber +
                                "-" +
                                index +
                                1
                              }
                              value={time.id}
                              selected={
                                timesheetTime && timesheetTime.id == time.id
                              }
                            >
                              {time.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </th>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Timesheet;
