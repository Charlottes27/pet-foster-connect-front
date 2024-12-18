import axiosInstance from "../axios/axios";

type AskStatus = "validée" | "rejetée"

const APIAsk = {
    async getAks(associationId: number) {
        return await axiosInstance.get(`/association/${associationId}/ask`);
    },

    async createAsk(id_animal: number) {
        return await axiosInstance.post("/ask", {id_animal});
    },

    async pathAsk(associationId: number, askId: number, data: {status : AskStatus}) {
        return await axiosInstance.patch(`association/${associationId}/ask/${askId}`, data)
    }
}

export default APIAsk;
