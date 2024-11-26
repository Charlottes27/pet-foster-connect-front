import { NavLink } from "react-router-dom";

import "./ConnexionPage.css";

function ConnexionPage () {
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

                <section className="choseInscription">
                    <h1>Pas encore de compte?</h1>
                    <ul>
                        <li>
                            <p>Vous souhaitez devenir famille d'accueil</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button">Inscription Famille</button>
                        </li>
                        <li>
                            <p>Vous êtes une association protectrice des animaux</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button">Inscription Association</button>
                        </li>
                    </ul>
                </section>

                {/* <form className="inscriptionFormFa" action="inscription" method="post">
                    <legend>Inscription : Famille d'accueil</legend>

                    <label htmlFor="lastname" id="labelLastname">Nom *</label>
                    <input type="text" name="lastname" id="lastname" />
                    
                    <label htmlFor="firstname" id="labelFirstname">Prénom *</label>
                    <input type="text" name="firstname" id="firstname" />

                    <label htmlFor="address" id="labelAddress">Adresse *</label>
                    <input type="text" name="address" id="address" />

                    <label htmlFor="postalCode" id="labelPostalCode">Code Postal *</label>
                    <input type="number" name="postalCode" id="postalCode" />

                    <label htmlFor="city" id="labelCity">Ville *</label>
                    <input type="text" name="city" id="city" />

                    <label htmlFor="phone" id="labelPhone">Téléphone *</label>
                    <input type="tel" name="phone" id="phone" />

                    <label htmlFor="email" id="labelEmail">Mail *</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="password" id="labelPassword">Mot de Passe *</label>
                    <input type="password" name="password" id="password" />

                    <label htmlFor="confimPassword" id="labelConfimPassword">Confirmation du mot de passe *</label>
                    <input type="password" name="confimPassword" id="confimPassword" />

                    <button type="submit">S'inscrire</button>
                </form> */}

                {/* <form className="inscriptionFormAsso" action="inscription" method="post">
                    <legend>Inscription : Association</legend>

                    <label htmlFor="nameAssociation" id="labelNameAssociation">Association *</label>
                    <input type="text" name="nameAssociation" id="nameAssociation" />

                    <label htmlFor="nameRepresentative" id="labelNameRepresentative">Représentant *</label>
                    <input type="text" name="nameRepresentative" id="nameRepresentative" />

                    <label htmlFor="address" id="labelAddress">Adresse *</label>
                    <input type="text" name="address" id="address" />

                    <label htmlFor="postalCode" id="labelPostalCode">Code Postal *</label>
                    <input type="number" name="postalCode" id="postalCode" />

                    <label htmlFor="city" id="labelCity">Ville *</label>
                    <input type="text" name="city" id="city" />

                    <label htmlFor="phone" id="labelPhone">Téléphone *</label>
                    <input type="tel" name="phone" id="phone" />

                    <label htmlFor="email" id="labelEmail">Mail *</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="numberRna" id="labelNumberRna">Numéro RNA *</label>
                    <input type="text" name="numberRna" id="numberRna" />

                    <label htmlFor="password" id="labelPassword">Mot de Passe *</label>
                    <input type="password" name="password" id="password" />

                    <label htmlFor="confimPassword" id="labelConfimPassword">Confirmation du mot de passe *</label>
                    <input type="password" name="confimPassword" id="confimPassword" />

                    <button type="submit">S'inscrire</button>
                </form> */}

        </main>
    )
};

export default ConnexionPage;