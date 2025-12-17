"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,

  async (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (status === 401 && code === "UNAUTHENTICATED") {
      await Swal.fire({
        icon: "warning",
        title: "Sessão expirada",
        text: "Faça login novamente.",
        confirmButtonText: "OK",
      }).then(() => {
        location.replace("/login");
      });
      return Promise.reject(error);
    } 

    if (status === 500) {
      toast.error("Erro interno do servidor. Tente novamente mais tarde.");
    }

    return Promise.reject(error);
  }
);

export default api;
