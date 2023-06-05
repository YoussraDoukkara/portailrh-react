import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../actions/employee";
import { fetchAllUsers } from "../actions/user";
import { fetchAllDesignations } from "../actions/designation";
import { fetchAllDepartments } from "../actions/department";
import { fetchAllTeams } from "../actions/team";
import PaginationComponent from "./PaginationComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "./LoadingSpinner";

const Employee = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const [employees, setEmployees] = useState([]);
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

  const [users, setUsers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);

  const [createModalShow, setCreateModalShow] = useState(false);
  const [createUserId, setCreateUserId] = useState(0);
  const [createDesignationId, setCreateDesignationId] = useState(0);
  const [createDepartmentId, setCreateDepartmentId] = useState(0);
  const [createTeamId, setCreateTeamId] = useState(0);
  const [createIdNumber, setCreateIdNumber] = useState("");
  const [createRegistrationNumber, setCreateRegistrationNumber] = useState("");
  const [createPayrollNumber, setCreatePayrollNumber] = useState("");
  const [createIsDepartmentHead, setCreateIsDepartmentHead] = useState(false);
  const [createIsTeamHead, setCreateIsTeamHead] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [editUserId, setEditUserId] = useState(0);
  const [editDesignationId, setEditDesignationId] = useState(0);
  const [editDepartmentId, setEditDepartmentId] = useState(0);
  const [editTeamId, setEditTeamId] = useState(0);
  const [editIdNumber, setEditIdNumber] = useState("");
  const [editRegistrationNumber, setEditRegistrationNumber] = useState("");
  const [editPayrollNumber, setEditPayrollNumber] = useState("");
  const [editIsDepartmentHead, setEditIsDepartmentHead] = useState(false);
  const [editIsTeamHead, setEditIsTeamHead] = useState(false);

  const dispatch = useDispatch();

  const fetchUsersData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllUsers()).then((response) => {
      if (response.payload.success) {
        setUsers(response.payload.data.users.data);
      }
    });
    setShowLoadingSpinner(false)
  };

  const fetchDesignationsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllDesignations()).then((response) => {
      if (response.payload.success) {
        setDesignations(response.payload.data.designations.data);
      }
    });
    setShowLoadingSpinner(false)
  };

  const fetchDepartmentsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllDepartments()).then((response) => {
      if (response.payload.success) {
        setDepartments(response.payload.data.departments.data);
      }
    });
    setShowLoadingSpinner(false)
  };

  const fetchTeamsData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchAllTeams()).then((response) => {
      if (response.payload.success) {
        setTeams(response.payload.data.teams.data);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchUsersData();
    fetchDesignationsData();
    fetchDepartmentsData();
    fetchTeamsData();
  }, []);

  useEffect(() => {
    fetchEmployeesData();
  }, [currentPage]);

  const fetchEmployeesData = async () => {
    setShowLoadingSpinner(true)
    await dispatch(fetchEmployees(currentPage)).then((response) => {
      if (response.payload.success) {
        setEmployees(response.payload.data.employees.data);
        setTotalItems(response.payload.data.employees.total);
        setItemsPerPage(response.payload.data.employees.per_page);
      } else {
        setErrorMessage(response.payload.message);
      }
    });
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchEmployeesData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalShow(true);
  };

  const handleCreateClick = (employee) => {
    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    setCreateModalShow(true);
  };

  const handleEditClick = (employee) => {
    setEmployeeToEdit(employee);
    setEditUserId(employee.user_id);
    setEditDesignationId(employee.designation_id);
    setEditDepartmentId(employee.department_id);
    setEditTeamId(employee.team_id);
    setEditIdNumber(employee.id_number);
    setEditRegistrationNumber(employee.registration_number);
    setEditPayrollNumber(employee.payroll_number);
    setEditIsDepartmentHead(employee.is_department_head);
    setEditIsTeamHead(employee.is_team_head);
    setEditModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setEmployeeToDelete(null);
    setDeleteModalShow(false);
  };

  const handleCreateModalClose = () => {
    setCreateUserId(0);
    setCreateDesignationId(0);
    setCreateDepartmentId(0);
    setCreateTeamId(0);
    setCreateIdNumber("");
    setCreateRegistrationNumber("");
    setCreatePayrollNumber("");
    setCreateIsDepartmentHead(false);
    setCreateIsTeamHead(false);
    setCreateModalShow(false);
  };

  const handleEditModalClose = () => {
    setEmployeeToEdit(null);
    setEditUserId(0);
    setEditDesignationId(0);
    setEditDepartmentId(0);
    setEditTeamId(0);
    setEditIdNumber("");
    setEditRegistrationNumber("");
    setEditPayrollNumber("");
    setEditIsDepartmentHead(false);
    setEditIsTeamHead(false);
    setEditModalShow(false);
  };

  const handleCreateEmployee = () => {
    setCreateLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const createdEmployee = {
      user_id: createUserId,
      designation_id: createDesignationId,
      department_id: createDepartmentId,
      team_id: createTeamId,
      id_number: createIdNumber,
      registration_number: createRegistrationNumber,
      payroll_number: createPayrollNumber,
      is_department_head: createIsDepartmentHead,
      is_team_head: createIsTeamHead,
    };

    dispatch(createEmployee(createdEmployee)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
        fetchEmployeesData();
        handleCreateModalClose();
      } else {
        setModalErrors(response.payload.errors);
        setModalErrorMessage(response.payload.message);
      }

      setCreateLoading(false);
    });
  };

  const handleEditEmployee = () => {
    setEditLoading(true);

    setModalErrors([]);
    setSuccessMessage("");
    setModalErrorMessage("");

    const updatedEmployee = {
      user_id: editUserId,
      designation_id: editDesignationId,
      department_id: editDepartmentId,
      team_id: editTeamId,
      id_number: editIdNumber,
      registration_number: editRegistrationNumber,
      payroll_number: editPayrollNumber,
      is_department_head: editIsDepartmentHead,
      is_team_head: editIsTeamHead,
    };

    dispatch(updateEmployee(employeeToEdit.id, updatedEmployee)).then(
      (response) => {
        if (response.payload.success) {
          setSuccessMessage(response.payload.message);
          fetchEmployeesData();
          handleEditModalClose();
        } else {
          setModalErrors(response.payload.errors);
          setModalErrorMessage(response.payload.message);
        }

        setEditLoading(false);
      }
    );
  };

  const handleDeleteEmployee = () => {
    setDeleteLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    dispatch(deleteEmployee(employeeToDelete.id)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);
      } else {
        setErrorMessage(response.payload.message);
      }

      fetchEmployeesData();
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
        <h2 className="me-auto">Employés</h2>

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
                <th>Désignation</th>
                <th>Département</th>
                <th>Équipe</th>
                <th>CIN</th>
                <th>Numéro d'immatriculation</th>
                <th>Numéro de paie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>
                    {employee.user.first_name} {employee.user.last_name}
                  </td>
                  <td>{employee.designation.name}</td>
                  <td>
                    {employee.department.name}{" "}
                    {employee.is_department_head && (
                      <Badge bg="secondary">Chef de département</Badge>
                    )}
                  </td>
                  <td>
                    {employee.team.name}{" "}
                    {employee.is_team_head && (
                      <Badge bg="secondary">Chef d'équipe</Badge>
                    )}
                  </td>
                  <td>{employee.id_number}</td>
                  <td>{employee.registration_number}</td>
                  <td>{employee.payroll_number}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      {user.role === "admin" && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditClick(employee)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(employee)}
                          >
                            Supprimer
                          </Button></>
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
          <Modal.Title>Créer un employé</Modal.Title>
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
              <Form.Label>Utilisateur</Form.Label>
              <Form.Select onChange={(e) => setCreateUserId(e.target.value)}>
                <option>Choisir un utilisateur</option>
                {users.map(
                  (user) =>
                    !user.employee && (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Désignation</Form.Label>
              <Form.Select
                onChange={(e) => setCreateDesignationId(e.target.value)}
              >
                <option>Choisir une désignation</option>
                {designations.map((designation) => (
                  <option key={designation.id} value={designation.id}>
                    {designation.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Département</Form.Label>
              <Form.Select
                onChange={(e) => setCreateDepartmentId(e.target.value)}
              >
                <option>Choisir un département</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-department-head"
                label="Est le chef de département"
                checked={createIsDepartmentHead}
                onChange={(e) => setCreateIsDepartmentHead(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Équipe</Form.Label>
              <Form.Select onChange={(e) => setCreateTeamId(e.target.value)}>
                <option>Choisir une équipe</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-team-head"
                label="Est le chef d'équipe"
                checked={createIsTeamHead}
                onChange={(e) => setCreateIsTeamHead(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                value={createIdNumber}
                onChange={(e) => setCreateIdNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numéro d'immatriculation</Form.Label>
              <Form.Control
                type="text"
                value={createRegistrationNumber}
                onChange={(e) => setCreateRegistrationNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numéro de paie</Form.Label>
              <Form.Control
                type="text"
                value={createPayrollNumber}
                onChange={(e) => setCreatePayrollNumber(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateEmployee}
              disabled={createLoading}
            >
              {createLoading ? "Création en cours..." : "Créer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'employé</Modal.Title>
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
              <Form.Label>Utilisateur</Form.Label>
              <Form.Select onChange={(e) => setEditUserId(e.target.value)}>
                <option>Choisir un utilisateur</option>
                {employeeToEdit && (
                  <option
                    key={employeeToEdit.user_id}
                    value={employeeToEdit.user_id}
                    selected={employeeToEdit.user_id == editUserId}
                  >
                    {employeeToEdit.user.first_name}{" "}
                    {employeeToEdit.user.last_name}
                  </option>
                )}
                {users.map(
                  (user) =>
                    !user.employee && (
                      <option
                        key={user.id}
                        value={user.id}
                        selected={user.id == editUserId}
                      >
                        {user.first_name} {user.last_name}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Désignation</Form.Label>
              <Form.Select
                onChange={(e) => setEditDesignationId(e.target.value)}
              >
                <option>Choisir une désignation</option>
                {designations.map((designation) => (
                  <option
                    key={designation.id}
                    value={designation.id}
                    selected={designation.id == editDesignationId}
                  >
                    {designation.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Département</Form.Label>
              <Form.Select
                onChange={(e) => setEditDepartmentId(e.target.value)}
              >
                <option>Choisir un département</option>
                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                    selected={department.id == editDepartmentId}
                  >
                    {department.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-department-head"
                label="Est le chef de département"
                checked={editIsDepartmentHead}
                onChange={(e) => setEditIsDepartmentHead(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Équipe</Form.Label>
              <Form.Select onChange={(e) => setEditTeamId(e.target.value)}>
                <option>Choisir une équipe</option>
                {teams.map((team) => (
                  <option
                    key={team.id}
                    value={team.id}
                    selected={team.id == editTeamId}
                  >
                    {team.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is-team-head"
                label="Est le chef d'équipe"
                checked={editIsTeamHead}
                onChange={(e) => setEditIsTeamHead(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                value={editIdNumber}
                onChange={(e) => setEditIdNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numéro d'immatriculation</Form.Label>
              <Form.Control
                type="text"
                value={editRegistrationNumber}
                onChange={(e) => setEditRegistrationNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numéro de paie</Form.Label>
              <Form.Control
                type="text"
                value={editPayrollNumber}
                onChange={(e) => setEditPayrollNumber(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleEditEmployee}
              disabled={editLoading}
            >
              {editLoading ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer cet employé ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteEmployee}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression en cours..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Employee;
