import axios from "axios";
import { TodoModel } from "./app.types";
import catchError from "./services/catchError";
import cookies from "./services/cookies";

// Exporta a função assíncrona como padrão, recebendo o objeto "data" como parâmetro
export default async function (id: string, body: Record<string, string | boolean | number>) {
    try {

        const jwt = cookies("jwt");

        // Faz uma requisição HTTP POST para a API de "todos"
        const { data } = await axios.put<TodoModel>(
            `http://localhost:8080/api/todos/${id}`,
            body,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        );

        // Retorna a resposta da API já convertida em objeto
        return data;

    } catch (error) {
        return catchError(error);
    }
}
