import React from 'react';
import { render } from '@testing-library/react';

import AppShell from '../App';
import { DataProvider } from '../types';
import body from './data.test.json';
import { act } from 'react-dom/test-utils';

/**
 * Mocking dataProvider
 */
const dataProvider: DataProvider = {
    getList: () => Promise.resolve({ ok: true, body }),
    getOne: (id) =>
        Promise.resolve({
            ok: true,
            body: {
                id,
                phone: '0700-3090279',
                lastName: 'Fiedler',
                firstName: 'Heinz-Georg',
                gender: 'male',
                picture: 'https://randomuser.me/api/portraits/men/81.jpg',
                dateOfBirth: '1974-03-12T21:15:08.878Z',
            },
        }),
};

/**
 * Taking snapshot of app shell
 * Take the link below to see why we need to make test functions asynchronously.
 * https://github.com/facebook/react/issues/14769
 */
describe('Test app shell', () => {
    test('should be on home page', async () => {
        let container;
        await act(async () => {
            const result = render(<AppShell dataProvider={dataProvider} />);
            container = result.container;
        });

        expect(container).toMatchSnapshot();
    });
});
