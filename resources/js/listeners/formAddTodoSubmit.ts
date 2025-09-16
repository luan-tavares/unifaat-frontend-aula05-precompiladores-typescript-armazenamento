import { InsertError, TodoInsert } from "../app.types";
import callTodosInsertApi from "../callTodosInsertApi";
import renderAll from "../renderAll";

export default async (event: SubmitEvent) => {
    // Impede que o formulário recarregue a página
    event.preventDefault();


    // Pega o campo de input para o título do "todo"
    const inputTitleElement = document.getElementById("todo-title") as HTMLInputElement;
    // Pega o elemento onde serão exibidos os erros de validação
    const errorsElement = document.getElementById("add-errors") as HTMLElement;
    // Pega o elemento <select> que lista os usuários
    const selectUsersElement = document.getElementById("select-user") as HTMLSelectElement;

    // Objeto que armazenará os dados do novo "todo"
    const data: TodoInsert = {};

    // Array para guardar mensagens de erro de validação
    const errors: InsertError[] = [];

    // Valida se o título foi preenchido
    if (inputTitleElement.value == "") {
        inputTitleElement.focus(); // Dá foco no campo
        errors.push("Campo Título não pode ser vazio."); // Adiciona mensagem de erro
    }

    // Valida se um usuário foi selecionado
    if (selectUsersElement.value == "") {
        errors.push("Escolha um usuário.");
    }

    // Limpa mensagens anteriores de erro
    errorsElement.innerHTML = "";
    errorsElement.classList.add("d-none"); // Esconde a área de erros

    // Se houver erros de validação, mostra-os e encerra
    if (errors.length > 0) {
        errorsElement.classList.remove("d-none");
        errors.forEach((errorText) => {
            const divElement = document.createElement("div");
            divElement.innerText = errorText; // Adiciona o texto do erro
            errorsElement.append(divElement); // Exibe no container de erros
        });
        return; // Interrompe a execução
    }

    // Preenche o objeto de dados com título e usuário
    data.title = inputTitleElement.value;
    data.id_user = (selectUsersElement.value === "") ? ("") : (Number(selectUsersElement.value));

    // Apenas loga no console os dados que serão enviados
    console.log(data);

    // Limpa o campo de título e reseta o select de usuário
    inputTitleElement.value = "";
    selectUsersElement.value = "";

    // Faz a chamada à API para inserir o novo "todo"
    const response = await callTodosInsertApi(data);

    // Atualiza a lista de "todos" renderizados
    renderAll();
}