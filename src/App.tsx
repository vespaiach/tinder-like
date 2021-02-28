import { Container, Divider, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HomeRounded as HomeRoundedIcon, FavoriteRounded as FavoriteRoundedIcon } from '@material-ui/icons';

import LikedPage from './LikedPage';
import HomePage from './HomePage';
import { DataProvider } from './types';
import DataContext from './DataContext';

const useStyles = makeStyles((theme) => ({
    navigation: {
        display: 'flex',
        margin: theme.spacing(1, 0),
        alignItems: 'center',
        '& hr': {
            height: 24,
            margin: theme.spacing(0, 1),
        },
    },
    appShell: {
        margin: theme.spacing(2, 0),
    },
}));

export interface AppProps {
    dataProvider: DataProvider;
}

function App({ dataProvider }: AppProps) {
    const classes = useStyles();
    const [place, goto] = useState<'home' | 'liked'>('home');

    let ele;
    if (place === 'liked') {
        ele = <LikedPage />;
    } else {
        ele = <HomePage />;
    }

    return (
        <DataContext.Provider value={dataProvider}>
            <Container maxWidth="xs">
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.navigation}>
                            <IconButton
                                data-testid="home-page"
                                edge="start"
                                onClick={() => goto('home')}
                                color="primary"
                                aria-label="go to home page"
                            >
                                <HomeRoundedIcon />
                            </IconButton>
                            <Divider orientation="vertical" />
                            <IconButton
                                data-testid="liked-page"
                                onClick={() => goto('liked')}
                                color="primary"
                                aria-label="list of liked profiles"
                            >
                                <FavoriteRoundedIcon />
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
