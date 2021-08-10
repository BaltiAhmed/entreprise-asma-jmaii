import { Carousel } from "react-bootstrap";
import  image1 from '../images/image1.jpg'
import  image2 from '../images/image2.jpg'
import  image4 from '../images/image4.jpg'


const Carrousel = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width={100}
            height={350}
            alt="First slide"
            src={image1}
          />
          <Carousel.Caption>
            <h1> Trouvez le Job de vos rêves !</h1>
            <p>
              <h2>Chercher des offres d'emploi</h2>
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            width={100}
            height={350}
            alt="Third slide"
            src={image2}
          />

          <Carousel.Caption>
            <h1>Trouvez le Job de vos rêves !</h1>
            <p>
              <h2>Chercher des offres d'emploi</h2>
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        
        <Carousel.Item>
          <img
            className="d-block w-100"
            width={100}
            height={350}
            alt="Third slide"
            src={image4}
          />

          <Carousel.Caption>
            <h1>Trouvez le Job de vos rêves !</h1>
            <p>
              <h2>Chercher des offres d'emploi</h2>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carrousel;
