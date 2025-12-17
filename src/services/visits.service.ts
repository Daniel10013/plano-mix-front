import api from "../lib/api";
import { Visit, VisitDetails } from "../types/Visits/Visits";
interface ApiVisitResponse {
    status: boolean;
    data: {
        id: number;
        observation: string;
        user: { name: string };
        shopping: { name: string, id: number};
        date: string;
    }[];
}

export async function getVisitsByShopping(shoppingId: number) {
    try {
        const response = await api.get(`/visit/shopping/${shoppingId}`);
        const responseData = response.data as { status: boolean, data: Visit[] };
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

export async function getRecentVisits(): Promise<Visit[]> {
    try {
        const response = await api.get<ApiVisitResponse>("/visit/");
        const formattedData: Visit[] = response.data.data.map(item => ({
            id: item.id,
            observation: item.observation,
            username: item.user.name,
            shopping_name: item.shopping.name,
            shopping_id: item.shopping.id,
            date: item.date
        }));

        return formattedData;

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        console.log(err);
        const message = err.response?.data?.message ?? 'Erro ao pegar visitas do shopping!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function getVisitDetails(visitId: number) {
    try {
        const response = await api.get(`/visit/details/${visitId}`);
        const responseData = response.data as {success: boolean, data: VisitDetails};
        return {
            status: responseData.success,
            data: responseData.data 
        };
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar visitas do shopping!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}


