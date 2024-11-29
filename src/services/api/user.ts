import axiosInstance from "../axios/axios"

const APIUser = {
    async createUser (data: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        family: {
            address: string;
            postal_code: string;
            city: string;
            phone: string;
        };
    }) {
        return await axiosInstance.post("/user", data)
    }
};

export default APIUser;