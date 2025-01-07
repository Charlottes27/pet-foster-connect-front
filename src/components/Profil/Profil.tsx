import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Profil.css";
import userIcon from "../../asset/logo/user.svg";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Toast from "../Toast/Toast";
import InputsProfilesFa from "./InputsProfile/InputsProfileFa";
import InputsProfilesAsso from "./InputsProfile/InputsProfileAss";
import FormEditPassword from "../Formulaires/FormEditPassword/FormEditPassword";
import { IUser } from "../../@types/user";
import { IFamilyUser } from "../../@types/family";
import { IAssociationUser } from "../../@types/association";
import APIFamily from "../../services/api/family";
import APIAssociation from "../../services/api/associations";
import { useAuth } from "../AuthContext/AuthContext";
import validForm from "../../utils/validForm";

type UserFields = "lastname" | "firstname" | "email";

function Profil () {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [originalDataUser, setOriginalDataUser] =useState< IUser>({
        lastname: '',
        firstname: '',
        email: '',
        family: {
            address: '',
            postal_code: '',
            city: '',
            phone: '',
            garden: false,
            number_of_children: 0,
            number_of_animals: 0,
            description: '',
            profile_photo: '',
            profile_file: undefined,
        },
        association: {
            representative: '',
            rna_number: '',
            address: '',
            postal_code: '',
            city: '',
            phone: '',
            description: '',
            profile_photo: '',
            profile_file: undefined,
        },
    });
    const [formDataUser, setFormDataUser] = useState<IUser>({
        lastname: '',
        firstname: '',
        email: '',
        family: {
            address: '',
            postal_code: '',
            city: '',
            phone: '',
            garden: false,
            number_of_children: 0,
            number_of_animals: 0,
            description: '',
            profile_photo: '',
            profile_file: undefined,
        },
        association: {
            representative: '',
            rna_number: '',
            address: '',
            postal_code: '',
            city: '',
            phone: '',
            description: '',
            profile_photo: '',
            profile_file: undefined,
        },
    });

    const {user, setUser} = useOutletContext<{ user: IUser; setUser: React.Dispatch<React.SetStateAction<IUser | null>>}>();
    const id = user.family?.id || user.association?.id;
    const userType = user.role === "family" ? "family" : "association";

    useEffect(() => {
        if (user) {
            let profileFile: File | null;
            const updatedUser = {...user};
            const photo = user[userType]?.profile_photo;

            if (photo && photo !== "delete") {
                const urlPhoto = ((photo?.startsWith("http") || photo?.startsWith("blob")) ? photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`);
                profileFile = new File([photo], `serverProfilFile-${id}.jpg`, { type : "image/jpeg"})
                
                updatedUser[userType]!.profile_file = profileFile;
                updatedUser[userType]!.profile_photo = urlPhoto;
            } else {
                profileFile = null;
            }

            setOriginalDataUser(updatedUser);
            setFormDataUser(updatedUser);
        }

    }, [user]);


    useEffect(() => {
        return () => {
            if (formDataUser[userType]?.profile_photo?.startsWith('blob:')) {
                URL.revokeObjectURL(formDataUser[userType]!.profile_photo!);
            }
        };
    }, []);

    const navigate = useNavigate();
    const { logout } = useAuth();
        
    const handleClickDeletePhoto = () => {
        setFormDataUser((prevData)=> ({
            ...prevData,
            [userType]:{
                ...prevData[userType]!,
                profile_photo: "delete",
                profile_file: undefined,
            },
        }));
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = event.target;

        if (type === "file") {
            const file = "files" in event.target ? event.target?.files?.[0] : undefined;

            if (file) {
                if (formDataUser[userType]!.profile_photo?.startsWith("blob:")) {
                    URL.revokeObjectURL(formDataUser[userType]!.profile_photo!);
                }

                const previewUrl = URL.createObjectURL(file);

                setFormDataUser((prevData)=> ({
                    ...prevData,
                    [userType]:{
                        ...prevData[userType]!,
                        profile_photo: previewUrl,
                        profile_file:file,
                    },
                }));
            }
        } else {
            setFormDataUser((prevData)=>{
                if (userType === "family") {
                    const isFamilyField = ['address', 'postal_code', 'city', 'phone', 'description', 'number_of_children', 'number_of_animals'].includes(name);
                    const garden = ["garden"].includes(name)
                    
                    if(garden) {
                        if (value === "true") {
                            return {
                                ...prevData,
                                family:{
                                    ...prevData.family!,
                                    ...{[name]: true},
                                }
                            }
                        } else {
                            return {
                                ...prevData,
                                family:{
                                    ...prevData.family!,
                                    ...{[name]: false},
                                }
                            }
                        }
                    }

                    return {
                        ...prevData,
                        ...(isFamilyField ? {} : { [name]: value }),
                        family:{
                            ...prevData.family!,
                            ...(isFamilyField ? { [name]: value } : {}),
                        }
                    }
                } else {
                    const isAssociationField = ['representative', 'rna_number', 'address', 'postal_code', 'city', 'phone', 'description'].includes(name);
                    return {
                        ...prevData,
                        ...(isAssociationField ? {} : { [name]: value }),
                        association:{
                            ...prevData.association!,
                            ...(isAssociationField ? { [name]: value } : {}),
                        }
                    }
                }
            });
        }
        setErrorFields((prevFields) => prevFields.filter(field => field !== name && field !== `user.${name}`));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formSubmit = new FormData(event.target as HTMLFormElement);
        const modifiedFields: Partial<IFamilyUser & IAssociationUser> = {};

        const fieldsUser:UserFields[] = ["lastname", "firstname", "email"];
        fieldsUser.forEach(field => {
            if (formDataUser[field] !== originalDataUser[field]) {
                if (!modifiedFields.user && field) {
                    modifiedFields.user = {};
                }
                modifiedFields.user![field] = formDataUser[field];
            }
        });

        
        if (originalDataUser.family?.id) {
            if (formSubmit.get("address") !== originalDataUser.family?.address) {
                modifiedFields.address = formSubmit.get("address") as string;
            }
    
            if (formSubmit.get("postal_code") !== originalDataUser.family?.postal_code) {
                modifiedFields.postal_code = formSubmit.get("postal_code") as string;
            }
    
            if (formSubmit.get("city") !== originalDataUser.family?.city) {
                modifiedFields.city = formSubmit.get("city") as string;
            }
    
            if (formSubmit.get("phone") !== originalDataUser.family?.phone) {
                modifiedFields.phone = formSubmit.get("phone") as string;
            }
    
            if (formSubmit.get("description") !== originalDataUser.family?.description) {
                modifiedFields.description = formSubmit.get("description") as string;
            }
    
            if (formSubmit.get("garden") !== originalDataUser.family?.garden!.toString()) {
                const gardenValue = formSubmit.get("garden");
                modifiedFields.garden! = gardenValue === "true";
                    // Si gardenValue === "true" alors renvoie le boolean true sinon false
            }
    
            if (formSubmit.get("number_of_animals") !== originalDataUser.family?.number_of_animals?.toString()) {
                const numberOfAnimalsValue = formSubmit.get("number_of_animals");
                if (numberOfAnimalsValue !== null) {
                    modifiedFields.number_of_animals = parseInt(numberOfAnimalsValue as string, 10);
                }
            }
    
            if (formSubmit.get("number_of_children") !== originalDataUser.family?.number_of_children?.toString()) {
                const numberOfChildrenValue = formSubmit.get("number_of_children");
                if (numberOfChildrenValue !== null) {
                    modifiedFields.number_of_children = parseInt(numberOfChildrenValue as string, 10);
                }
            }
        }

        if (originalDataUser.association?.id) {
            if (formSubmit.get("representative") !== originalDataUser.association?.representative) {
                modifiedFields.representative = formSubmit.get("representative") as string;
            }

            if (formSubmit.get("rna_number") !== originalDataUser.association?.rna_number) {
                modifiedFields.rna_number = formSubmit.get("rna_number") as string;
            }

            if (formSubmit.get("address") !== originalDataUser.association?.address) {
                modifiedFields.address = formSubmit.get("address") as string;
            }
    
            if (formSubmit.get("postal_code") !== originalDataUser.association?.postal_code) {
                modifiedFields.postal_code = formSubmit.get("postal_code") as string;
            }
    
            if (formSubmit.get("city") !== originalDataUser.association?.city) {
                modifiedFields.city = formSubmit.get("city") as string;
            }
    
            if (formSubmit.get("phone") !== originalDataUser.association?.phone) {
                modifiedFields.phone = formSubmit.get("phone") as string;
            }

            if (formSubmit.get("description") !== originalDataUser.association?.description) {
                modifiedFields.description = formSubmit.get("description") as string;
            }
        }

        const fieldFormatsError = validForm.validateFieldFormatForUpdate(modifiedFields);
        if (fieldFormatsError && (fieldFormatsError.fileds.length! >0 || fieldFormatsError.message.length! >0)) {
            const message = fieldFormatsError.message;
            const fields = fieldFormatsError.fileds;
            
            if (userType === "family" && (message.includes("Merci de renseigner un numéro RNA valide") || fields.includes("rna_number"))) {
                console.log("je suis une famille");
                const goodMessage = message.filter( item => item !== "Merci de renseigner un numéro RNA valide").join(", ")
                const goodFields = fields.filter( item => item !== "rna_number");

                setErrorMessage(goodMessage);
                setErrorFields(goodFields);
            } else {
                const messageString = message.join(", ");
                setErrorMessage(messageString);
                setErrorFields(fields);
            }
            return
        }

        const sendTextData = async () => {
            if (Object.entries(modifiedFields).length > 0) {
                try {
                    const response = await (originalDataUser.family ?  APIFamily.pathFamily : APIAssociation.patchAssociation)(id!, modifiedFields);
                   return response.data;
                } catch (err: unknown) {
                    console.log(err)
                    console.error(
                        "Erreur lors de la modification des informations de l'association :",
                        (err as Error).message
                    );
                    throw new Error("Une erreur est survenue lors de la modification.");
                }
            }
        };

        const sendPhoto = async () => {
            if (formDataUser[userType]!.profile_photo !== originalDataUser[userType]?.profile_photo) {
                const photoFormData = new FormData();
                if (formDataUser[userType]!.profile_photo === "delete") {
                    photoFormData.append("profile_photo", formDataUser[userType]!.profile_photo!);
                } else {
                    photoFormData.append("profile_photo", formDataUser[userType]!.profile_file!);
                }

                try {
                    const response = await (originalDataUser.family ? APIFamily.pathFamilyPhoto :  APIAssociation.pathAssociationPhoto)(id!, photoFormData);
                    return response.data;
                } catch (error) {
                    console.log(error);
                    throw new Error("Une erreur est survenue lors de l'envoi de la photo.");
                }
            }
        };

        try {
            const [textResponse, photoResponse] = await Promise.all([sendTextData(), sendPhoto()]);
            if(textResponse || photoResponse) {
                setIsInfoEditMode(false);

                if (formDataUser[userType]?.profile_photo?.startsWith('blob:')) {
                    URL.revokeObjectURL(formDataUser[userType]?.profile_photo!);
                }

                let updatedUser = {...formDataUser};
                if(textResponse) {
                    updatedUser = {
                        ...updatedUser,
                        ...textResponse[userType],
                        [userType]: {
                            ...updatedUser[userType],
                            ...textResponse,
                        },
                    };
                }

                if (photoResponse) {
                    updatedUser = {
                        ...updatedUser,
                        [userType]: {
                            ...updatedUser[userType],
                            profile_photo: photoResponse?.profile_photo,
                            profile_file: undefined,
                        },
                    };
                }
                
                setFormDataUser(updatedUser);
                setUser(updatedUser);
                setSuccessMessage("Modifications enregistrées avec succès !");
            } else {
                setErrorMessage("Aucune réponse du serveur.");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de la modification.");
            setSuccessMessage("");
        } 
    };

    const handleDele = async () => {
        try {
            await (user.role === "family" ? APIFamily.deleteFamily: APIAssociation.deleteAssociations)(id!);
            logout();
            setUser(null);
            navigate("/");
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                console.log(error);
                if (error.response?.data.error === 'Deletion impossible, you are still hosting animals') {
                   return setErrorMessage("Suppression imposible, des animaux sont rataché à votre profil. merci de les supprimer avant de pouvoir supprimer votre compte");
                }
            }
        }
    };

    return (
        <section className="ProfilUser">
            <form action="" className="formProfilUser" onSubmit={handleSubmit}>
                <h1 className="headerProfilUser">Mes informations</h1>
                <div className="profilImgWrap">
                    <img src={formDataUser[userType]?.profile_photo || userIcon} alt="Photo de profil" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = userIcon;
                    }}/>
                </div>

                {isInfoEditMode && (
                    <div className="editProfilImgWrap">
                        <label htmlFor="profile_photo">Choisir une photo</label>
                        <input type="file" name="profile_photo" id="profile_photo" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                        <button className="deleteProfilImg" type="button" onClick={handleClickDeletePhoto}>Supprimer ma photo</button>
                    </div>
                )}
                
                {user.role === "family" && <InputsProfilesFa formDataUser={formDataUser} handleChangeInput={handleChangeInput} isInfoEditMode={isInfoEditMode} errorFields={errorFields} />}
                {user.role === "association" && <InputsProfilesAsso formDataUser={formDataUser} handleChangeInput={handleChangeInput} isInfoEditMode={isInfoEditMode} errorFields={errorFields} />}

                {isInfoEditMode &&
                    <div className="buttonsWrap">
                        <button type="submit" className="btnModifProfile first" >
                            <FontAwesomeIcon icon={faCheck} /> Valider la modification
                        </button>
                        <button type="reset" className="btnModifProfile second" onClick={()=>{setIsInfoEditMode(false); setFormDataUser(originalDataUser) ; setErrorFields([])}}>
                            <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                        </button>
                        <button type="button"className="btnModifProfile last web" onClick={() => setIsConfirmModalOpen(true)} >
                            <FontAwesomeIcon icon={faTrashCan} /> Supprimer le compte
                        </button>
                    </div>
                }
            </form>

            {isPasswordEditMode &&
                <FormEditPassword isPasswordEditMode={isPasswordEditMode} setIsPasswordEditMode={setIsPasswordEditMode} userData={user} />
            }

            {!isInfoEditMode &&
                <div className="buttonsWrap">
                    <button type="button" className="btnModifProfile first" onClick={() => {setIsInfoEditMode(true)}}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Modifier les informations
                    </button>
                    <button type="button" className="btnModifProfile second" onClick={() => setIsPasswordEditMode(true)} >
                        <FontAwesomeIcon icon={faPenToSquare} /> Modifier le mot de passe
                    </button>
                    <button type="button"className="btnModifProfile last web" onClick={() => setIsConfirmModalOpen(true)} >
                        <FontAwesomeIcon icon={faTrashCan} /> Supprimer le compte
                    </button>
                </div>
            }

            <ConfirmModal text="Êtes-vous sûr de vouloir supprimer votre profil ?" opened={isConfirmModalOpen} onConfirm={handleDele} onCancel={()=>setIsConfirmModalOpen(false)} />

            {errorMessage &&
                <Toast message={errorMessage!} type="error" setToast={setErrorMessage} />
            }

            {successMessage &&
                <Toast message={successMessage!} type="success" setToast={setSuccessMessage} />
            }
        </section>
    );
};

export default Profil;