import React from 'react';
import { fireEvent, screen, render, act } from '@testing-library/react';

import AppShell from '../App';
import dataProvider from '../dummyDataProvider';

/**
 * Taking snapshot of app shell
 * Take the link below to see why we need to make test functions asynchronously.
 * https://github.com/facebook/react/issues/14769
 */
describe('Test app shell', () => {
    beforeEach(async () => {
        await act(async () => {
            render(<AppShell dataProvider={dataProvider} />);
        });
    });

    test('should show Kayla', async () => {
        const age = new Date().getFullYear() - new Date('1958-08-20T08:43:07.057Z').getFullYear();
        expect(screen.getByAltText('Kayla Bredesen')).toHaveAttribute(
            'src',
            'https://randomuser.me/api/portraits/women/13.jpg'
        );
        expect(screen.getByTestId('username')).toHaveTextContent('Kayla Bredesen');
        expect(screen.getByTestId('userbio')).toHaveTextContent('Sex: femaleAge: ' + age);
    });

    test('should show Jesus and add Kayla to liked list', async () => {
        await act(async () => {
            await fireEvent.click(screen.getByTestId('btnLike'));
        });

        const age = new Date().getFullYear() - new Date('1960-08-20T08:36:37.039Z').getFullYear();
        expect(screen.getByAltText('Jesus Riley')).toHaveAttribute(
            'src',
            'https://randomuser.me/api/portraits/men/45.jpg'
        );
        expect(screen.getByTestId('username')).toHaveTextContent('Jesus Riley');
        expect(screen.getByTestId('userbio')).toHaveTextContent('Sex: maleAge: ' + age);

        await act(async () => {
            await fireEvent.click(screen.getByTestId('liked-page'));
        });

        expect(screen.queryByText('Kayla Bredesen')).not.toBe(null);
    });

    test('should show Evan, add Kayla to disliked list and add Jesus to liked list', async () => {
        await act(async () => {
            await fireEvent.click(screen.getByTestId('btnDislike'));
            await fireEvent.click(screen.getByTestId('btnLike'));
        });

        const age = new Date().getFullYear() - new Date('1988-06-25T04:31:51.701Z').getFullYear();
        expect(screen.getByTestId('username')).toHaveTextContent('Evan Roux');
        expect(screen.getByTestId('userbio')).toHaveTextContent('Sex: maleAge: ' + age);

        await act(async () => {
            await fireEvent.click(screen.getByTestId('disliked-page'));
        });

        expect(screen.queryByText('Kayla Bredesen')).not.toBe(null);

        await act(async () => {
            await fireEvent.click(screen.getByTestId('liked-page'));
        });

        expect(screen.queryByText('Jesus Riley')).not.toBe(null);
    });
});
