import { render } from '@testing-library/react';

import ListPage from '../ListPage';

describe('Test ListPage component', () => {
    test('should render empty list', () => {
        const { container } = render(<ListPage profiles={[]} />);
        expect(container).toMatchSnapshot();
    });
    test('should render one item', () => {
        const { container } = render(
            <ListPage
                profiles={[
                    {
                        id: '1',
                        name: 'Toan Nguyen',
                        picture: 'picture',
                        age: 1,
                        gender: 'male',
                    },
                ]}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
