import Hammer from 'hammerjs';
import { useEffect } from 'react';
import { appDone, appError, appLoading, pageLoaded, receiveProfiles, updateProfile } from './store';
import { Action, DataProvider, UserProfile } from './types';

export function useGesture(
    elementId: string,
    appLoading: boolean,
    handle: (event: HammerInput) => void
) {
    useEffect(() => {
        if (!appLoading) {
            const elem = document.getElementById(elementId);
            if (elem) {
                const hammerManager = new Hammer.Manager(elem, {
                    recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]],
                });
                hammerManager.off('swipe', handle);
                hammerManager.on('swipe', handle);
            }
        }
    }, [appLoading, elementId, handle]);
}

/**
 * Load user's profile details.
 */
export function useProfileDetails(
    dataProvider: DataProvider,
    index: number,
    list: UserProfile[],
    dispatch: (a: Action) => void
) {
    useEffect(() => {
        const profile = list[index];
        if (profile && (!profile.gender || !profile.age)) {
            dataProvider.getOne(profile.id).then((result) => {
                if (result.ok && result.body) {
                    dispatch(updateProfile(result.body, index));
                }
            });
        }
    }, [index, list, dataProvider, dispatch]);
}

/**
 * Load list of user's profiles.
 */
export function useListProfiles(
    dataProvider: DataProvider,
    index: number,
    perPage: number,
    pages: { [key: number]: boolean },
    dispatch: (a: Action) => void
) {
    useEffect(() => {
        /**
         * Calculate which page the profile index is in
         */
        let page =
            (index + 1) % perPage === 0
                ? (index + 1) / perPage
                : Math.floor((index + 1) / perPage) + 1;

        /**
         * Load page data if it hasn't loaded yet.
         */
        if (!pages[page]) {
            dispatch(appLoading());
            dataProvider
                .getList(page)
                .then((result) => {
                    if (result.ok && result.body) {
                        dispatch(receiveProfiles(result.body.data));
                        dispatch(pageLoaded(page));
                    } else {
                        dispatch(appError(result.error || 'Unknown error'));
                    }
                })
                .catch(() => {
                    dispatch(appError('Unexpected error'));
                })
                .finally(() => {
                    dispatch(appDone());
                });
        }
    }, [index, perPage, dataProvider, pages, dispatch]);
}
