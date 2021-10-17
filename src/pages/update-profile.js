import React, { useState, useEffect, useRef,useContext } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import axios from "axios";
import {Authcontext} from '../context/auth-context'

const UpdateProfile = (props) => {
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();



  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nom, setNom] = useState();
  const [nom_entreprise, setNom_entreprise] = useState();
  const [address, setAddress] = useState();
  const [tel, setTel] = useState();
  const [site_web, setSite_web] = useState();
  const [secteur, setSecteur] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "nom_entreprise") {
      setNom_entreprise(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "site_web") {
      setSite_web(e.target.value);
    } else if (e.target.name === "secteur") {
      setSecteur(e.target.value);
    } else if (e.target.name === "adresse") {
      setAddress(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const auth = useContext(Authcontext)

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", File);
      formData.append("nom", nom);
      formData.append("nom_entreprise", nom_entreprise);
      formData.append("site_web", site_web);
      formData.append("adresse", address);
      formData.append("description", description);
      formData.append("secteur", secteur);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("tel", tel);
      let responce = await axios.patch(
        `http://localhost:5000/api/entreprise/${auth.userId}`,
        formData
      );

      
      setsuccess('votre compte est modifiée.')
      
    } catch (err) {
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <div>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler}
                    style={{ marginTop: "20px" }}
                  >
                    PICK IMAGE
                  </Button>
                </div>
                {!isValid && <p></p>}
              </div>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    name="nom"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Nom entreprise</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom entreprise"
                    name="nom_entreprise"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  name="adresse"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  placeholder="Téléphone"
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Site web</Form.Label>
                  <Form.Control
                    placeholder="www.site.com"
                    name="site_web"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Secteur</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    name="secteur"
                    onChange={onchange}
                    required
                  >
                    <option>Choose...</option>
                    <option>Industrie</option>
                    <option>centre d'appel...</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

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

export default UpdateProfile;
