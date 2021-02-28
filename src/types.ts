export interface APIResult<T> {
    ok: boolean;
    body?: {
        data: T[];
        total: number;
        page: number;
    };
    error?: string;
}

export interface UserProfile {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    title: string;
    picture: string;
}

/**
 * Provider a way to get data from server
 */
export type DataProvider = {
    getList(page: number): Promise<APIResult<UserProfile>>;
};
