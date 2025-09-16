import axios from "axios";
import { ListApi, UserModel } from "./app.types";
import catchError from "./services/catchError";
import cookies from "./services/cookies";

// Exporta a função assíncrona como padrão, sem receber parâmetros
export default async function () {
    try {

        // Cria o objeto com os parâmetros da query string
        const queries = {
            limit: "100",          // define que no máximo 100 usuários serão retornados
            offset: "0",           // sem deslocamento (traz a partir do primeiro registro)
            orderBy: "name,asc"  // ordena pelo campo "name" em ordem crescente
        };

        // Converte o objeto "queries" em uma string no formato de query string
        // Exemplo: "limit=100&offset=0&orderBy=name%2Casc"
        const params = new URLSearchParams(queries).toString();

        const jwt = cookies("jwt");

        // Faz a requisição HTTP GET para a API de usuários com os parâmetros acima
        const { data } = await axios.get<ListApi<UserModel>>(`http://localhost:8080/api/users?${params}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        // Retorna a resposta convertida
        return data;

    } catch (error) {
        return catchError(error);
    }
}
