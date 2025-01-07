import { IAssociation } from "./association";
import { IFamily } from "./family";

export interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: string;
    id_family?: number;
    id_association?: number;
    created_at?: string;
    updated_at?: string;
    family?: IFamily;
    association?: IAssociation
}

export interface IUserOnly {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    created_at?: string;
    updated_at?: string;
}