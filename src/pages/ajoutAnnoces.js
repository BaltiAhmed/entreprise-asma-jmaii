import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AjoutOffre = (props) => {
  const classes = useStyles();

  const [titre, setTitre] = useState();
  const [Ddebut, setDdebut] = useState();
  const [Dfin, setDfin] = useState();
  const [mission, setmission] = useState();
  const [categorie, setCategorie] = useState();
  const [Aprincipale, setAprincipale] = useState();
  const [description, setdescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext);

  const onchange = (e) => {
    if (e.target.name === "titre") {
      setTitre(e.target.value);
    } else if (e.target.name === "Ddebut") {
      setDdebut(e.target.value);
    } else if (e.target.name === "Dfin") {
      setDfin(e.target.value);
    } else if (e.target.name === "mission") {
      setmission(e.target.value);
    } else if (e.target.name === "categorie") {
      setCategorie(e.target.value);
    } else if (e.target.name === "Aprincipale") {
      setAprincipale(e.target.value);
    } else if (e.target.name === "description") {
      setdescription(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/offre/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: titre,
          Ddebut: Ddebut,
          Dfin: Dfin,
          mission: mission,
          categorie: categorie,
          photo: auth.user.image,
          Aprincipale: Aprincipale,
          description: description,
          entrepriseId: auth.userId,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Offre ajout??.");
      seterror(null);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  placeholder="Titre"
                  name="titre"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Cat??grie</Form.Label>

                <Form.Control
                  name="categorie"
                  onChange={onchange}
                  required
                  as="select"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Mission</Form.Label>
                <Form.Control
                  placeholder="Mission"
                  name="mission"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <TextField
                    id="date"
                    label="Date d??but"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="Ddebut"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <TextField
                    id="date"
                    label="Date de fin"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="Dfin"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Activit?? principale</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="Aprincipale"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AjoutOffre;
