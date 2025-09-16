import callTodosUpdateApi from "../callTodosUpdateApi";
import renderAll from "../renderAll";

export default async (event: MouseEvent) => {
    // Pega o elemento <li> que recebeu o clique
    const currentElement = event.currentTarget as HTMLLIElement;
    // Lê o id do todo salvo no data-attribute
    const id = currentElement.dataset.id as string;
    // Localiza o checkbox “oculto” que reflete o estado
    const checkboxElement = currentElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    // Calcula o novo estado (toggle do atual)
    const newIsChecked = !checkboxElement.checked;
    // Atualiza o checkbox visualmente
    checkboxElement.checked = newIsChecked;

    // Envia atualização para a API (marca/desmarca como concluído)
    await callTodosUpdateApi(id, { is_checked: newIsChecked });
    // Re-renderiza a lista (mantendo a página atual)

    const divParentElement = currentElement.parentElement?.parentElement as HTMLDivElement;
    renderAll(Number(divParentElement.dataset.currentPage));
}