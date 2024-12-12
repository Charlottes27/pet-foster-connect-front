import { IUser } from "../../../@types/user";

interface IInputsProfilesAssoProps {
    formDataUser: IUser
    handleChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    isInfoEditMode: boolean
}

function InputsProfilesAsso ({formDataUser, handleChangeInput, isInfoEditMode}: IInputsProfilesAssoProps) {
    return (
        <div className="fieldsWrap">
            <label htmlFor="representative" className="infoLabel" id="labelNameAsso">Nom de l'association</label>
            <input type="text" name="representative" id="nameAsso" className="infoInput" value={formDataUser?.association?.representative} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="rna_number" className="infoLabel" id="labelRnaNBAsso">Numéro RNA</label>
            <input type="text" name="rna_number" id="rnaNbAsso" className="infoInput" value={formDataUser?.association?.rna_number} onChange={handleChangeInput} disabled={!isInfoEditMode} />
            
            <label htmlFor="lastname" className="infoLabel" id="labelLastnameAsso">Nom du représentant</label>
            <input type="text" name="lastname" id="lastnameAsso" className="infoInput" value={formDataUser?.lastname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="firstname" className="infoLabel" id="labelFirstnameAsso">Prénom du représentant</label>
            <input type="text" name="firstname" id="firstnameAsso" className="infoInput" value={formDataUser?.firstname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="addess" className="infoLabel" id="labelAddessAsso">Adresse</label>
            <input type="text" name="address" id="addessAsso" className="infoInput" value={formDataUser?.association?.address} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="postal_code" className="infoLabel" id="labelPostal_codeAsso">Code Postal</label>
            <input type="text" name="postal_code" id="postal_codeAsso" className="infoInput" value={formDataUser?.association?.postal_code} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="city" className="infoLabel" id="labelCityAsso">Ville</label>
            <input type="text" name="city" id="cityAsso" className="infoInput" value={formDataUser?.association?.city} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="phone" className="infoLabel" id="labelPhoneAsso">Téléphone</label>
            <input type="text" name="phone" id="phoneAsso" className="infoInput" value={formDataUser?.association?.phone} onChange={handleChangeInput} disabled={!isInfoEditMode} />

            <label htmlFor="email" className="infoLabel" id="labelEmailAsso">Mail</label>
            <input type="text" name="email" id="emailAsso" className="infoInput" value={formDataUser?.email} onChange={handleChangeInput} disabled={!isInfoEditMode} />
        
            <label htmlFor="description" className="infoLabel" id="labelDescriptionAsso">Description</label>
            <textarea name="description" id="descriptionAsso" className="infoInput" value={formDataUser?.association?.description ?? ""} onChange={handleChangeInput} disabled={!isInfoEditMode} />
        </div>
    );
};

export default InputsProfilesAsso;