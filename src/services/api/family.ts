import axiosInstance from "../axios/axios"

const APIFamily = {
    async getFamily(id: number) {
        return await axiosInstance.get(`/family/${id}`)
    },

    async getAnimalsOfFamily(id:number) {
        return await axiosInstance.get(`/family/${id}/animal`)
    }
};

export default APIFamily;