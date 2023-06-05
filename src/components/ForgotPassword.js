import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { send } from "../actions/auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

import './../Login.css';

const ForgotPassword = () => {
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors([]);
    setSuccessMessage("");
    setErrorMessage("");

    await dispatch(send(email)).then((response) => {
      if (response.payload.success) {
        setSuccessMessage(response.payload.message);

        setEmail('');
      } else {
        setErrors(response.payload.errors ?? []);
        setErrorMessage(response.payload.message);
      }
    });

    setLoading(false);
  };

  return (
    <Container className="auth" fluid>
    <Row className="grid-container">
      <Col className="border-end d-none d-lg-block bg" lg={6}>
      </Col>
      <Col className="overflow-auto">
    <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
      <h1 className="text-success fw-bold mb-3">PortailRH</h1>
      <h2 className="fs-6 mb-5">Réinitialisation du mot de passe</h2>
      <div className="w-100 px-5">
            {Object.values(errors).map((error, index) => (
              <Alert key={index} variant="danger">
                {error[0]}
              </Alert>
            ))}

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Envoi du lien de réinitialisation du mot de passe..." : "Envoyer le lien de réinitialisation du mot de passe"}
              </Button>
            </Form>
      </div>
      </div>
      </Col>
    </Row>
    </Container>
  );
};

export default ForgotPassword;
