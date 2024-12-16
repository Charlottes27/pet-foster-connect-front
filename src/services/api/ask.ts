import axiosInstance from "../axios/axios";

const APIAsk = {
    async getAks(associationId: number) {
        return await axiosInstance.get(`/association/${associationId}/ask`);
    },

    async createAsk(id_animal: number) {
        return await axiosInstance.post("/ask", {id_animal});
    },
}

export default APIAsk;
