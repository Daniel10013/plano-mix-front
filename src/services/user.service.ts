import api from "../lib/api";

export async function sendResetEmail(email: string): Promise<{ status: boolean, message: string }> {
    try {
        const request = await api.post('users/send-reset-link', {email: email});
        const {success, message} = request.data as {success: boolean, message: string};

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
        
        const {success, message} = request.data as {success: boolean, message: string};
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