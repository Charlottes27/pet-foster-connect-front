import "./Card.css"
import photo from "../../asset/animal.webp"

function Card () {
    return (
        <article className="card" style={{border: "3px solid var(--blue-color)"}}>
            <div className="sectionCardImg">
                <img src={photo} alt="animal" className="animalPhoto"/>
            </div>
            <div className="sectionCardText">
                <p><span>Nom :</span> Cacahuète</p>
                <p><span>Espèce :</span> Oiseau</p>
                <p><span>Localisation :</span> Paris</p>
            </div>
        </article>
    );
};

export default Card;