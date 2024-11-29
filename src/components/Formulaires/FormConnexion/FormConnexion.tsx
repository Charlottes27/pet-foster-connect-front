import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./FormConexxion.css";
import APISignin from "../../../services/api/signin";
import { IUser } from "../../../@types/user";
import { useAuth } from "../../AuthContext/AuthContext";
import Toast from "../../Toast/Toast";

interface IFormConnexionProps {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function FormConnexion ({setUser}: IFormConnexionProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await APISignin.signin({email, password});
            setUser(response.data.user)

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user_id", response.data.user_id);

                login(response.data.token)
            }

            navigate("/")
        } catch (error) {
            setErrorMessage("Erreur lors de la connexion. Vérifiez vos identifiants.");
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <form className="connexionForm" action="connexion" method="get" onSubmit={handleSubmit}>
            <legend>Connexion</legend>
            <label htmlFor="email">Identifiant</label>
            <input type="email" name="email" id="email" value={email} 
                placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" 
                placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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