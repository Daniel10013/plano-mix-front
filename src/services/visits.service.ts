import api from "../lib/api";
import { VisitCompare } from "../types/Stores/Stores";
import { Visit, VisitCreate, VisitDetails } from "../types/Visits/Visits";
interface ApiVisitResponse {
    status: boolean;
    data: {
        id: number;
        observation: string;
        user: { name: string };
        shopping: { name: string, id: number };
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
        const message = err.response?.data?.message ?? 'Erro ao pegar visitas do shopping!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function getVisitDetails(visitId: number) {
    try {
        const response = await api.get(`/visit/details/${visitId}`);
        const responseData = response.data as { success: boolean, data: VisitDetails };
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

export async function createVisit(visitData: VisitCreate) {
    try {
        const response = await api.post("/visit", visitData);
        const data = response.data as { success: boolean, message: string }
        return {
            status: data.success,
            message: data.message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar visita!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function compareVisits(id1: number, id2: number) {
    try {
        const response = await api.get(`/visit/${id1}/${id2}`);
        const data = response.data as { success: boolean, data: { visit1: VisitCompare[], visit2: VisitCompare[] } }
        return data;
    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar comaparação das visitas!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function getVisitsDates(id1: number, id2: number) {
    try {
        const visit1 = await getVisitDetails(id1);
        const visit2 = await getVisitDetails(id2);
        return {date1: visit1.data.date, date2: visit2.data.date}

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar datas das visitas!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}