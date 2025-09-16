import callUploadPhotoApi from "../callUploadPhotoApi";

export default (() => {
    const info = document.getElementById('file-info') as HTMLDivElement;
    const wrap = document.getElementById('preview-wrap') as HTMLDivElement;
    const img = document.getElementById('preview') as HTMLImageElement;
    const MAX = 5 * 1024 * 1024; // 5 MB (opcional)

    return async (event: Event) => {

        const currentElement = event.currentTarget as HTMLInputElement;
        const file = currentElement.files?.[0];
        if (!file) return;

        // só imagem
        if (!file.type.startsWith('image/')) {
            alert('Selecione um arquivo de imagem.');
            currentElement.value = '';
            return;
        }
        // valida tamanho (opcional)
        if (file.size > MAX) {
            alert('Imagem maior que 5 MB.');
            currentElement.value = '';
            return;
        }

        const formData = new FormData;
        formData.append('image', file);       // campo "file" esperado no backend

        const data = await callUploadPhotoApi(formData);

        console.log(data);

        // mostra nome/tamanho
        info.textContent = `${file.name} — ${(file.size / 1024).toFixed(0)} KB`;
        info.classList.remove('d-none');

        // preview
        const url = URL.createObjectURL(file);
        img.src = url;
        wrap.classList.remove('d-none');

        // libera URL quando trocar
        img.onload = () => URL.revokeObjectURL(url);
    }
})();

