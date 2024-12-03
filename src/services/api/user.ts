import axiosInstance from "../axios/axios"

const APIUser = {
    async createUser(data: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        family?: {
            address: string;
            postal_code: string;
            city: string;
            phone: string;
        };
        association?: {
            representative: string;
            rna_number: string;
            postal_code: string;
            city: string;
            address: string;
            phone: string;
        };
    }) {
        return await axiosInstance.post("/user", data);
    },

    async getUser(id: number) {
        return await axiosInstance.get(`/user/${id}`)
    }
};

export default APIUser;