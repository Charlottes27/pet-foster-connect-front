import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext, useNavigate } from "react-router-dom";

import "./Profil.css";
import userIcon from "../../asset/logo/user.svg";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import FormEditPassword from "../Formulaires/FormEditPassword/FormEditPassword";
import { IUser } from "../../@types/user";
import { IFamilyUser } from "../../@types/family";
import APIFamily from "../../services/api/family";
import { useAuth } from "../AuthContext/AuthContext";

type UserFields = "lastname" | "firstname" | "email";

function Profil () {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>()
    
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
    });

    const {user, setUser} = useOutletContext<{ user: IUser; setUser: React.Dispatch<React.SetStateAction<IUser | null>>}>();

    useEffect(() => {
        if (user) {
            let profileFile: File | null;
            const photo = user.family?.profile_photo;

            if (photo && photo !== "delete") {
                profileFile = new File([photo], `serverProfilFile-${user.family!.id}.jpg`, { type : "image/jpeg"})
                user.family!.profile_file = profileFile
            } else {
                profileFile = null;
            }

            setOriginalDataUser((prevData)=> ({
                ...prevData,
                ...user,
            }));
            setFormDataUser((prevData)=> ({
                ...prevData,
                ...user,
            }));
        }

    }, [user]);

    useEffect(() => {
        return () => {
          if (formDataUser.family?.profile_photo?.startsWith('blob:')) {
            URL.revokeObjectURL(formDataUser.family.profile_photo);
          }
        };
    }, []);

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleClickDeletePhoto = () => {
        setFormDataUser((prevData)=> ({
            ...prevData,
            family:{
                ...prevData.family!,
                profile_photo: "delete",
                profile_file: undefined,
            },
        }));
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = event.target

        if (type === "file") {
            const file = "files" in event.target ? event.target?.files?.[0] : undefined;

            if (file) {
                if (formDataUser.family?.profile_photo?.startsWith("blob:")) {
                    URL.revokeObjectURL(formDataUser.family.profile_photo)
                }

                const previewUrl = URL.createObjectURL(file);
                setFormDataUser((prevData)=> ({
                    ...prevData,
                    family:{
                        ...prevData.family!,
                        profile_photo: previewUrl,
                        profile_file:file,
                    },
                }));
            }
        } else {
            setFormDataUser((prevData)=>{
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
                }}
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formSubmit = new FormData(event.target as HTMLFormElement);
        const modifiedFields: Partial<IFamilyUser> = {};

        const fieldsUser:UserFields[] = ["lastname", "firstname", "email"];
        fieldsUser.forEach(field => {
            if (formDataUser[field] !== originalDataUser[field]) {
                if (!modifiedFields.user && field) {
                    modifiedFields.user = {};
                }
                modifiedFields.user![field] = formDataUser[field];
            }
        });

        
        if (originalDataUser.family) {
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
                modifiedFields.garden = gardenValue === "true";
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

        const sendTextData = async () => {
            if (modifiedFields) {
                try {
                    const response = originalDataUser.family ? await APIFamily.pathFamily(user?.family?.id!, modifiedFields) : await APIFamily.pathFamily(user?.family?.id!, modifiedFields)
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
            console.log(formDataUser.family?.profile_photo);
            console.log(typeof formDataUser.family?.profile_photo);
            console.log(originalDataUser.family?.profile_photo)

            if (formDataUser.family?.profile_photo !== "delete" && formDataUser.family?.profile_photo !== originalDataUser.family?.profile_photo) {
                const photoFormData = new FormData();
                photoFormData.append("profile_photo", formDataUser.family?.profile_file!);
console.log("je suis passé dans send");

                try {
                    const response = await APIFamily.pathFamilyPhoto(user?.family?.id!, photoFormData);
                    console.log(response.data);
                    
                    return response.data;
                } catch (error) {
                    console.log(error);
                    throw new Error("Une erreur est survenue lors de l'envoi de la photo.");
                }
            }

            if (formDataUser.family?.profile_photo === "delete" && formDataUser.family?.profile_photo !== originalDataUser.family?.profile_photo) {
                const photoFormData = new FormData();
                photoFormData.append("profile_photo", formDataUser.family?.profile_photo!);
                try {
                    const response = await APIFamily.pathFamilyPhoto(user?.family?.id!, photoFormData);
                    console.log(response.data);
                    
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
                if (formDataUser.family?.profile_photo?.startsWith('blob:')) {
                    URL.revokeObjectURL(formDataUser.family?.profile_photo);
                }
                const updatedUser = {
                    ...formDataUser,
                    family: {
                        ...formDataUser.family,
                        profile_photo: photoResponse?.profile_photo,
                        profile_file: undefined,
                    },
                };
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
            await APIFamily.deleteFamily(user?.family?.id!);
            logout();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <section className="ProfilUser">
            <form action="" className="formProfilUser" onSubmit={handleSubmit}>
            <h1 className="headerProfilUser">Mes informations</h1>
                <div className="profilImgWrap">
                    <img src={formDataUser.family?.profile_photo || userIcon} alt="Photo de profil" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
                <div className="fieldsWrap">
                    <label htmlFor="lastname" className="infoLabel" id="labelLastname">Nom</label>
                    <input type="text" name="lastname" id="lastname" className="infoInput" value={formDataUser?.lastname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="firstname" className="infoLabel" id="labelFirstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" className="infoInput" value={formDataUser?.firstname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="addess" className="infoLabel" id="labelAddess">Adresse</label>
                    <input type="text" name="address" id="addess" className="infoInput" value={formDataUser?.family?.address} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="postal_code" className="infoLabel" id="labelPostal_code">Code Postal</label>
                    <input type="text" name="postal_code" id="postal_code" className="infoInput" value={formDataUser?.family?.postal_code} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="city" className="infoLabel" id="labelCity">Ville</label>
                    <input type="text" name="city" id="city" className="infoInput" value={formDataUser?.family?.city} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="phone" className="infoLabel" id="labelPhone">Téléphone</label>
                    <input type="text" name="phone" id="phone" className="infoInput" value={formDataUser?.family?.phone} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="email" className="infoLabel" id="labelEmail">Mail</label>
                    <input type="text" name="email" id="email" className="infoInput" value={formDataUser?.email} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <h2>Situation de mon foyer</h2>

                    <div className="garden" id="garden">
                        <p>Avez-vous un jardin ?</p>
                        <div>
                            <input type="radio" name="garden" id="gardenTrue" className="infoInput" value={"true"} onChange={handleChangeInput} checked={formDataUser.family?.garden === true} disabled={!isInfoEditMode} />
                            <label htmlFor="gardenTrue" className="infoLabel">Oui</label>
                        </div>
                        <div>
                            <input type="radio" name="garden" id="gardenFalse" className="infoInput" value={"false"} onChange={handleChangeInput} checked={formDataUser.family?.garden === false} disabled={!isInfoEditMode} />
                            <label htmlFor="gardenFalse" className="infoLabel">Non</label>
                        </div>
                    </div>

                    <div className="children" id="children">
                        <label htmlFor="number_of_children" className="infoLabel">Combien d'enfants avez-vous ?</label>
                        <input type="number" name="number_of_children" id="number_of_children" className="infoInput" min={0} value={formDataUser?.family?.number_of_children} onChange={handleChangeInput} disabled={!isInfoEditMode} />    
                    </div>

                    <div className="animals" id="animals">
                        <label htmlFor="number_of_animals" className="infoLabel">Combien d'animaux avez-vous ?</label>
                        <input type="number" name="number_of_animals" id="number_of_animals" className="infoInput" min={0} value={formDataUser?.family?.number_of_animals} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                    </div>

                    <label htmlFor="description" className="infoLabel" id="labelDescription">Description</label>
                    <textarea name="description" id="description" className="infoInput" value={formDataUser?.family?.description ?? ""} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                </div>
                {isInfoEditMode &&
                    <div className="buttonsWrap">
                        <button type="submit" className="btnModifProfile first" >
                            <FontAwesomeIcon icon={faCheck} /> Valider la modification
                        </button>
                        <button type="reset" className="btnModifProfile second" onClick={()=>setIsInfoEditMode(false)}>
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

        </section>
    );
};

export default Profil;