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

export async function createClassification(name: string): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.post('/classification/', { name: name });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }
    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function createSegment(classificationId: number, name: string): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.post("/classification/segment", { name: name, classification_id: Number(classificationId) });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function createActivity(segmentId: number, name: string): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.post("classification/segment/activity", { name: name, segment_id: Number(segmentId) });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function editClassification(classification_id: number, name: string): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.put("classification/" + classification_id, { name: name });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function editSegment(segment_id: number, name: string, classification_id: number): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.put("classification/segment/" + segment_id, { name: name, classification_id: Number(classification_id) });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function editActivity(activity_id: number, name: string, segment_id: number): Promise<{ status: boolean, message: string }> {
    try {
        const response = await api.put("classification/segment/activity/" + activity_id, { name: name, segment_id: Number(segment_id) });
        const { success, message } = response.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }

    } catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar classificação';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}
