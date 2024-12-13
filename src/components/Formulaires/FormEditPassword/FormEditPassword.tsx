import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

import "./FormEditPassword.css";
import { IUser, IUserOnly } from "../../../@types/user";
import APIFamily from "../../../services/api/family";
import Toast from "../../Toast/Toast";
import valideInput from "../../../utils/isValidInput";
import { IFamilyUser } from "../../../@types/family";

interface IFormEditPasswordProps {
    isPasswordEditMode: boolean
    setIsPasswordEditMode: React.Dispatch<React.SetStateAction<boolean>>
    userData: IUser
}

function FormEditPassword ({isPasswordEditMode, setIsPasswordEditMode, userData}: IFormEditPasswordProps) {
    const [formDataPassword, setFormDataPassword] = useState( {currentPassword:"", newPassword: "", confirmPassword: ""} );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCancel = () => {
        setIsPasswordEditMode(false);
        setFormDataPassword({currentPassword:"", newPassword: "", confirmPassword: ""} );
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormDataPassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formDataPassword.newPassword !== formDataPassword.confirmPassword) {
            setErrorMessage("La confirmation du mot de passe doit être identique au nouveau mot de passe !")
            return;
        }

        if (!valideInput(formDataPassword.newPassword, "strongPassword")) {
            setErrorMessage("Votre mot de passe doit contenir au minimum 8 caractères dont : 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial")
        }

        if (formDataPassword.newPassword === formDataPassword.currentPassword) {
            setErrorMessage("Vous devez choisir un mot de passe différent du mot de passe actuel")
        }

        const userPassword: (IFamilyUser) = {user: {}};

        if (formDataPassword.currentPassword && formDataPassword.newPassword && formDataPassword.confirmPassword) {
            userPassword.user!.currentPassword = formDataPassword.currentPassword;
            userPassword.user!.newPassword = formDataPassword.newPassword;
            userPassword.user!.confirmPassword = formDataPassword.confirmPassword;
        }

        console.log(userPassword);
        

        try {
            const response = await APIFamily.pathFamily(userData.family?.id!, userPassword);
            console.log(response);
            if(response.status === 201) {
                setSuccessMessage("Votre mot de passe à été changé avec succés ! ")
                setTimeout(()=>{setIsPasswordEditMode(false)}, 2000)
            }
            
        } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.data.message === "Le mot de passe actuel est incorrect.") {
                    setErrorMessage(error.response?.data.message)
                }
            }
        }
    };
    
    return (
        <>
            <form onSubmit={handleSubmit} className="formsPassword">
                <div className="infoSubtitle">
                <h4>Changer le mot de passe</h4>
                </div>
                <div className="infoFieldContainer">
                <label className="infoLabel" htmlFor="currentPassword"> Mot de passe actuel</label>
                <div className="divInputPassword">
                    <input className="infoInput" type={showCurrentPassword ? "text" : "password"} name="currentPassword" id="currentPassword"  value={formDataPassword.currentPassword} onChange={handleChangeInput} autoComplete="off" />
                    <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} onClick={()=>{showCurrentPassword ? setShowCurrentPassword(false) : setShowCurrentPassword(true)}} />
                </div>
            
                <label className="infoLabel" htmlFor="newPassword"> Nouveau mot de passe</label>
                <div className="divInputPassword">
                    <input className="infoInput" type={showNewPassword ? "text" : "password"} name="newPassword" id="newPassword" value={formDataPassword.newPassword} onChange={handleChangeInput} autoComplete="off" />
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} onClick={()=>{showNewPassword ? setShowNewPassword(false) : setShowNewPassword(true)}} />
                </div>
                
                <label className="infoLabel" htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                <div className="divInputPassword">
                    <input className="infoInput" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={formDataPassword.confirmPassword} onChange={handleChangeInput} autoComplete="off" />
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={()=>{showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true)}} />
                </div>
                </div>

                <div className="buttonsWrapPassword">
                    <button type="submit" className="btnModifProfile first" >
                        <FontAwesomeIcon icon={faCheck} /> Valider la modification
                    </button>
                    <button type="reset" className="btnModifProfile second" onClick={handleCancel}>
                        <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                    </button>
                </div>
            </form>

            {errorMessage &&
                <Toast message={errorMessage!} type="error" setToast={setErrorMessage} />
            }

            {successMessage &&
                <Toast message={successMessage!} type="success" setToast={setSuccessMessage} />
            }
        </>
      );
};

export default FormEditPassword;