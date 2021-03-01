import { CircularProgress, Container, Divider, Grid, IconButton } from '@material-ui/core';
import { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Image as HomeRoundedIcon,
    FavoriteRounded as FavoriteRoundedIcon,
} from '@material-ui/icons';

import ListPage from './ListPage';
import HomePage from './HomePage';
import { DataProvider, UserProfile } from './types';
import DataContext from './DataContext';
import BrokenHeartIcon from './BrokenHeartIcon';
import {
    appDone,
    appError,
    appLoading,
    dislikeProfile,
    gotoDislikedPage,
    gotoHomePage,
    gotoLikedPage,
    gotoNextProfile,
    initialState,
    likeProfile,
    pageLoaded,
    receiveProfiles,
    reducer,
    updateProfile,
} from './store';

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

    useEffect(() => {
        /**
         * Calculate which page the profile index is in
         */
        let page =
            (state.index + 1) % state.perPage === 0
                ? (state.index + 1) / state.perPage
                : Math.floor((state.index + 1) / state.perPage) + 1;

        /**
         * Load page data if it hasn't loaded yet.
         */
        if (!state.pages[page]) {
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
    }, [state.index, state.perPage, dataProvider, state.pages]);

    /**
     * Load profile details.
     */
    useEffect(() => {
        const profile = state.list[state.index];
        if (profile && (!profile.gender || !profile.age)) {
            dataProvider.getOne(profile.id).then((result) => {
                if (result.ok && result.body) {
                    dispatch(updateProfile(result.body, state.index));
                }
            });
        }
    }, [state.index, state.list, dataProvider]);

    /**
     * Routing: home | liked | dislike
     */
    let ele;
    if (state.loading) {
        ele = <CircularProgress />;
    } else if (state.route === 'liked') {
        const profiles = state.liked.map<UserProfile>((i: number) => state.list[i]);
        ele = <ListPage profiles={profiles} />;
    } else if (state.route === 'disliked') {
        const profiles = state.disliked.map<UserProfile>((i: number) => state.list[i]);
        ele = <ListPage profiles={profiles} />;
    } else {
        const profile = state.list[state.index];
        if (profile) {
            ele = (
                <HomePage
                    {...profile}
                    onDislike={() => {
                        dispatch(dislikeProfile());
                        dispatch(gotoNextProfile());
                    }}
                    onLike={() => {
                        dispatch(likeProfile());
                        dispatch(gotoNextProfile());
                    }}
                />
            );
        } else {
            ele = <div>No profile</div>;
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
                        <div className={classes.appShell}>{ele}</div>
                    </Grid>
                </Grid>
            </Container>
        </DataContext.Provider>
    );
}

export default App;
