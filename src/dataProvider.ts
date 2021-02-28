import { DataProvider, APIResult, UserProfile } from './types';

const dummyDataProvider: DataProvider = {
    async getList(pg) {
        try {
            const stageOne = await fetch(`https://dummyapi.io/data/api/user?page=${pg}`, {
                headers: {
                    'app-id': process.env.REACT_APP_API_ID as string,
                },
            });
            const stageTwo = await stageOne.json();

            const result: APIResult<UserProfile> = {
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
    },
};

export default dummyDataProvider;
