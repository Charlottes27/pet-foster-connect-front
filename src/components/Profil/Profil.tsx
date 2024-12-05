import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

import "./Profil.css";
import userIcon from "../../asset/logo/user.svg";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { IUser } from "../../@types/user";

function Profil () {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
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
            profile_file: null,
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
            profile_file: null,
        },
    });
    const [profilePhoto, setProfilePhoto] =useState<string | undefined>(undefined)

    const user = useOutletContext<IUser>();
console.log(user);
console.log(originalDataUser);
console.log(formDataUser);

    useEffect(() => {
        if (user) {
            let profileFile: File | null;

            if (user.family?.profile_photo) {
                const dataPhoto = user.family.profile_photo;
                profileFile = new File([dataPhoto], `serverProfilFile-${user.family.id}.jpg`, { type : "image/jpeg"})
                user.family.profile_file = profileFile
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
            setProfilePhoto(profileFile ? `${import.meta.env.VITE_BASE_URL_PUBLIC}/${user.family?.profile_photo}` : profilePhoto)
        }

    }, [user])

    const handleClickDeletePhoto = () => {
        setProfilePhoto(undefined);
        setFormDataUser((prevData)=> ({
            ...prevData,
            family:{
                ...prevData.family!,
                profile_file: null,
            },
        }));
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = event.target;
        console.log(name);
        console.log(value);
        console.log(type);

        const files = "files" in event.target ? event.target.files : undefined;
        console.log(files);

        if (type === "file") {
            const file = files?.[0];
            console.log(file);

            if (file) {
                const reader = new FileReader();
                console.log(reader);

                reader.onloadend = () => {
                    setProfilePhoto(reader.result as string);
                    setFormDataUser((prevData)=> ({
                        ...prevData,
                        family:{
                            ...prevData.family!,
                            profile_file: file,
                        },
                    }));
                }
                reader.readAsDataURL(file); 
            }
        } else {
            setFormDataUser((prevData)=>{
                const isFamilyField = ['address', 'postal_code', 'city', 'phone', 'description', 'garden', 'number_of_children', 'number_of_animals', 'profile_photo', 'profile_file'].includes(name);
                console.log(isFamilyField);
                console.log(name);
                
                
                return {...prevData,
                ...(isFamilyField ? {} : { [name]: value }),
                family:{
                    ...prevData.family!,
                    ...(isFamilyField ? { [name]: value } : {}),
                }}
            })
            console.log(formDataUser);
            
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    return (
        <section className="ProfilUser">
            
            
            <form action="" className="formProfilUser" onSubmit={handleSubmit}>
            <h1 className="headerProfilUser">Mes informations</h1>
                <div className="profilImgWrap">
                    <img src={profilePhoto || userIcon} alt="Photo de profil" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
                        <label htmlFor="gardenTrue" className="infoLabel">
                            <input type="checkbox" name="garden" id="gardenTrue" className="infoInput" checked={formDataUser?.family?.garden || false} onChange={()=>handleChangeInput({ target: { name: 'garden', value: "true" } })} disabled={!isInfoEditMode} />
                            Oui
                        </label>
                        <label htmlFor="gardenFalse" className="infoLabel">
                            <input type="checkbox" name="garden" id="gardenFalse" className="infoInput" checked={!formDataUser?.family?.garden} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                            Non
                        </label>
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
                    <textarea name="description" id="description" className="infoInput" value={formDataUser?.family?.description} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                </div>

                <div className="buttonsWrap">
                    {isInfoEditMode ? (<>
                        <button type="submit" className="btnModifProfile first" >
                        <FontAwesomeIcon icon={faCheck} /> Valider la modification
                        </button>

                        <button type="reset" className="btnModifProfile second" onClick={()=>setIsInfoEditMode(false)}>
                        <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                        </button>
                    </>) : (<>
                        <button type="button" className="btnModifProfile first" onClick={() => {console.log("Bouton cliqué, état avant :", isInfoEditMode);
                            setIsInfoEditMode(true);
                            console.log("État après changement :", isInfoEditMode);}}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Modifier les informations
                        </button>
                        <button type="button" className="btnModifProfile second" onClick={() => setIsPasswordEditMode(!isPasswordEditMode)} >
                            <FontAwesomeIcon icon={faPenToSquare} /> Modifier le mot de passe
                        </button>
                    </>)}
                    <button type="button"className="btnModifProfile last web" onClick={() => setIsConfirmModalOpen(true)} >
                        <FontAwesomeIcon icon={faTrashCan} /> Supprimer le compte
                    </button>
                </div>
            </form>

            <ConfirmModal text="Êtes-vous sûr de vouloir supprimer votre profil ?" opened={isConfirmModalOpen} onConfirm={()=> {}} onCancel={()=>setIsConfirmModalOpen(false)} />

        </section>
    );
};

export default Profil;