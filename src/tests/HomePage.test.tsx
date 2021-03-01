import { fireEvent, getByText, render } from '@testing-library/react';

import HomePage from '../HomePage';

describe('Test HomePage component', () => {
    let like: jest.Mock<any, any>;
    let dislike: jest.Mock<any, any>;

    beforeEach(() => {
        like = jest.fn();
        dislike = jest.fn();
    });

    test('should render skeleton loader', () => {
        const { container } = render(
            <HomePage
                loading
                id="1"
                name="Toan Nguyen"
                picture="picture"
                onLike={like}
                onDislike={dislike}
            />
        );
        expect(container).toMatchSnapshot();
    });

    test('should render profile correctly', () => {
        const { container } = render(
            <HomePage
                loading={false}
                id="1"
                name="Toan Nguyen"
                picture="picture"
                onLike={like}
                onDislike={dislike}
            />
        );
        expect(container).toMatchSnapshot();
    });

    test('should call like function', () => {
        const { container } = render(
            <HomePage
                loading={false}
                id="1"
                name="Toan Nguyen"
                picture="picture"
                onLike={like}
                onDislike={dislike}
            />
        );
        fireEvent.click(getByText(container, 'Like'));

        expect(like.mock.calls.length).toBe(1);
        expect(dislike.mock.calls.length).toBe(0);
        expect(like.mock.calls[0][0]).toBe('1');
    });

    test('should call dislike function', () => {
        const { container } = render(
            <HomePage
                loading={false}
                id="1"
                name="Toan Nguyen"
                picture="picture"
                onLike={like}
                onDislike={dislike}
            />
        );
        fireEvent.click(getByText(container, 'Dislike'));

        expect(dislike.mock.calls.length).toBe(1);
        expect(like.mock.calls.length).toBe(0);
        expect(dislike.mock.calls[0][0]).toBe('1');
    });
});
