import React from 'react';
import { fireEvent, render, getByTestId } from '@testing-library/react';

import AppShell from './App';
import { DataProvider } from './types';

jest.mock('./LikedPage');
jest.mock('./HomePage');

/**
 * Mocking dataProvider
 */
const dataProvider: DataProvider = {
    getList: (p: number) => Promise.resolve({ ok: true }),
};

/**
 * Taking snapshot of app shell
 */
describe('Test app shell', () => {
    test('should be on home page', () => {
        const { container } = render(<AppShell dataProvider={dataProvider} />);
        expect(container).toMatchSnapshot();
    });
    test('should be on liked page', () => {
        const { container } = render(<AppShell dataProvider={dataProvider} />);
        fireEvent.click(getByTestId(container, 'liked-page'));
        expect(container).toMatchSnapshot();
    });
});
