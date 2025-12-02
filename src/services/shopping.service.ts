import axios from "axios";
import api from "../lib/api";
import type { ShoppingRequest, Shopping, ViaCepResponse } from "../types/Shoppings/Shoppings";

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
    const viacep = await axios.get(`https://viacep.com.br/ws/30620730/json/`);
    const data: ViaCepResponse = viacep.data as ViaCepResponse;
    const address = `${data.logradouro}, ${number} - ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`
    return address;
}