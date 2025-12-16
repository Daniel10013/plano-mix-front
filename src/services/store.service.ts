import api from "../lib/api";
import { Store, StoreCreate } from "../types/Stores/Stores";

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

export async function createStore(data: StoreCreate): Promise<boolean> {
    try {
        const response = await api.post(`/store`, data);
        if (response.status == 200) {
            return true;
        }
        return false;
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao criar loja!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function updateStore(id: number, data: StoreCreate): Promise<boolean> {
    try {
        const response = await api.put(`/store/${id}`, data);
        if (response.status == 200) {
            return true;
        }
        return false;
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao atualizar loja!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}


export async function getById(id: number) {
    try {
        const response = await api.get(`/store/${id}`);
        return response.data as Store
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar loja!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}

export async function deleteStore(id: number) {
    try {
        const response = await api.delete(`/store/${id}`);
        const data = response.data as { success: boolean, message: string }
        return {
            status: data.success,
            message: data.message
        }
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao apagar loja!';
        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;
        throw customError;
    }
}