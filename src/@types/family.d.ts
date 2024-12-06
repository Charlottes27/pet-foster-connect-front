export interface IFormDataFamily {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    family: {
        address: string;
        postal_code: string;
        city: string;
        phone: string;
    };
}

export interface IFamily {
    id?: number;
    address?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
    description?: string;
    garden?: boolean;
    number_of_animals?: number;
    number_of_children?: number;
    profile_photo?: string;
    profile_file?: File;
    id_user?: number;
    created_at?: string;
    updated_at?:  string;
}

export interface IFamilyUser {
    id?: number;
    address?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
    description?: string;
    garden?: boolean;
    number_of_animals?: number;
    number_of_children?: number;
    profile_photo?: string;
    profile_file?: File;
    id_user?: number;
    user?: {
        firstname?: string;
        lastname?: string;
        email?: string;
        password?: string;
    };
    created_at?: string;
    updated_at?:  string;
}