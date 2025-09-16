
// Importa a função que chama a API para buscar a lista de usuários
import callLoginApi from "./callLoginApi";
import callUsersSelectListApi from "./callUsersSelectListApi";
import formAddTodoSubmit from "./listeners/formAddTodoSubmit";
import formLoginSubmit from "./listeners/formLoginSubmit";

// Importa a função que renderiza todos os itens de "todos" na tela
import renderAll from "./renderAll";
import renderUsers from "./renderUsers";


// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", async (event) => {


    const formLoginElement = document.getElementById("form-login") as HTMLFormElement;

    formLoginElement.addEventListener("submit", formLoginSubmit);

    // Renderiza todos os "todos" existentes na tela
    renderAll();

    renderUsers();
});
