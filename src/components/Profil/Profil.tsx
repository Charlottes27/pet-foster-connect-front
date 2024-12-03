import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import userIcon from "../../asset/logo/user.svg"

import "./Profil.css";

function Profil () {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    return (
        <section className="ProfilUser">
            
            
            <form action="" className="formProfilUser">
            <h1 className="headerProfilUser">Mes informations</h1>
                <div className="profilImgWrap">
                    <img src="#" alt="Photo de profil" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = userIcon;
                    }}/>
                </div>

                {isInfoEditMode && (
                    <div className="editProfilImgWrap">
                        <label htmlFor="profile_photo">Insérer une nouvelle photo</label>
                        <input type="file" name="profile_photo" id="profile_photo" accept="image/*" />
                        <button className="deleteProfilImg" type="button">Supprimer ma photo</button>
                    </div>
                )}
                <div className="fieldsWrap">
                    <label htmlFor="lastname" className="infoLabel" id="labelLastname">Nom</label>
                    <input type="text" name="lastname" id="lastname" className="infoInput"/>

                    <label htmlFor="firstname" className="infoLabel" id="labelFirstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" className="infoInput" />

                    <label htmlFor="addess" className="infoLabel" id="labelAddess">Adresse</label>
                    <input type="text" name="addess" id="addess" className="infoInput" />

                    <label htmlFor="postal_code" className="infoLabel" id="labelPostal_code">Code Postal</label>
                    <input type="text" name="postal_code" id="postal_code" className="infoInput" />

                    <label htmlFor="city" className="infoLabel" id="labelCity">Ville</label>
                    <input type="text" name="city" id="city" className="infoInput" />

                    <label htmlFor="phone" className="infoLabel" id="labelPhone">Téléphone</label>
                    <input type="text" name="phone" id="phone" className="infoInput" />

                    <label htmlFor="email" className="infoLabel" id="labelEmail">Mail</label>
                    <input type="text" name="email" id="email" className="infoInput" />

                    <h2>Situation de mon foyer</h2>

                    <div className="garden" id="garden">
                        <p>Avez-vous un jardin ?</p>
                        <label htmlFor="gardenTrue" className="infoLabel">Oui</label>
                        <input type="checkbox" name="garden" id="gardenTrue" className="infoInput" />
                        <label htmlFor="gardenFalse" className="infoLabel">Non</label>
                        <input type="checkbox" name="gardenn" id="gardenFalse" className="infoInput" />
                    </div>

                    <div className="children" id="children">
                        <p>Avez-vous des enfants ?</p>
                        <label htmlFor="childrenTrue" className="infoLabel">Oui</label>
                        <input type="checkbox" name="number_of_children" id="childrenTrue" className="infoInput" />
                        <label htmlFor="childrenFalse" className="infoLabel">Non</label>
                        <input type="checkbox" name="number_of_children" id="childrenFalse" className="infoInput" />
                    </div>

                    <div className="animals" id="animals">
                        <label htmlFor="number_of_animals" className="infoLabel">Combien d'animaux avez-vous ?</label>
                        <input type="number" name="number_of_animals" id="number_of_animals" className="infoInput" min={0}/>
                    </div>

                    <label htmlFor="description" className="infoLabel" id="labelDescription">Description</label>
                    <textarea name="description" id="description" className="infoInput"/>
                </div>

                <div className="buttonsWrap">
                    {isInfoEditMode ? (<>
                        <button type="submit" className="btnModifProfile first">
                        <FontAwesomeIcon icon={faCheck} /> Valider la modification
                        </button>

                        <button type="reset" className="btnModifProfile second">
                        <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                        </button>
                    </>) : (<>
                        <button type="button" className="btnModifProfile first" onClick={() => setIsInfoEditMode(!isInfoEditMode)}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Modifier les informations
                        </button>
                        <button type="button" className="btnModifProfile second" onClick={() => setIsPasswordEditMode(!isPasswordEditMode)} >
                            <FontAwesomeIcon icon={faPenToSquare} /> Modifier le mot de passe
                        </button>
                        <button type="button"className="btnModifProfile last web" onClick={() => setIsConfirmModalOpen(true)} >
                            <FontAwesomeIcon icon={faTrashCan} /> Supprimer le compte
                        </button>
                    </>)}
                </div>
            </form>
        </section>
    );
};

export default Profil;