

import callUsersSelectListApi from "./callUsersSelectListApi";
import formAddTodoSubmit from "./listeners/formAddTodoSubmit";

export default async function () {
    // Pega o elemento do formulário de adicionar novo "todo"
    const formAddElement = document.getElementById("form-add-todo") as HTMLFormElement;

    // Pega o elemento <select> que lista os usuários
    const selectUsersElement = document.getElementById("select-user") as HTMLSelectElement;

    // Adiciona um listener para o evento de "submit" do formulário
    formAddElement.addEventListener("submit", formAddTodoSubmit);

    // Faz a chamada para buscar a lista de usuários
    const response = await callUsersSelectListApi();

    // Se houve erro na resposta, interrompe a execução
    if ("error" in response) {
        // Limpa as opções existentes no select de usuários
        selectUsersElement.innerHTML = "";
        const optionElement = document.createElement("option");
        optionElement.value = "";     // Define o valor da opção como o ID do usuário
        optionElement.innerText = response.error; // Define o texto visível como o nome do usuário
        selectUsersElement.append(optionElement); // Adiciona a opção ao select
        return;
    }


    // Limpa as opções existentes no select de usuários
    selectUsersElement.innerHTML = "";

    // Cria a opção padrão "Selecione"
    const defaultOptionElement = document.createElement("option");
    defaultOptionElement.value = "";
    defaultOptionElement.innerText = "Selecione";

    // Adiciona a opção padrão ao select
    selectUsersElement.append(defaultOptionElement);

    // Extrai as linhas (usuários) retornadas da API
    const userRows = response.rows;

    // Para cada usuário retornado, cria uma opção no select
    userRows.forEach((row) => {
        const optionElement = document.createElement("option");
        optionElement.value = row.id.toString();     // Define o valor da opção como o ID do usuário
        optionElement.innerText = row.name; // Define o texto visível como o nome do usuário
        selectUsersElement.append(optionElement); // Adiciona a opção ao select
    });


}
