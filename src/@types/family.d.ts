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