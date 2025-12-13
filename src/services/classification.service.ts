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