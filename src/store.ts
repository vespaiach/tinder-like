import { Action, AppState } from './types';

const HOME_PAGE = 'go to home page';
const LIKED_PAGE = 'go to liked page';
const DISLIKED_PAGE = 'go to disliked page';
const LOADING_ON = 'app loading';
const LOADING_OFF = 'app not loading';
const NEXT_PROFILE = 'got to next profile';
const APP_ERROR = 'set app error';
const PAGE_LOADED = 'page loaded';
const RECEIVE_PROFILE = 'receive profiles';
const UPDATE_PROFILE = 'update user profile';
const LIKED_PROFILE = 'like a profile';
const DISLIKED_PROFILE = 'dislike a profile';

export const gotoHomePage = (): Action => ({ type: HOME_PAGE });
export const gotoLikedPage = (): Action => ({ type: LIKED_PAGE });
export const gotoDislikedPage = (): Action => ({ type: DISLIKED_PAGE });
export const appLoading = (): Action => ({ type: LOADING_ON });
export const appDone = (): Action => ({ type: LOADING_OFF });
export const appError = (error: string): Action => ({ type: APP_ERROR, payload: error });
export const gotoNextProfile = (): Action => ({ type: NEXT_PROFILE });
export const pageLoaded = (page: number): Action => ({ type: PAGE_LOADED, payload: page });
export const receiveProfiles = (
    profiles: { id: string; firstName: string; lastName: string; picture: string }[]
): Action => ({
    type: RECEIVE_PROFILE,
    payload: profiles,
});
export const updateProfile = (
    profile: {
        id: string;
        gender: string;
        dateOfBirth: string;
    },
    index: number
): Action => ({
    type: UPDATE_PROFILE,
    payload: { profile, index },
});
export const likeProfile = (): Action => ({ type: LIKED_PROFILE });
export const dislikeProfile = (): Action => ({ type: DISLIKED_PROFILE });

export const initialState: AppState = {
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

export function reducer(state = initialState, action: Action): AppState {
    switch (action.type) {
        case HOME_PAGE:
            return { ...state, route: 'home' };
        case LIKED_PAGE:
            return { ...state, route: 'liked' };
        case DISLIKED_PAGE:
            return { ...state, route: 'disliked' };
        case RECEIVE_PROFILE:
            return {
                ...state,
                list: state.list.concat(
                    action.payload.map(
                        (it: {
                            id: string;
                            firstName: string;
                            lastName: string;
                            picture: string;
                        }) => ({
                            id: it.id,
                            name: `${it.firstName} ${it.lastName}`,
                            picture: it.picture,
                        })
                    )
                ),
            };
        case LOADING_ON:
            return { ...state, loading: true };
        case LOADING_OFF:
            return { ...state, loading: false };
        case APP_ERROR:
            return { ...state, error: action.payload };
        case NEXT_PROFILE:
            return { ...state, index: state.index + 1 };
        case PAGE_LOADED:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload as number]: true,
                },
            };
        /**
         * Update user's date of birth
         */
        case UPDATE_PROFILE: {
            const profile = state.list[action.payload.index];
            if (profile && profile.id === action.payload.profile.id) {
                profile.age =
                    new Date().getFullYear() -
                    new Date(action.payload.profile.dateOfBirth).getFullYear();
                profile.gender = action.payload.profile.gender;
                return { ...state };
            }
            return state;
        }
        case LIKED_PROFILE:
            return { ...state, liked: state.liked.concat([state.index]) };
        case DISLIKED_PROFILE:
            return { ...state, disliked: state.disliked.concat([state.index]) };
        default:
            return state;
    }
}
