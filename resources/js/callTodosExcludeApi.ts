import axios from "axios";
import catchError from "./services/catchError";
import cookies from "./services/cookies";

// Exporta a função assíncrona como padrão, recebendo o parâmetro "id"
export default async function (id: string) {
    try {
        const jwt = cookies("jwt");
        await axios.delete(`http://localhost:8080/api/todos/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        // Se der tudo certo, retorna apenas uma string vazia (indicando sucesso sem dados extras)
        return "";

    } catch (error) {
        return catchError(error);
    }
}
