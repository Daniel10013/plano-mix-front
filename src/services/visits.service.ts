import api from "../lib/api";
import { Visit } from "../types/Visits/Visits";

export async function getVisitsByShopping(shoppingId: number) {
    try {
        const response = await api.get(`/visit/shopping/${shoppingId}`);
        const responseData = response.data as {status: boolean, data: Visit[]};
        return responseData;
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar visitas do shopping!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}