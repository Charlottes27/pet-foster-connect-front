import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./FormInscFa.css";
import { IFormDataFamily } from "../../../../@types/family";
import APIUser from "../../../../services/api/user";
import Toast from "../../../Toast/Toast";

interface IFormInscrFaProps {
    openFormFa: boolean
    setOpenFormFa: React.Dispatch<React.SetStateAction<boolean>>
}

function FormInscrFa ({openFormFa, setOpenFormFa}: IFormInscrFaProps) {
    const [succesMessage, setSuccesMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IFormDataFamily>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        family: {
            address: "",
            postal_code: "",
            city: "",
            phone: "",
        },
    });

console.log(formData);

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if (["address", "postal_code", "city", "phone"].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                family: {
                    ...prevData.family,
                    [name]: value,
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("la confimation du mot de passe doit être identique au mot de passe");
            return;
        }

        const {confirmPassword, ...dataToSubmit} = formData
    
        try {
            const response = await APIUser.createUser(dataToSubmit)
           
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user_id", response.data.user_id)
                setSuccesMessage("Votre inscription a été effectuée avec succès !");
                setErrorMessage("");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            
        }
    };

    return (
        <form className={openFormFa ? "inscriptionFormFa active" : "inscriptionFormFa"} action="inscription" method="post" onSubmit={handleSubmit}>
            <button type="button" className="closeButton"
                onClick={()=>{setOpenFormFa(false); setFormData({firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    family: {
                        address: "",
                        postal_code: "",
                        city: "",
                        phone: "",
            },})}}>
                <FontAwesomeIcon icon={faXmark} />
            </button>

            <legend>Inscription : Famille d'accueil</legend>

            <label htmlFor="lastname" id="labelLastnameFa">Nom *</label>
            <input type="text" name="lastname" id="lastnameFa" value={formData.lastname} onChange={handleChange}/>
            
            <label htmlFor="firstname" id="labelFirstnameFa">Prénom *</label>
            <input type="text" name="firstname" id="firstnameFa" value={formData.firstname} onChange={handleChange}/>

            <label htmlFor="address" id="labelAddressFa">Adresse *</label>
            <input type="text" name="address" id="addressFa" value={formData.family.address} onChange={handleChange}/>

            <label htmlFor="postal_Code" id="labelPostalCodeFa">Code Postal *</label>
            <input type="number" name="postal_code" id="postalCodeFa" value={formData.family.postal_code} onChange={handleChange}/>

            <label htmlFor="city" id="labelCityFa">Ville *</label>
            <input type="text" name="city" id="cityFa" value={formData.family.city} onChange={handleChange}/>

            <label htmlFor="phone" id="labelPhoneFa">Téléphone *</label>
            <input type="tel" name="phone" id="phoneFa" value={formData.family.phone} onChange={handleChange}/>

            <label htmlFor="email" id="labelEmailFa">Mail *</label>
            <input type="email" name="email" id="emailFa" value={formData.email} onChange={handleChange}/>

            <label htmlFor="password" id="labelPasswordFa">Mot de Passe *</label>
            <input type="password" name="password" id="passwordFa" value={formData.password} onChange={handleChange}/>

            <label htmlFor="confirmPassword" id="labelConfirmPasswordFa">Confirmation du mot de passe *</label>
            <input type="password" name="confirmPassword" id="confirmPasswordFa" value={formData.confirmPassword} onChange={handleChange}/>

            {succesMessage && <Toast setToast={setSuccesMessage} message={succesMessage} type="success"/>}
            {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type="error"/>}

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default FormInscrFa;