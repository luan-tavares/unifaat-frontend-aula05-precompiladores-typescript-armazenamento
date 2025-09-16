// Importa a função que renderiza toda a tela de todos
import { ListApi, TodoModel } from "./app.types";
import aPaginationClick from "./listeners/aPaginationClick";
import renderAll from "./renderAll";

// Exporta a função que cria e retorna o componente de paginação
export default function (response: ListApi<TodoModel>, currentPage: number = 0) {
    // Cria uma lista não ordenada (<ul>) que servirá como container da paginação
    const ulElement = document.createElement("ul");
    ulElement.classList.add("pagination"); // adiciona a classe de estilo Bootstrap

    // Número total de registros retornados pela API
    const total = response.count;

    // Quantos registros por página
    const limit = response.limit;

    // Calcula o total de páginas
    // Se a divisão for exata, pega o resultado direto
    // Caso contrário, arredonda para cima
    const pages = (total % limit === 0) ? (total / limit) : (Math.floor(total / limit) + 1);

    // Cria um <li> para cada página
    for (let i = 0; i < pages; i++) {

        // Cria o item da lista
        const liElement = document.createElement("li");

        // Se for a página atual, adiciona a classe "active"
        if (currentPage == i) {
            liElement.classList.add("active");
        }

        // Adiciona a classe padrão de item de paginação
        liElement.classList.add("page-item");

        // Cria o link que representará a página
        const aElement = document.createElement("a");
        aElement.dataset.page = i.toString();        // armazena o número da página como dataset
        aElement.textContent = (i + 1).toString();     // exibe a numeração começando em 1
        aElement.classList.add("page-link"); // classe de estilo Bootstrap

        // Define o link como "#" (sem recarregar a página)
        aElement.href = "#";

        // Adiciona evento de clique para trocar de página
        aElement.addEventListener("click", aPaginationClick);

        // Coloca o <a> dentro do <li>
        liElement.append(aElement);

        // Coloca o <li> dentro do <ul>
        ulElement.append(liElement);
    }

    // Retorna o elemento <ul> pronto com toda a paginação
    return ulElement;
}
