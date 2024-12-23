import { IUser } from "../../../@types/user";

interface IInputsProfilesAssoProps {
    formDataUser: IUser
    handleChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    isInfoEditMode: boolean
    errorFields: string[]
}

function InputsProfilesAsso ({formDataUser, handleChangeInput, isInfoEditMode, errorFields}: IInputsProfilesAssoProps) {
    return (
        <div className="fieldsWrap">
            <label htmlFor="nameAsso" className="infoLabel" id="labelNameAsso">Nom de l'association</label>
            <input type="text" name="representative" id="nameAsso" className="infoInput" value={formDataUser?.association?.representative} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on"/>

            <label htmlFor="rnaNbAsso" className={errorFields.includes("rna_number")? "errorFields infoLabel" : "infoLabel"} id="labelRnaNBAsso">Numéro RNA</label>
            <input type="text" name="rna_number" id="rnaNbAsso" className={errorFields.includes("rna_number")? "errorFields infoInput" : "infoInput"} value={formDataUser?.association?.rna_number} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on" />
            
            <label htmlFor="lastnameAsso" className={errorFields.includes("user.lastname")? "errorFields infoLabel" : "infoLabel"} id="labelLastnameAsso">Nom du représentant</label>
            <input type="text" name="lastname" id="lastnameAsso" className={errorFields.includes("user.lastname")? "errorFields infoInput" : "infoInput"} value={formDataUser?.lastname} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on" />

            <label htmlFor="firstnameAsso" className={errorFields.includes("user.firstname")? "errorFields infoLabel" : "infoLabel"} id="labelFirstnameAsso">Prénom du représentant</label>
            <input type="text" name="firstname" id="firstnameAsso" className={errorFields.includes("user.firstname")? "errorFields infoInput" : "infoInput"} value={formDataUser?.firstname} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on" />

            <label htmlFor="addessAsso" className={errorFields.includes("address")? "errorFields infoLabel" : "infoLabel"} id="labelAddessAsso">Adresse</label>
            <input type="text" name="address" id="addessAsso" className={errorFields.includes("address")? "errorFields infoInput" : "infoInput"} value={formDataUser?.association?.address} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="adrress" />

            <label htmlFor="postal_codeAsso" className={errorFields.includes("postal_code")? "errorFields infoLabel" : "infoLabel"} id="labelPostal_codeAsso">Code Postal</label>
            <input type="text" name="postal_code" id="postal_codeAsso" className={errorFields.includes("postal_code")? "errorFields infoInput" : "infoInput"} value={formDataUser?.association?.postal_code} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on" />

            <label htmlFor="cityAsso" className="infoLabel" id="labelCityAsso">Ville</label>
            <input type="text" name="city" id="cityAsso" className="infoInput" value={formDataUser?.association?.city} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="on" />

            <label htmlFor="phoneAsso" className={errorFields.includes("phone")? "errorFields infoLabel" : "infoLabel"} id="labelPhoneAsso">Téléphone</label>
            <input type="text" name="phone" id="phoneAsso" className={errorFields.includes("phone")? "errorFields infoInput" : "infoInput"} value={formDataUser?.association?.phone} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="phone" />

            <label htmlFor="emailAsso" className={errorFields.includes("user.email")? "errorFields infoLabel" : "infoLabel"} id="labelEmailAsso">Mail</label>
            <input type="text" name="email" id="emailAsso" className={errorFields.includes("user.email")? "errorFields infoInput" : "infoInput"} value={formDataUser?.email} onChange={handleChangeInput} disabled={!isInfoEditMode} autoComplete="email" />
        
            <label htmlFor="descriptionAsso" className="infoLabel" id="labelDescriptionAsso">Description</label>
            <textarea name="description" id="descriptionAsso" className="infoInput" value={formDataUser?.association?.description ?? ""} onChange={handleChangeInput} disabled={!isInfoEditMode} />
        </div>
    );
};

export default InputsProfilesAsso;