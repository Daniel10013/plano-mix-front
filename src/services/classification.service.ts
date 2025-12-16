import api from "../lib/api";
import { Mix } from "../types/Classifications/Classification";

export async function getMix(): Promise<Mix[]> {
    const response = await api.get("/classification/mix");
    if (response.status != 200) {
        throw new Error("Erro ao listar mix");
    }
    const data = response.data as { sucess: boolean, data: Mix[] };
    return data.data;
}

export async function getClassifications() {
    try {
        const response = await api.get(`/classification`);
        return response.data as { suceess: boolean, data: { id: number, name: string }[] }
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar classificações!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function getSegments() {
    try {
        const response = await api.get(`/classification/segment`);
        return response.data as { suceess: boolean, data: { id: number, name: string, classification_id: number }[] }
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar segmentos!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function getActivities() {
    try {
        const response = await api.get(`/classification/activity`);
        return response.data as { suceess: boolean, data: { id: number, name: string, segment_id: number }[] }
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar atividades!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}
