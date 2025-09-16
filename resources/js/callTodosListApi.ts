import axios, { AxiosError } from 'axios';
import { ListApi, TodoModel } from './app.types';
import catchError from './services/catchError';
import cookies from './services/cookies';

// Exporta a função assíncrona como padrão, recebendo "limit" e "page" (com valor padrão 0)
export default async function (limit: number, page: number = 0) {
    try {

        // Cria o objeto com os parâmetros da query string
        const queries = {
            limit: limit.toString(),              // quantidade de registros por página
            offset: (limit * page).toString(),      // deslocamento (skip) calculado pelo limite x página
            orderBy: "id,desc"         // ordenação decrescente pelo campo "id"
        };


        const jwt = cookies("jwt");


        // Converte o objeto de queries em string no formato de URL (ex: limit=10&offset=20&orderBy=id,desc)
        const params = new URLSearchParams(queries).toString();

        // Faz uma requisição HTTP GET para a API de "todos" com os parâmetros de paginação e ordenação
        const { data } = await axios.get<ListApi<TodoModel>>("http://localhost:8080/api/todos?" + params, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        return data;

    } catch (error) {

        return catchError(error);
    }

}
