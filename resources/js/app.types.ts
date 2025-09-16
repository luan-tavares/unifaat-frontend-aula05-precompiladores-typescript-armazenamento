export type InsertError = string;

export type TodoModel = {
    id: number;
    title: string;
    is_checked: boolean;
    id_user: number;
    created_at: Date;
    updated_at: Date;
    user: UserModel;
};

export type TodoInsert = {
    title?: string;
    id_user?: number | "";
}

export type LoginApi = {
    token: string;
    expires_in_seconds: string;
}

export type UserModel = {
    id: number;
    name: string;
    email: string;
    photo: string | null;
    password: string;
    created_at: Date;
    updated_at: Date;
};

export type ListApi<T> = {
    rows: T[];
    limit: number;
    next: number | null;
    count: number;
}

export type ErrorApi = {
    error: string;
}

export type TodoUpdateRequestBody = {
    is_checked: boolean;
}