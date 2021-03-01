import { Container, Divider, Grid, IconButton } from '@material-ui/core';
import { useCallback, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Image as HomeRoundedIcon,
    FavoriteRounded as FavoriteRoundedIcon,
} from '@material-ui/icons';
import Hammer from 'hammerjs';

import ListPage from './ListPage';
import HomePage from './HomePage';
import { DataProvider, UserProfile } from './types';
import DataContext from './DataContext';
import BrokenHeartIcon from './BrokenHeartIcon';
import {
    dislikeProfile,
    gotoDislikedPage,
    gotoHomePage,
    gotoLikedPage,
    gotoNextProfile,
    initialState,
    likeProfile,
    reducer,
} from './store';
import { useGesture, useListProfiles, useProfileDetails } from './hooks';

const useStyles = makeStyles((theme) => ({
    navigation: {
        display: 'flex',
        margin: theme.spacing(2, 0),
        alignItems: 'center',
        '& hr': {
            height: 24,
            margin: theme.spacing(0, 1),
        },
    },
    containerRoot: {
        background: '#fff',
        minHeight: 580,
    },
    appShell: {
        margin: theme.spacing(2, 0),
        height: 478,
        overflow: 'auto',
    },
}));

export interface AppProps {
    dataProvider: DataProvider;
}

function App({ dataProvider }: AppProps) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const like = useCallback(() => {
        dispatch(likeProfile());
        dispatch(gotoNextProfile());
    }, [dispatch]);
    const dislike = useCallback(() => {
        dispatch(dislikeProfile());
        dispatch(gotoNextProfile());
    }, [dispatch]);
    const handleGesture = useCallback<(ev: HammerInput) => void>(
        (ev: HammerInput) => {
            if (ev.direction === Hammer.DIRECTION_LEFT) {
                dislike();
            } else if (ev.direction === Hammer.DIRECTION_RIGHT) {
                like();
            }
        },
        [like, dislike]
    );

    /**
     * Load profiles.
     */
    useListProfiles(dataProvider, state.index, state.perPage, state.pages, dispatch);

    /**
     * Load profile details.
     */
    useProfileDetails(dataProvider, state.index, state.list, dispatch);

    /**
     * Listen to swipe events.
     */
    useGesture('app-shell-container', state.loading, handleGesture);

    /**
     * Routing: home | liked | dislike.
     */
    let ele;
    if (state.route === 'liked') {
        const profiles = state.liked.map<UserProfile>((i: number) => state.list[i]);
        ele = <ListPage profiles={profiles} />;
    } else if (state.route === 'disliked') {
        const profiles = state.disliked.map<UserProfile>((i: number) => state.list[i]);
        ele = <ListPage profiles={profiles} />;
    } else {
        const profile = state.list[state.index];
        if (profile || state.loading) {
            ele = (
                <HomePage loading={state.loading} {...profile} onDislike={dislike} onLike={like} />
            );
        } else {
            ele = <div>No more profile.</div>;
        }
    }

    return (
        <DataContext.Provider value={dataProvider}>
            <Container maxWidth="xs" className={classes.containerRoot}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.navigation}>
                            <IconButton
                                data-testid="home-page"
                                edge="start"
                                onClick={() => dispatch(gotoHomePage())}
                                color={state.route === 'home' ? 'secondary' : 'primary'}
                                aria-label="go to home page">
                                <HomeRoundedIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <IconButton
                                data-testid="liked-page"
                                onClick={() => dispatch(gotoLikedPage())}
                                color={state.route === 'liked' ? 'secondary' : 'primary'}
                                aria-label="list of liked profiles">
                                <FavoriteRoundedIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <IconButton
                                data-testid="disliked-page"
                                onClick={() => dispatch(gotoDislikedPage())}
                                color={state.route === 'disliked' ? 'secondary' : 'primary'}
                                aria-label="list of disliked profiles">
                                <BrokenHeartIcon />
                            </IconButton>
                        </div>
                        <div className={classes.appShell} id="app-shell-container">
                            {ele}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </DataContext.Provider>
    );
}

export default App;
