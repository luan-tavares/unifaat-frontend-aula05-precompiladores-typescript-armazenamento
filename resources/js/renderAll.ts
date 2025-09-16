// Importa a função que faz a chamada para a API de listagem de todos
import callTodosListApi from "./callTodosListApi";

// Importa a função que renderiza a paginação
import renderPagination from "./renderPagination";

// Importa a função que renderiza os todos na tela
import renderTodos from "./renderTodos";


// Exporta a função assíncrona como padrão, recebendo a página atual (default = 0)
export default async function (currentPage = 0) {
    // Define o número máximo de registros por página
    const limit = 10;

    // Pega o elemento HTML que exibirá os todos
    const todosDivElement = document.getElementById("todos") as HTMLDivElement;

    // Salva a página atual como atributo data no elemento
    todosDivElement.dataset.currentPage = currentPage.toString();

    // Pega o elemento HTML onde será renderizada a paginação
    const todosPaginationElement = document.getElementById("pagination") as HTMLElement;

    // Chama a API de listagem de todos passando limite e página atual
    const response = await callTodosListApi(limit, currentPage);

    // Mostra no console a resposta da API (debug)
    console.log(response);

    // Limpa o conteúdo anterior da área de todos
    todosDivElement.innerHTML = "";

    // Limpa o conteúdo anterior da área de paginação
    todosPaginationElement.innerHTML = "";

    // Se houver erro na resposta, exibe mensagem e interrompe
    if ("error" in response) {
        todosDivElement.innerHTML = response.error;
        return;
    }

    const formLoginElement = document.getElementById("form-login") as HTMLFormElement | null;

    formLoginElement && formLoginElement.remove();

    // Renderiza os todos da página atual e adiciona no elemento principal
    todosDivElement.append(renderTodos(response, currentPage));

    // Renderiza a paginação com base na resposta e adiciona no elemento de paginação
    todosPaginationElement.append(renderPagination(response, currentPage));
}
