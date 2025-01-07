import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./FormConexxion.css";
import APISignin from "../../../services/api/signin";
import { IUser } from "../../../@types/user";
import { useAuth } from "../../AuthContext/AuthContext";
import Toast from "../../Toast/Toast";

interface IFormConnexionProps {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function FormConnexion ({setUser}: IFormConnexionProps) {
    const [emailForm, setEmailForm] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const {login} = useAuth();

    const email = emailForm.toLocaleLowerCase().trim();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await APISignin.signin({email, password});
            setUser(response.data.user) // C'est ici que l'on renvoie les premières infos du user (email, id, role, id_family, id_asso)

            if (response.data.token) {
                localStorage.setItem("user_id", response.data.user.id);
                login(response.data.token)
            }

            navigate("/mon-espace/mon-profil")
        } catch (error) {
            setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <form className="connexionForm" action="connexion" method="get" onSubmit={handleSubmit}>
            <legend>Connexion</legend>
            <label htmlFor="email">Identifiant</label>
            <input type="email" name="email" id="email" autoComplete="email" required value={emailForm} 
                placeholder="Email" onChange={(e)=>setEmailForm(e.target.value)}/>
            <label htmlFor="password">Mot de passe</label>
            <div className="divInputPassword">
                <input className="infoInput" type={showPassword ? "text" : "password"} name="password" id="password" 
                    placeholder="Mot de passe" autoComplete="off" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={()=>{showPassword ? setShowPassword(false) : setShowPassword(true)}} />
            </div>
            <NavLink to={"#"} className="changePassword">Mot de passe oublié?</NavLink>
            {errorMessage && (
                <Toast
                  setToast={setErrorMessage}
                  message={errorMessage}
                  type="error"
                />
              )}
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default FormConnexion;