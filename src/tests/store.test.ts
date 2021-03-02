import { receiveProfiles, reducer, updateProfile } from '../store';
import { AppState } from '../types';

const state: AppState = {
    list: [],
    loading: true,
    pages: {},
    index: 0,
    error: '',
    route: 'home',
    perPage: 20,
    liked: [],
    disliked: [],
};

describe('Test store:', () => {
    let store: AppState;

    beforeEach(() => {
        store = reducer(state, { type: '@init' });
    });

    test('should have initial state', () => {
        expect(store).toMatchObject(state);
    });

    test('should have list of profiles', () => {
        const fresh = reducer(
            store,
            receiveProfiles([
                {
                    id: '1',
                    firstName: 'Toan',
                    lastName: 'Nguyen',
                    picture: 'picture',
                },
            ])
        );
        expect(fresh).toMatchObject({
            list: [
                {
                    id: '1',
                    name: 'Toan Nguyen',
                    picture: 'picture',
                },
            ],
            loading: true,
            pages: {},
            index: 0,
            error: '',
            route: 'home',
            perPage: 20,
            liked: [],
            disliked: [],
        });
    });

    test('should have profile updated', () => {
        let fresh = reducer(
            store,
            receiveProfiles([
                {
                    id: '1',
                    firstName: 'Toan',
                    lastName: 'Nguyen',
                    picture: 'picture',
                },
            ])
        );
        fresh = reducer(
            fresh,
            updateProfile(
                {
                    id: '1',
                    dateOfBirth: '1974-03-12T21:15:08.878Z',
                    gender: 'male',
                },
                0
            )
        );

        expect(fresh).toMatchObject({
            list: [
                {
                    id: '1',
                    name: 'Toan Nguyen',
                    picture: 'picture',
                    age:
                        new Date().getFullYear() -
                        new Date('1974-03-12T21:15:08.878Z').getFullYear(),
                    gender: 'male',
                },
            ],
            loading: true,
            pages: {},
            index: 0,
            error: '',
            route: 'home',
            perPage: 20,
            liked: [],
            disliked: [],
        });
    });
});
