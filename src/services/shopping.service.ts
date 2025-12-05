import axios from "axios";
import api from "../lib/api";
import type { ShoppingRequest, Shopping, ViaCepResponse, ShoppingCreate, ShoppingUpdate } from "../types/Shoppings/Shoppings";

export async function loadShoppings() {
    try {
        const request = await api.get('shopping');
        const data = request.data as ShoppingRequest[];

        if (request.status != 200) {
            console.log(request);
            throw new Error('Erro ao pegar dados dos shoppings');
        }

        return formatShoppings(data);
    }
    catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response?.data.message ?? 'Erro ao pegar dados dos shoppings!'
        }
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

async function getAddress(cep: number, number: number): Promise<string> {
    const viacep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data: ViaCepResponse = viacep.data as ViaCepResponse;
    const address = `${data.logradouro}, ${number} - ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`
    if(address.includes('undefined')){
        return cep + ', ' + number;
    }
    return address;
}

export async function cepIsValid (cep: string): Promise<boolean> {
    try {
        const viacep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if(viacep.status == 400){
            return false
        }   
        return true;
    }catch(err ) {
        return false;
    }
}

export async function createShopping(shoppingData: ShoppingCreate) {
    try { 
        const response = await api.post('shopping', shoppingData);
        const data = response.data as {success: boolean, message: string};
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
        const data = response.data as {success: boolean, message: string};
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
        const data = response.data as {success: boolean, message: string};
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

export async function getById(id: number) {
    try { 
        const response = await api.get('shopping/' + id);
        console.log(response.data);
        return response.data as ShoppingRequest;
    }
    catch (err: any) {
        throw new Error(err.response?.data.message ?? 'Erro ao pegar dados do shopping!');
    }
}
