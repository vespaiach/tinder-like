import React from 'react';
import { fireEvent, render, getByText } from '@testing-library/react';
import pic from './goi_bo.jpg';

import Profile from '../ProfileCard';

const profile: { id: string; name: string; age: number; gender: string; picture: string } = {
    id: '1',
    name: 'Toan Nguyen',
    age: 39,
    gender: 'male',
    picture: pic,
};

describe('Test profile card', () => {
    test('should render the same everytime', () => {
        const { container } = render(<Profile {...profile} onLike={() => {}} onDislike={() => {}} />);
        expect(container).toMatchSnapshot();
    });
    test('should call onLike function', () => {
        const like = jest.fn();
        const dislike = jest.fn();
        const { container } = render(<Profile {...profile} onLike={like} onDislike={dislike} />);
        fireEvent.click(getByText(container, 'Like'));

        expect(like.mock.calls.length).toBe(1);
        expect(like.mock.calls[0][0]).toBe('1');
        expect(dislike.mock.calls.length).toBe(0);
    });
    test('should call onDislike function', () => {
        const like = jest.fn();
        const dislike = jest.fn();
        const { container } = render(<Profile {...profile} onLike={like} onDislike={dislike} />);
        fireEvent.click(getByText(container, 'Dislike'));

        expect(dislike.mock.calls.length).toBe(1);
        expect(dislike.mock.calls[0][0]).toBe('1');
        expect(like.mock.calls.length).toBe(0);
    });
});
