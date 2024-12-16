import "./HomePage.css";
import dogWithHisFoster from "../../asset/u6873831692_photo_of_a_shelter_dog_got_his_new_home_family_--_7c7bc55e-7f8d-484c-b468-2b63a692ad63_0.webp"
import dogAndCat from "../../asset/u6873831692_million_of_shelters_dogs_and_cats_are_waiting_to__d8c4d590-7ceb-49e2-a450-96009ef39e5d_2.webp"
import logo from "../../asset/logo/PetFoster-Logo.png"

import { useMediaQuery } from "react-responsive";

function HomePage () {
    const smallDestop = useMediaQuery({query: "(min-width: 1024px)"});    

    return (
        <main>
            <article className="articleHomePage">
                <h2 className="titleHomePage">Offrez un foyer temporaire, changez une vie </h2>
                <img src={dogWithHisFoster} alt="Chien heureux d'aller en famille d'accueil" className="imgHomePage firstImg"/>
                <p className="textHomePage firstText">Pet Foster Connect est là pour aider associations et familles d'accueil à réunir leurs forces pour les animaux en attentes d'un foyer définitif. Notre mission est de créer un réseau solide et bienveillant, où chaque animal trouve non seulement un refuge temporaire, mais aussi l'amour et l'attention dont il a besoin pour s'épanouir.</p>
                {smallDestop && <img src={logo} alt="logo pet foster connect" className="logo"/>}
                <p className="textHomePage secondText">Nous croyons fermement que chaque animal mérite une seconde chance. C'est pourquoi nous travaillons sans relâche pour sensibiliser le public à l'importance du bénévolat et du soutien aux refuges. Grâce à notre plateforme, nous facilitons la mise en relation entre les familles d'accueil et les associations, garantissant ainsi que chaque animal reçoit les soins appropriés et l'environnement sûr qu'il mérite.</p>
                <p className="textHomePage thirdText">Rejoignez-nous dans cette aventure ! Que vous soyez une famille prête à accueillir un animal ou une association cherchant des soutiens, chaque geste compte. Ensemble, nous pouvons faire la différence et offrir un avenir meilleur à ces compagnons à quatre pattes.</p>
                <img src={dogAndCat} alt="chien et chat en attentes d'une famille d'accueils" className="imgHomePage secondImg"/>
            </article>
        </main>
    );
};

export default HomePage;