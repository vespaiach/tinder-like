import { DataProvider, APIResult } from './types';

const handleFetch: <T>(url: string) => Promise<APIResult<T>> = async <T>(url: string) => {
    try {
        const stageOne = await fetch(url, {
            headers: {
                'app-id': process.env.REACT_APP_API_ID as string,
            },
        });
        const stageTwo = await stageOne.json();

        const result: APIResult<T> = {
            ok: stageOne.ok,
        };

        if (stageOne.ok) {
            result.body = stageTwo;
        } else {
            result.error = 'Unknown error';
        }

        return result;
    } catch (e) {
        console.error(e);
        return {
            ok: false,
            error: 'Network failure',
        };
    }
};

const dummyioDataProvider: DataProvider = {
    getList(pg, perPage = 20) {
        return handleFetch(`https://dummyapi.io/data/api/user?limit=${perPage}&page=${pg}`);
    },
    async getOne(id: string) {
        return handleFetch(`https://dummyapi.io/data/api/user/${id}`);
    },
};

export default dummyioDataProvider;
