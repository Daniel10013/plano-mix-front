import api from "../lib/api";

export async function auth(email: string, password: string): Promise<{ status: boolean, message: string }> {
    try {
        const data = {
            email: email,
            password: password
        }

        const response = await api.post('users/auth', data);
        return {
            status: true,
            message: "ok"
        }
    }
    catch (error: any) {
        return {
            status: false,
            message: error.response?.data.message ?? 'Erro ao fazer login!'
        }
    }
}

export async function logout(): Promise<{ status: boolean, message: string }> {
    try {
        const data = await api.get('users/auth/logout');
        return {
            status: true,
            message: 'ok'
        }
    }
    catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response?.data.message ?? 'Erro ao fazer logout!'
        }
    }
}