import {
  Button,
  Col,
  Container,
  Row,
  Card,
} from "react-bootstrap";
import  image1 from '../images/image1.jpg'
import  image2 from '../images/image2.jpg'
import  image4 from '../images/image4.jpg'

const Secteur = () => {
  return (
    <div>
      <Container fluid>
        <h1 className="secteur">
          <b>Les offres d'emploi</b>
        </h1>
        <Row>
          <Col>
            {" "}
            <Card style={{ width: "18rem", marginLeft: "100px" }}>
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>centre d'appel</Card.Title>

                <Button variant="primary">Decouvrir</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card style={{ width: "18rem", marginLeft: "100px" }}>
              <Card.Img variant="top" src={image2} />
              <Card.Body>
                <Card.Title>industrie</Card.Title>

                <Button variant="primary">Decouvrir</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card style={{ width: "18rem", marginLeft: "100px" }}>
              <Card.Img variant="top" src={image4} />
              <Card.Body>
                <Card.Title>technologie</Card.Title>

                <Button variant="primary">Decouvrir</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Secteur;
