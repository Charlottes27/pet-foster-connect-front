import axiosInstance from "../axios/axios"

const APIAssociation = {
    async getAssociations() {
        return await axiosInstance.get("/association")
    },

    async getAssociation(id: number) {
        return await axiosInstance.get(`/association/${id}`)
    },

    async patchAssociations(id: number, data: {
        representative?: string;
        rna_number?: string;
        address?: string;
        postal_code?: string;
        city?: string;
        phone?: string;
        description?: string;
        profile_photo?: string;
        profile_file?: File;
        user?: {
            firstname?: string;
            lastname?: string;
            email?: string;
            password?: string;
        };
    }) {
        return await axiosInstance.patch(`/association/${id}`, data)
    },

    async deleteAssociations(id: number) {
       return await axiosInstance.delete(`/association/${id}`)
    },

    async getAnimalsOfAsso(id: number) {
        return await axiosInstance.get(`/association/${id}/animal`)
    },
};

export default APIAssociation;