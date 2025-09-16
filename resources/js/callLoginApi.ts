import axios from "axios";
import catchError from "./services/catchError";
import { LoginApi } from "./app.types";

// Exporta a função assíncrona como padrão, recebendo o parâmetro "id"
export default async function (email: string, password: string) {
    try {
        const body = new URLSearchParams({
            email: email,
            password: password
        });


        const { data } = await axios.post<LoginApi>(`http://localhost:8080/login`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        // Se der tudo certo, retorna apenas uma string vazia (indicando sucesso sem dados extras)
        return data;

    } catch (error) {
        return catchError(error);
    }
}
