import { IAnimal } from "./animal";
import { IUser, IUserOnly } from "./user";

export interface IFormDataAssociation {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    association: {
        representative: string;
        rna_number: string;
        postal_code: string;
        city: string;
        address: string;
        phone: string;
    };
}

export interface IAssociation{
    id?: number;
    representative?: string;
    rna_number?: string;
    address?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
    description?: string;
    status?: string;
    profile_photo?: string;
    profile_file?: File;
    created_at?: string;
    updated_at?: string;
    id_user?: number;
    animals?: IAnimal[];
    created_at?: string;
    updated_at?:  string;
}

export interface IAssociationUser {
    id?: number;
    representative?: string;
    rna_number?: string;
    address?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
    description?: string;
    status?: string;
    profile_photo?: string;
    profile_file?: File;
    created_at?: string;
    updated_at?: string;
    id_user?: number;
    user?: IUserOnly;
    animals?: IAnimal[];
    created_at?: string;
    updated_at?:  string;
}
