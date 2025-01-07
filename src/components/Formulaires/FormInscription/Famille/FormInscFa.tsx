import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./FormInscFa.css";
import { IFormDataFamily } from "../../../../@types/family";
import { IUser } from "../../../../@types/user";
import APIUser from "../../../../services/api/user";
import Toast from "../../../Toast/Toast";
import validForm from "../../../../utils/validForm";
import { useAuth } from "../../../AuthContext/AuthContext";

interface IFormInscrFaProps {
    openFormFa: boolean
    setOpenFormFa: React.Dispatch<React.SetStateAction<boolean>>
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function FormInscrFa ({openFormFa, setOpenFormFa, setUser}: IFormInscrFaProps) {
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [succesMessage, setSuccesMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
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
        setErrorFields((prevFields) => prevFields.filter(field => field !== name && field !== `family.${name}`));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const missingRequiredFields = validForm.validateRequiredFields(formData, "family");
        if (missingRequiredFields) {
            setErrorMessage(missingRequiredFields.message);
            setErrorFields(missingRequiredFields.fields);
            return;
        }

        const fieldFormatsError = validForm.validateFieldFormats(formData);
        if (fieldFormatsError && (fieldFormatsError.fileds.length! >0 || fieldFormatsError.messageString !== "")) {
            setErrorMessage(fieldFormatsError.messageString);
            setErrorFields(fieldFormatsError.fileds)
            return;
        }

        const passwordMatchError = validForm.validatePasswordMatch(formData);
        if (passwordMatchError) {
            setErrorMessage(passwordMatchError);
            setErrorFields(["password", "confirmPassword"])
            return;
        }

        const dataToSubmit = validForm.prepareDataForSubmission(formData);

        try {
            const response = await APIUser.createUser(dataToSubmit!);
           console.log(response);
           
            if (response.data.token) {
                login(response.data.token)
                localStorage.setItem("user_id", response.data.userFamily.id);
                setUser(response.data.userFamily);
                setSuccesMessage("Votre inscription a été effectuée avec succès !");
                setErrorMessage("");
                setErrorFields([]);
                setFormData({
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
                })
                setTimeout(() => {
                    navigate("/mon-espace/mon-profil");
                }, 1000);
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                if(error?.response?.data?.message) {
                   return setErrorMessage(error.response.data.message)
                }
            }
            setErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
    };

    return (
        <form className={openFormFa ? "inscriptionFormFa active" : "inscriptionFormFa"} method="post" onSubmit={handleSubmit}>
            <button type="button" className="closeButton"
                onClick={()=>{setOpenFormFa(false); setErrorFields([]); setFormData({firstname: "",
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

            <label className={errorFields.includes("lastname")? "errorFields" : ""} htmlFor="lastnameFa" id="labelLastnameFa">Nom *</label>
            <input className={errorFields.includes("lastname")? "errorFields" : ""} type="text" name="lastname" id="lastnameFa" autoComplete="family-name" value={formData.lastname} onChange={handleChange}/>
            
            <label className={errorFields.includes("firstname")? "errorFields" : ""} htmlFor="firstnameFa" id="labelFirstnameFa">Prénom *</label>
            <input className={errorFields.includes("firstname")? "errorFields" : ""} type="text" name="firstname" id="firstnameFa" autoComplete="given-name" value={formData.firstname} onChange={handleChange}/>

            <label className={errorFields.includes("family.address")? "errorFields" : ""} htmlFor="addressFa" id="labelAddressFa">Adresse *</label>
            <input className={errorFields.includes("family.address")? "errorFields" : ""} type="text" name="address" id="addressFa" autoComplete="on" value={formData.family.address} onChange={handleChange}/>

            <label className={errorFields.includes("family.postal_code")? "errorFields" : ""} htmlFor="postalCodeFa" id="labelPostalCodeFa">Code Postal *</label>
            <input className={errorFields.includes("family.postal_code")? "errorFields" : ""} type="number" name="postal_code" autoComplete="on" id="postalCodeFa" value={formData.family.postal_code} onChange={handleChange}/>

            <label className={errorFields.includes("family.city")? "errorFields" : ""} htmlFor="cityFa" id="labelCityFa">Ville *</label>
            <input className={errorFields.includes("family.city")? "errorFields" : ""} type="text" name="city" id="cityFa" autoComplete="on" value={formData.family.city} onChange={handleChange}/>

            <label className={errorFields.includes("family.phone")? "errorFields" : ""} htmlFor="phoneFa" id="labelPhoneFa">Téléphone *</label>
            <input className={errorFields.includes("family.phone")? "errorFields" : ""} type="tel" name="phone" id="phoneFa" autoComplete="tel-national" value={formData.family.phone} onChange={handleChange}/>

            <label className={errorFields.includes("email")? "errorFields" : ""} htmlFor="emailFa" id="labelEmailFa">Mail *</label>
            <input className={errorFields.includes("email")? "errorFields" : ""} type="email" name="email" id="emailFa"  autoComplete="email" value={formData.email} onChange={handleChange}/>

            <label className={errorFields.includes("password")? "errorFields" : ""} htmlFor="passwordFa" id="labelPasswordFa">Mot de Passe *</label>
            <div className={errorFields.includes("password")? "errorFields divInputPassword" : "divInputPassword"} id="divInputPasswordFa">
                <input className="infoInput" type={showPassword ? "text" : "password"} name="password" id="passwordFa" autoComplete="off" value={formData.password} onChange={handleChange}/>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={()=>{showPassword ? setShowPassword(false) : setShowPassword(true)}} />
            </div>

            <label className={errorFields.includes("confirmPassword")? "errorFields" : ""} htmlFor="confirmPasswordFa" id="labelConfirmPasswordFa">Confirmation du mot de passe *</label>
            <div className={errorFields.includes("confirmPassword")? "errorFields divInputPassword" : "divInputPassword"} id="divInputConfirmPasswordFa">
                <input className="infoInput" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPasswordFa" autoComplete="off" value={formData.confirmPassword} onChange={handleChange}/>
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={()=>{showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true)}} />
            </div>


            {succesMessage && <Toast setToast={setSuccesMessage} message={succesMessage} type="success"/>}
            {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type="error"/>}

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default FormInscrFa;