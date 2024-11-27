import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./ConnexionPage.css";

function ConnexionPage () {
    const [openFormFa, setOpenFormFa] = useState(false);
    const [openFormAsso, setOpenFormAsso] = useState(false);
    const [closeSection, setCloseSection] = useState(false);

    useEffect(()=>{
        if(openFormAsso || openFormFa) {
            setCloseSection(true)
        }
        if(!openFormAsso && !openFormFa) {
            setCloseSection(false)
        }
    },[openFormAsso, openFormFa])
    

    return (
        <main className="mainConnexion">
                <form className="connexionForm" action="connexion" method="get">
                        <legend>Connexion</legend>
                        <label htmlFor="email">Identifiant</label>
                        <input type="email" name="email" id="email" />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                        <NavLink to={"#"} className="changePassword">Mot de passe oublié?</NavLink>
                        <button type="submit">Se connecter</button>
                </form>

                <div className="separator"></div>

                <section className={closeSection ? "choseInscription close" : "choseInscription"}>
                    <h1>Pas encore de compte?</h1>
                    <ul>
                        <li>
                            <p>Vous souhaitez devenir famille d'accueil</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button" onClick={()=>setOpenFormFa(true)}>Inscription Famille</button>
                        </li>
                        <li>
                            <p>Vous êtes une association protectrice des animaux</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button" onClick={()=>setOpenFormAsso(true)}>Inscription Association</button>
                        </li>
                    </ul>
                </section>

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

        </main>
    )
};

export default ConnexionPage;