import api from "../lib/api";
import { Store } from "../types/Stores/Stores";

export async function getAllStores() {
    try {
        const response = await api.get(`/store`);
        return response.data as Store[]
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar lojas!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}