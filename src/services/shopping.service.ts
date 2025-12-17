import axios from "axios";
import api from "../lib/api";
import { ShoppingStores } from "../types/Stores/Stores";
import type { ShoppingRequest, Shopping, ViaCepResponse, ShoppingCreate, ShoppingUpdate, ShoppingFilter } from "../types/Shoppings/Shoppings";

export async function loadShoppings() {
    try {
        const request = await api.get('shopping');
        const data = request.data as ShoppingRequest[];

        if (request.status != 200) {
            throw new Error('Erro ao pegar dados dos shoppings');
        }

        return formatShoppings(data);
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar dados dos shoppings!!';

        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;

        throw customError;
    }
}

async function formatShoppings(data: ShoppingRequest[]): Promise<Shopping[]> {
    return await Promise.all(
        data.map(async (req) => ({
            id: req.id,
            name: req.name,
            description: req.observation,
            address: await getAddress(req.zip_code, req.zip_number),
        }))
    );
}

export async function getAddress(cep: number, number: number, includeCep: boolean = true): Promise<string> {
    const viacep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data: ViaCepResponse = viacep.data as ViaCepResponse;
    let address = `${data.logradouro}, ${number} - ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`
    if (address.includes('undefined')) {
        return cep + ', ' + number;
    }

    if (includeCep == false) {
        return `${data.logradouro}, ${number} - ${data.bairro}, ${data.localidade} - ${data.uf}`
    }
    return address;
}

export async function cepIsValid(cep: string): Promise<boolean> {
    try {
        const viacep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (viacep.status == 400) {
            return false
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function createShopping(shoppingData: ShoppingCreate) {
    try {
        const response = await api.post('shopping', shoppingData);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }
    }
    catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao criar shopping!'
        }
    }
}

export async function deleteShopping(id: number) {
    try {
        const response = await api.delete('shopping/' + id);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }
    }
    catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao apagar shopping!'
        }
    }
}

export async function updateShopping(id: number, shoppingData: ShoppingUpdate) {
    try {
        const response = await api.put('shopping/' + id, shoppingData);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }
    }
    catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao editar o shopping!'
        }
    }
}

export async function getById(id: number, format: boolean = false) {
    try {
        const response = await api.get('shopping/' + id);
        return response.data as ShoppingRequest;
    }
    catch (err: any) {

        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar dados do shopping!';

        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;

        throw customError;
    }
}

export function formatCep(value: string): string {
    const onlyNumbers = value.replace(/\D/g, "");
    const trimmed = onlyNumbers.slice(0, 8);
    if (trimmed.length > 5) {
        return trimmed.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }

    return trimmed;
}

export async function getShoppingStores(id: number) {
    try {
        const response = await api.get(`/store/shopping/${id}`);
        const responseData = response.data as {sucess: boolean, data: ShoppingStores[]}

        return { status:  responseData.sucess, data: responseData.data };
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar lojas do shopping!';

        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;

        throw customError;
    }
}

export async function getShoppingFilter() {
    try {
        const request = await api.get('shopping');
        const data = request.data as ShoppingRequest[];

        const shoppingFilter: ShoppingFilter[] = data.map((s) => ({
            value: s.id,
            label: s.name
        }));
        return shoppingFilter;
    }
    catch (err: any) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.message ?? 'Erro ao pegar lojas do shopping!';

        const customError = new Error(message) as Error & { status?: number };
        customError.status = status;

        throw customError;
    }
}