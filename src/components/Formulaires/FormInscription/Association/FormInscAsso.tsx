import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./FormInscAsso.css";

interface IFormInscrAssoProps {
    openFormAsso: boolean
    setOpenFormAsso: React.Dispatch<React.SetStateAction<boolean>>
}

function FormInscAsso ({openFormAsso, setOpenFormAsso}: IFormInscrAssoProps) {
    return (
        <form className={openFormAsso ? "inscriptionFormAsso active" : "inscriptionFormAsso"} action="inscription" method="post">
            <button type="button" className="closeButton" onClick={()=>setOpenFormAsso(false)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            
            <legend>Inscription : Association</legend>

            <label htmlFor="nameAssociationAsso" id="labelNameAssociationAsso">Association *</label>
            <input type="text" name="nameAssociationAsso" id="nameAssociationAsso" />

            <label htmlFor="nameRepresentativeAsso" id="labelNameRepresentativeAsso">Représentant *</label>
            <input type="text" name="nameRepresentativeAsso" id="nameRepresentativeAsso" />

            <label htmlFor="addressAsso" id="labelAddressAsso">Adresse *</label>
            <input type="text" name="addressAsso" id="addressAsso" />

            <label htmlFor="postalCodeAsso" id="labelPostalCodeAsso">Code Postal *</label>
            <input type="number" name="postalCodeAsso" id="postalCodeAsso" />

            <label htmlFor="cityAsso" id="labelCityAsso">Ville *</label>
            <input type="text" name="cityAsso" id="cityAsso" />

            <label htmlFor="phoneAsso" id="labelPhoneAsso">Téléphone *</label>
            <input type="tel" name="phoneAsso" id="phoneAsso" />

            <label htmlFor="emailAsso" id="labelEmailAsso">Mail *</label>
            <input type="email" name="emailAsso" id="emailAsso" />

            <label htmlFor="numberRnaAsso" id="labelNumberRnaAsso">Numéro RNA *</label>
            <input type="text" name="numberRnaAsso" id="numberRnaAsso" />

            <label htmlFor="passwordAsso" id="labelPasswordAsso">Mot de Passe *</label>
            <input type="password" name="passwordAsso" id="passwordAsso" />

            <label htmlFor="confimPasswordAsso" id="labelConfimPasswordAsso">Confirmation du mot de passe *</label>
            <input type="password" name="confimPasswordAsso" id="confimPasswordAsso" />

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default FormInscAsso;