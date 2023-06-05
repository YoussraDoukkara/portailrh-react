import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Routes, Route, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logout } from "./actions/auth";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import User from "./components/User";
import Designation from "./components/Designation";
import Department from "./components/Department";
import Team from "./components/Team";
import Employee from "./components/Employee";
import Time from "./components/Time";
import Timesheet from "./components/Timesheet";
import Attendance from "./components/Attendance";
import LeaveAbsenceRequest from "./components/LeaveAbsenceRequest";
import LeaveAbsenceRequestView from "./components/LeaveAbsenceRequestView";
import Rapport from "./components/Rapport";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDashboard,
  faUsers,
  faClock,
  faSignature,
  faFile,
  faDownload,
  faIdBadge,
  faUserFriends,
  faProjectDiagram
} from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import DocumentCategory from "./components/DocumentCategory";
import Document from "./components/Document";
import {
  fetchAllDocumentCategories,
} from "./actions/documentCategory";
import LoadingSpinner from "./components/LoadingSpinner";
import DownloadReport from "./components/DownloadReport";

import './App.scss';

function App() {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const [documentCategories, setDocumentCategories] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchDocumentCategoriesData = async () => {
    setShowLoadingSpinner(true)
    if (isLoggedIn) {
      await dispatch(fetchAllDocumentCategories()).then((response) => {
        if (response.payload.success) {
          setDocumentCategories(response.payload.data.document_categories.data);
        }
      });
    }
    setShowLoadingSpinner(false)
  };

  useEffect(() => {
    fetchDocumentCategoriesData();
  }, [isLoggedIn]);

  const handleLogout = async (e) => {
    e.preventDefault();

    await dispatch(logout());

    navigate("/auth/login");
  };

  if (showLoadingSpinner === true) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="main-wrapper main-wrapper-responsive-lg">
            {isLoggedIn && (
              <>
                <Navbar className="main-header" expand="lg" bg="primary" variant="dark">
                  <Navbar.Brand title="React-Bootstrap" href="/" className="d-block d-lg-none text-success fw-bold">PortailRH</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      {isLoggedIn && (
                        <>
                          <NavDropdown
                            title={(
                              <>
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                {user.first_name + " " + user.last_name}
                              </>
                            )}
                            id="basic-nav-dropdown"
                          >
                            <NavDropdown.Item href="#" onClick={handleLogout}>
                              Déconnexion
                            </NavDropdown.Item>
                          </NavDropdown>
                        </>
                      )}
                      {!isLoggedIn && (
                        <>
                          <NavLink to="/auth/login">
                            Connexion
                          </NavLink>
                        </>
                      )}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <SidebarMenu
                  expand="lg"
                  hide="md"
                  bg="primary"
                  variant="dark"
                >
                  <SidebarMenu.Collapse>
                    <SidebarMenu.Header>
                      <SidebarMenu.Brand className="text-white fw-bold">
                        PortailRH
                      </SidebarMenu.Brand>
                      <SidebarMenu.Toggle />
                    </SidebarMenu.Header>
                    <SidebarMenu.Body>
                      <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link as={NavLink} to="/dashboard">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faDashboard} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                          <SidebarMenu.Nav.Title>
                            Tableau de bord
                          </SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>
                      </SidebarMenu.Nav>
                      {user.role == "admin" && (
                        <>
                          <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Link as={NavLink} to="/users">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faUsers} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                              <SidebarMenu.Nav.Title>
                                Utilisateurs
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                          </SidebarMenu.Nav>
                        </>
                      )}
                      {(user.role == "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && (
                        <>
                          <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Link as={NavLink} to="/employees">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faUsers} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                              <SidebarMenu.Nav.Title>
                                Employés
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                          </SidebarMenu.Nav>
                        </>
                      )}
                      {user.role == "admin" && (
                        <>
                          <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Link as={NavLink} to="/timesheets">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faClock} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                              <SidebarMenu.Nav.Title>
                                Feuilles de temps
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                          </SidebarMenu.Nav>
                          <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Link as={NavLink} to="/attendances">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faSignature} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                              <SidebarMenu.Nav.Title>
                                Pointages
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                          </SidebarMenu.Nav>
                        </>
                      )}
                      <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Link as={NavLink} to="/leave-absence-requests">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faFile} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                          <SidebarMenu.Nav.Title>
                            Demandes de congé
                          </SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>
                      </SidebarMenu.Nav>
                      <SidebarMenu.Sub>
                        <SidebarMenu.Sub.Toggle>
                          <SidebarMenu.Nav.Icon />
                          <SidebarMenu.Nav.Title>
                            Documents
                          </SidebarMenu.Nav.Title>
                        </SidebarMenu.Sub.Toggle>
                        <SidebarMenu.Sub.Collapse>
                          {documentCategories.map((documentCategory) => (
                            <SidebarMenu.Nav>
                              <SidebarMenu.Nav.Link as={NavLink} to={`/documents/categories/${documentCategory.id}/documents`}>
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faFile} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                                <SidebarMenu.Nav.Title>
                                  {documentCategory.name}
                                </SidebarMenu.Nav.Title>
                              </SidebarMenu.Nav.Link>
                            </SidebarMenu.Nav>
                          ))}
                        </SidebarMenu.Sub.Collapse>
                      </SidebarMenu.Sub>
                      {user.role == "admin" && (
                        <>
                          <SidebarMenu.Sub>
                            <SidebarMenu.Sub.Toggle>
                              <SidebarMenu.Nav.Icon />
                              <SidebarMenu.Nav.Title>
                                Rapports
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Sub.Toggle>
                            <SidebarMenu.Sub.Collapse>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/rapports/presents">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faFile} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Présences
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/rapports/absences">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faFile} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Absences
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink} to="/rapports/lates">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faFile} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Retards
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/rapports/leaves">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faFile} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Congés
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink} to="/rapports/rests">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faFile} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Repos
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink} to="/rapports/download">
                          <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faDownload} className="text-white" />
                          </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Générer et télécharger
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                            </SidebarMenu.Sub.Collapse>
                          </SidebarMenu.Sub>
                          <SidebarMenu.Sub>
                            <SidebarMenu.Sub.Toggle>
                              <SidebarMenu.Nav.Icon />
                              <SidebarMenu.Nav.Title>
                                Taxonomies
                              </SidebarMenu.Nav.Title>
                            </SidebarMenu.Sub.Toggle>
                            <SidebarMenu.Sub.Collapse>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/taxonomies/designations">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faIdBadge} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Désignations
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/taxonomies/departments">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faProjectDiagram} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Départements
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/taxonomies/teams">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faUserFriends} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Équipes
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/taxonomies/times">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faClock} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Horaires
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                              <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link as={NavLink}
                                  to="/taxonomies/documents/categories">
                                  <SidebarMenu.Nav.Icon>
                                    <FontAwesomeIcon icon={faFile} className="text-white" />
                                  </SidebarMenu.Nav.Icon>
                                  <SidebarMenu.Nav.Title>
                                    Catégories de documents
                                  </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                              </SidebarMenu.Nav>
                            </SidebarMenu.Sub.Collapse>
                          </SidebarMenu.Sub>
                        </>
                      )}
                    </SidebarMenu.Body>
                  </SidebarMenu.Collapse>
                </SidebarMenu>
              </>
            )}
            <div className="main-container container-fluid">
              <Container className="py-4">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Navigate to="/dashboard" replace />
                    }
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  {isLoggedIn && user.role === "admin" && (
                    <>
                      <Route
                        exact
                        path="/users"
                        element={
                          <ProtectedRoute>
                            <User />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/taxonomies/designations"
                        element={
                          <ProtectedRoute>
                            <Designation />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/taxonomies/departments"
                        element={
                          <ProtectedRoute>
                            <Department />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/taxonomies/teams"
                        element={
                          <ProtectedRoute>
                            <Team />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/taxonomies/documents/categories"
                        element={
                          <ProtectedRoute>
                            <DocumentCategory />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  )}
                  {isLoggedIn && (user.role === "admin" || (user.employee && (user.employee.is_department_head || user.employee.is_team_head))) && (
                    <>
                      <Route
                        exact
                        path="/employees"
                        element={
                          <ProtectedRoute>
                            <Employee />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  )}
                  {isLoggedIn && user.role === "admin" && (
                    <>
                      <Route
                        exact
                        path="/taxonomies/times"
                        element={
                          <ProtectedRoute>
                            <Time />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/timesheets"
                        element={
                          <ProtectedRoute>
                            <Timesheet />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/attendances"
                        element={
                          <ProtectedRoute>
                            <Attendance />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  )}
                  <Route
                    exact
                    path="/leave-absence-requests"
                    element={
                      <ProtectedRoute>
                        <LeaveAbsenceRequest />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/leave-absence-requests/:id"
                    element={
                      <ProtectedRoute>
                        <LeaveAbsenceRequestView />
                      </ProtectedRoute>
                    }
                  />
                  {isLoggedIn && (
                    <>
                      <Route
                        path="/documents/categories/:documentCategoryId/documents"
                        element={
                          <ProtectedRoute>
                            <Document />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/presents"
                        element={
                          <ProtectedRoute>
                            <Rapport status="present" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/absences"
                        element={
                          <ProtectedRoute>
                            <Rapport status="absence" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/lates"
                        element={
                          <ProtectedRoute>
                            <Rapport status="late" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/leaves"
                        element={
                          <ProtectedRoute>
                            <Rapport status="leave" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/rests"
                        element={
                          <ProtectedRoute>
                            <Rapport status="rest" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/rapports/download"
                        element={
                          <ProtectedRoute>
                            <DownloadReport />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  )}
                </Routes>
              </Container>
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/auth/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
