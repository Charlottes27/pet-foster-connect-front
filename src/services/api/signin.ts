import axiosInstance from "../axios/axios";

const APISignin = {
    async signin (data: {
        email: string,
        password: string,
    }) {
        return await axiosInstance.post("/signin", data)
    },
};

export default APISignin;