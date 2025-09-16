import axios from "axios";
import catchError from "./services/catchError";
import { UploadImageApi } from "./app.types";
import cookies from "./services/cookies";

// Exporta a função assíncrona como padrão, recebendo o parâmetro "id"
export default async function (formData: FormData) {
    try {
        const jwt = cookies("jwt");

        const { data } = await axios.post<UploadImageApi>(`http://localhost:8080/api/users/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${jwt}`
            }
        });

        return data;

    } catch (error) {
        return catchError(error);
    }
}
