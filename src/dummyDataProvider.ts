/**
 * This dummy data provider is used for testing.
 */

import { DataProvider } from './types';

/**
 * Mocking data
 */
const list = {
    data: [
        {
            id: 'GorKRYsi8zHkLq9siyfU',
            title: 'miss',
            picture: 'https://randomuser.me/api/portraits/women/13.jpg',
            firstName: 'Kayla',
            lastName: 'Bredesen',
            email: 'kayla.bredesen@example.com',
        },
        {
            id: 'H1oN2F8v53t7GK0nQ6km',
            title: 'mr',
            lastName: 'Riley',
            firstName: 'Jesus',
            email: 'jesus.riley@example.com',
            picture: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
            id: 'I1mblOH49Po6zZKqB4xl',
            firstName: 'Evan',
            lastName: 'Roux',
            email: 'evan.roux@example.com',
            picture: 'https://randomuser.me/api/portraits/men/59.jpg',
            title: 'mr',
        },
    ],
    total: 2,
    page: 0,
};
const details: {
    [key: string]: {
        id: string;
        lastName: string;
        firstName: string;
        picture: string;
        gender: string;
        dateOfBirth: string;
    };
} = {
    GorKRYsi8zHkLq9siyfU: {
        id: 'GorKRYsi8zHkLq9siyfU',
        picture: 'https://randomuser.me/api/portraits/women/13.jpg',
        firstName: 'Kayla',
        lastName: 'Bredesen',
        gender: 'female',
        dateOfBirth: '1958-08-20T08:43:07.057Z',
    },
    H1oN2F8v53t7GK0nQ6km: {
        id: 'H1oN2F8v53t7GK0nQ6km',
        dateOfBirth: '1960-08-20T08:36:37.039Z',
        lastName: 'Riley',
        firstName: 'Jesus',
        picture: 'https://randomuser.me/api/portraits/men/45.jpg',
        gender: 'male',
    },
    I1mblOH49Po6zZKqB4xl: {
        id: 'I1mblOH49Po6zZKqB4xl',
        firstName: 'Evan',
        gender: 'male',
        lastName: 'Roux',
        dateOfBirth: '1988-06-25T04:31:51.701Z',
        picture: 'https://randomuser.me/api/portraits/men/59.jpg',
    },
};

const dataProvider: DataProvider = {
    getList: () => Promise.resolve({ ok: true, body: list }),
    getOne: (id: string) =>
        Promise.resolve({
            ok: true,
            body: details[id],
        }),
};

export default dataProvider;
