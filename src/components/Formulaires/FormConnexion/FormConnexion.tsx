import { NavLink } from "react-router-dom";

import "./FormConexxion.css"

function FormConnexion () {
    return (
        <form className="connexionForm" action="connexion" method="get">
            <legend>Connexion</legend>
            <label htmlFor="email">Identifiant</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" />
            <NavLink to={"#"} className="changePassword">Mot de passe oublié?</NavLink>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default FormConnexion;