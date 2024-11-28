import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./FormInscFa.css"

interface IFormInscrFaProps {
    openFormFa: boolean
    setOpenFormFa: React.Dispatch<React.SetStateAction<boolean>>
}

function FormInscrFa ({openFormFa, setOpenFormFa}: IFormInscrFaProps) {
    return (
        <form className={openFormFa ? "inscriptionFormFa active" : "inscriptionFormFa"} action="inscription" method="post">
            <button type="button" className="closeButton" onClick={()=>setOpenFormFa(false)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>

            <legend>Inscription : Famille d'accueil</legend>

            <label htmlFor="lastnameFa" id="labelLastnameFa">Nom *</label>
            <input type="text" name="lastnameFa" id="lastnameFa" />
            
            <label htmlFor="firstnameFa" id="labelFirstnameFa">Prénom *</label>
            <input type="text" name="firstnameFa" id="firstnameFa" />

            <label htmlFor="addressFa" id="labelAddressFa">Adresse *</label>
            <input type="text" name="addressFa" id="addressFa" />

            <label htmlFor="postalCodeFa" id="labelPostalCodeFa">Code Postal *</label>
            <input type="number" name="postalCodeFa" id="postalCodeFa" />

            <label htmlFor="cityFa" id="labelCityFa">Ville *</label>
            <input type="text" name="cityFa" id="cityFa" />

            <label htmlFor="phoneFa" id="labelPhoneFa">Téléphone *</label>
            <input type="tel" name="phoneFa" id="phoneFa" />

            <label htmlFor="emailFa" id="labelEmailFa">Mail *</label>
            <input type="email" name="emailFa" id="emailFa" />

            <label htmlFor="passwordFa" id="labelPasswordFa">Mot de Passe *</label>
            <input type="password" name="passwordFa" id="passwordFa" />

            <label htmlFor="confimPasswordFa" id="labelConfimPasswordFa">Confirmation du mot de passe *</label>
            <input type="password" name="confimPasswordFa" id="confimPasswordFa" />

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default FormInscrFa;