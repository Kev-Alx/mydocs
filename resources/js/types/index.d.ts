export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_autosave: boolean;
    autosave_interval: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
