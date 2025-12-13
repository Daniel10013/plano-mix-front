import api from "../lib/api";
import { HomeStats } from "../types/Home/Home";
import { User, UserCreate } from "../types/Users/Users";

export async function sendResetEmail(email: string): Promise<{ status: boolean, message: string }> {
    try {
        const request = await api.post('users/send-reset-link', { email: email });
        const { success, message } = request.data as { success: boolean, message: string };

        return {
            status: success,
            message: message
        }
    }
    catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response?.data.message ?? 'Erro ao enviar email!'
        }
    }
}

export async function changePassword(token: string, newPassword: string, confirmPass: string): Promise<{ status: boolean, message: string }> {
    try {
        const request = await api.patch('users/reset-password/' + token, {
            password_new: newPassword,
            confirm_pass: confirmPass
        });

        const { success, message } = request.data as { success: boolean, message: string };
        return {
            status: success,
            message: message
        }
    }
    catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response?.data.message ?? 'Erro trocar senha!'
        }
    }
}

export async function getAllUsers(): Promise<User[]> {
    const request = await api.get("/users");
    if (request.status != 200) {
        throw new Error("Erro ao listar usuários");
    }
    const data = request.data as { sucess: boolean, data: User[] };
    return data.data;

}

export async function getUserById(id: number): Promise<User> {
    const response = await api.get("/users/" + id);
    if (response.status != 200) {
        throw new Error("Erro ao listar usuário");
    }
    const data = response.data as { sucess: boolean, data: User };
    return data.data
}

export async function getStats(): Promise<HomeStats> {
    const response = await api.get("/users/home/");
    if(response.status != 200){
        throw new Error("Erro ao listar Estatisticas");
    }
    const data = response.data as { sucess: boolean, data: HomeStats };
    return data.data
}

export async function createUser(userData: UserCreate) {
    try {
        const response = await api.post("/users/", userData);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }

    } catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao criar usuário!'
        }
    }
}

export async function updateUser(userToUpdate: User) {
    try {
        const response = await api.put("/users/" + userToUpdate.id, userToUpdate);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }
    } catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao criar usuário!'
        }
    }

}

export async function deleteUser(id: number) {
    try {
        const response = await api.delete("/users/" + id);
        const data = response.data as { success: boolean, message: string };
        return {
            status: data.success,
            message: data.message
        }
    }
    catch (err: any) {
        return {
            status: false,
            message: err.response?.data.message ?? 'Erro ao apagar usuário!'
        }
    }
}
