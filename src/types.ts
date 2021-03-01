export interface APIResult<T> {
    ok: boolean;
    body?: T;
    error?: string;
}

export interface UserProfile {
    id: string;
    name: string;
    picture: string;
    age?: number;
    gender?: string;
}

export type Action = {
    type: string;
    payload?: any;
};

export interface AppState {
    /**
     * List of user profiles.
     */
    list: UserProfile[];
    loading: boolean;
    /**
     * Which page is loaded will be set to true in this dictionary.
     */
    pages: {
        [key: number]: boolean;
    };
    /**
     * Current profile index that users are viewing.
     */
    index: number;
    /**
     * App error
     */
    error: string | null;
    /**
     * App route
     */
    route: 'home' | 'liked' | 'disliked';
    /*
     * Records per page.
     */
    perPage: number;
    /**
     * List of index.
     * Use it to look up for the list of liked people.
     */
    liked: number[];
    disliked: number[];
}

/**
 * Provider a way to get data from server
 */
export type DataProvider = {
    /**
     * Get list of profiles.
     */
    getList(
        page: number,
        perPage?: number
    ): Promise<
        APIResult<{
            data: {
                id: string;
                lastName: string;
                firstName: string;
                picture: string;
            }[];
            total: number;
            page: number;
        }>
    >;
    /**
     * Get a profile details
     */
    getOne(
        id: string
    ): Promise<
        APIResult<{
            id: string;
            lastName: string;
            firstName: string;
            picture: string;
            gender: string;
            dateOfBirth: string;
        }>
    >;
};
