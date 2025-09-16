import renderAll from "../renderAll";

export default (event: MouseEvent) => {
    event.preventDefault(); // impede o comportamento padrão do link

    const currentElement = event.currentTarget as HTMLAnchorElement;
    const page = currentElement.dataset.page as string; // pega a página clicada

    // Re-renderiza toda a lista passando a página selecionada
    renderAll(Number(page));
}