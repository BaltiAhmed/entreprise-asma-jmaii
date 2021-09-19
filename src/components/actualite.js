import { Card } from "react-bootstrap";

const Actualite = () => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
    >
      <h1>Actualité</h1>
      <div style={{ display: "inline-flex", width: "100%" }}>
        <Card bg="primary" style={{ width: "50%", height: "250px" }}>
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>primary Card Title </Card.Title>
            <Card.Text>
              Nouveau job en 2021 : Comment Quentin Maggi a retrouvé un poste
              chez Gault & Millau et augmenté son salaire de 30%
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg="primary" style={{ width: "50%", height: "250px" }}>
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>primary Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default Actualite;
