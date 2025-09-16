import callLoginApi from "../callLoginApi";
import renderAll from "../renderAll";
import renderUsers from "../renderUsers";

export default async (event: SubmitEvent) => {
    event.preventDefault();
    const currentElement = event.currentTarget as HTMLFormElement;

    const emailElement = currentElement.querySelector("#email") as HTMLInputElement;

    const passwordElement = currentElement.querySelector("#password") as HTMLInputElement;

    const data = await callLoginApi(emailElement.value, passwordElement.value);

    if ("error" in data) {
        return;
    }

    const { token, expires_in_seconds } = data;

    document.cookie = `jwt=${encodeURIComponent(token)}; Max-Age=${expires_in_seconds}`;

    renderAll();

    renderUsers();

}