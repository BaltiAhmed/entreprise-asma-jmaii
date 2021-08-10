import Actualite from "../components/actualite"
import Carrousel from "../components/carrousel"
import Secteur from "../components/secteur"

const Home = () => {
  return (
    <div>
        <Carrousel/>
        <Secteur/>
        <Actualite/>
    </div>
  );
};

export default Home;
