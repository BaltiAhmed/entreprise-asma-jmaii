import React, { useState, useContext } from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/entreprise/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }

      auth.login(responsedata.entreprise._id, responsedata.token,responsedata.entreprise);
      setShow(false);
      window.location.href = "http://localhost:3000";
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Button variant="outline-light" onClick={handleShow}>
        login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <Form onSubmit={submit}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer email"
                required
                name="email"
                onChange={onchange}
              />
            </Form.Group>

            <Form.Group controlId="formGridPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                required
                name="password"
                onChange={onchange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to="/signup">
            <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={handleClose}>
              Créé un compte
            </Accordion.Toggle>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Login;
