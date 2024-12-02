import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./FormInscAsso.css";
import { IFormDataAssociation } from "../../../../@types/association";
import APIUser from "../../../../services/api/user";
import Toast from "../../../Toast/Toast";
import validForm from "../../../../utils/validForm";
import { useAuth } from "../../../AuthContext/AuthContext";

interface IFormInscrAssoProps {
    openFormAsso: boolean
    setOpenFormAsso: React.Dispatch<React.SetStateAction<boolean>>
}

function FormInscAsso ({openFormAsso, setOpenFormAsso}: IFormInscrAssoProps) {
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [succesMessage, setSuccesMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<IFormDataAssociation>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        association: {
          representative: "",
          rna_number: "",
          address: "",
          postal_code: "",
          city: "",
          phone: "",
        },
    });
console.log(formData);


    const navigate = useNavigate();
    const {login} = useAuth();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (["representative", "rna_number", "address", "postal_code", "city", "phone"].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                association: {
                    ...prevData.association,
                    [name]: value,
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
        setErrorFields((prevFields) => prevFields.filter(field => field !== name && field !== `association.${name}`));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const missingRequiredFields = validForm.validateRequiredFields(formData, "association");
        if (missingRequiredFields) {
            setErrorMessage(missingRequiredFields.message);
            setErrorFields(missingRequiredFields.fields);
            return;
        }

        const fieldFormatsError = validForm.validateFieldFormats(formData);
        if (fieldFormatsError) {
            console.log(fieldFormatsError.fileds);
            
            setErrorMessage(fieldFormatsError.message);
            setErrorFields(fieldFormatsError.fileds)
            return;
        }

        const passwordMatchError = validForm.validatePasswordMatch(formData);
        if (passwordMatchError) {
            setErrorMessage(passwordMatchError);
            return;
        }

        const dataToSubmit = validForm.prepareDataForSubmission(formData);

        try {
            const response = await APIUser.createUser(dataToSubmit)

            if (response.data.token) {
                login(response.data.token)
                localStorage.setItem("user_id", response.data.user_id)
                setSuccesMessage("Votre inscription a été effectuée avec succès !");
                setErrorMessage("");
                setErrorFields([]);
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    association: {
                        representative: "",
                        rna_number: "",
                        address: "",
                        postal_code: "",
                        city: "",
                        phone: "",
                    },
                })
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error?.response?.data?.message) {
                   return setErrorMessage(error.response.data.message )
                }
                if(error?.response?.data.error === 'rna_number must be unique') {
                    return setErrorMessage("N° RNA déjà utilisé")
                }
            }
            setErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
    };

    return (
        <form className={openFormAsso ? "inscriptionFormAsso active" : "inscriptionFormAsso"} method="post" onSubmit={handleSubmit}>
            <button type="button" className="closeButton"
                onClick={()=>{setOpenFormAsso(false); setErrorFields([]); setFormData({firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    association: {
                        representative: "",
                        rna_number: "",
                        address: "",
                        postal_code: "",
                        city: "",
                        phone: "",
                    },})}}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            
            <legend>Inscription : Association</legend>

            <label className={errorFields.includes("association.representative")? "errorFields" : ""} htmlFor="nameAssociationAsso" id="labelNameAssociationAsso">Association *</label>
            <input className={errorFields.includes("association.representative")? "errorFields" : ""} type="text" name="representative" id="nameAssociationAsso" autoComplete="organization-title" value={formData.association.representative} onChange={handleChange}/>

            <label className={errorFields.includes("association.rna_number")? "errorFields" : ""} htmlFor="numberRnaAsso" id="labelNumberRnaAsso">Numéro RNA *</label>
            <input className={errorFields.includes("association.rna_number")? "errorFields" : ""} type="text" name="rna_number" id="numberRnaAsso" autoComplete="off" value={formData.association.rna_number} onChange={handleChange}/>

            <label className={errorFields.includes("lastname")? "errorFields" : ""} htmlFor="lastnameRepresentativeAsso" id="labelLastnameRepresentativeAsso">Nom du représentant *</label>
            <input className={errorFields.includes("lastname")? "errorFields" : ""} type="text" name="lastname" id="lastnameRepresentativeAsso" autoComplete="family-name" value={formData.lastname} onChange={handleChange}/>

            <label className={errorFields.includes("firstname")? "errorFields" : ""} htmlFor="firstnameRepresentativeAsso" id="labelFirstnameRepresentativeAsso">Prénom du représentant *</label>
            <input className={errorFields.includes("firstname")? "errorFields" : ""} type="text" name="firstname" id="firstnameRepresentativeAsso" autoComplete="given-name" value={formData.firstname} onChange={handleChange}/>

            <label className={errorFields.includes("association.address")? "errorFields" : ""} htmlFor="addressAsso" id="labelAddressAsso">Adresse *</label>
            <input className={errorFields.includes("association.address")? "errorFields" : ""} type="text" name="address" id="addressAsso" autoComplete="off"  value={formData.association.address} onChange={handleChange}/>

            <label className={errorFields.includes("association.postal_code")? "errorFields" : ""} htmlFor="postalCodeAsso" id="labelPostalCodeAsso">Code Postal *</label>
            <input className={errorFields.includes("association.postal_code")? "errorFields" : ""} type="number" name="postal_code" id="postalCodeAsso" autoComplete="off"  value={formData.association.postal_code} onChange={handleChange}/>

            <label className={errorFields.includes("association.city")? "errorFields" : ""} htmlFor="cityAsso" id="labelCityAsso">Ville *</label>
            <input className={errorFields.includes("association.city")? "errorFields" : ""} type="text" name="city" id="cityAsso" autoComplete="off"  value={formData.association.city} onChange={handleChange}/>

            <label className={errorFields.includes("association.phone")? "errorFields" : ""}  htmlFor="phoneAsso" id="labelPhoneAsso">Téléphone *</label>
            <input className={errorFields.includes("association.phone")? "errorFields" : ""}  type="tel" name="phone" id="phoneAsso" autoComplete="tel-national" value={formData.association.phone} onChange={handleChange}/>

            <label className={errorFields.includes("email")? "errorFields" : ""} htmlFor="emailAsso" id="labelEmailAsso">Mail *</label>
            <input className={errorFields.includes("email")? "errorFields" : ""} type="email" name="email" id="emailAsso" autoComplete="email" value={formData.email} onChange={handleChange}/>

            <label className={errorFields.includes("password")? "errorFields" : ""} htmlFor="passwordAsso" id="labelPasswordAsso">Mot de Passe *</label>
            <input className={errorFields.includes("password")? "errorFields" : ""} type="password" name="password" id="passwordAsso" autoComplete="off" value={formData.password} onChange={handleChange}/>

            <label className={errorFields.includes("confirmPassword")? "errorFields" : ""} htmlFor="confimPasswordAsso" id="labelConfimPasswordAsso">Confirmation du mot de passe *</label>
            <input className={errorFields.includes("confirmPassword")? "errorFields" : ""} type="password" name="confirmPassword" id="confimPasswordAsso" autoComplete="off" value={formData.confirmPassword} onChange={handleChange}/>

            {succesMessage && <Toast setToast={setSuccesMessage} message={succesMessage} type="success"/>}
            {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type="error"/>}

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default FormInscAsso;