import Hammer from 'hammerjs';
import { useEffect } from 'react';

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
