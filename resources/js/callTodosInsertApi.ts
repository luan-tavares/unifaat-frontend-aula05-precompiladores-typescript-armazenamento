import axios from "axios";
import { TodoModel } from "./app.types";
import catchError from "./services/catchError";
import cookies from "./services/cookies";

// Exporta a função assíncrona como padrão, recebendo o objeto "data" como parâmetro
export default async function (body: Record<string, string | boolean | number>) {
    try {

        const jwt = cookies("jwt");

        const { data } = await axios.post<TodoModel>("http://localhost:8080/api/todos", body, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        // Retorna a resposta da API já convertida em objeto
        return data;

    } catch (error) {
        return catchError(error);
    }
}
