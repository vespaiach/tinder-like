import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteRounded as FavoriteRoundedIcon } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';

import BrokenHeartIcon from './BrokenHeartIcon';

const useStyles = makeStyles({
    img: {
        height: 320,
    },
    cardContent: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    footerRoot: {
        paddingRight: 0,
        paddingLeft: 0,
    },
});

interface HomePageProps {
    id: string;
    name: string;
    picture: string;
    gender?: string | null;
    age?: number | null;
    loading: boolean;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
}
export default function HomePage({
    name,
    gender,
    age,
    picture,
    id,
    loading,
    onDislike,
    onLike,
}: HomePageProps) {
    const classes = useStyles();
    const loadingDetails = !gender || !age;
    return (
        <Card elevation={0}>
            {loading ? (
                <Skeleton animation="wave" variant="rect" height="320" className={classes.img} />
            ) : (
                <CardMedia
                    component="img"
                    alt={name}
                    className={classes.img}
                    image={picture}
                    title={name}
                />
            )}
            {loading ? (
                <CardContent className={classes.cardContent}>
                    <Skeleton height={68} />
                    <Skeleton />
                    <Skeleton />
                </CardContent>
            ) : (
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" data-testid="username">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" data-testid="userbio">
                        {loadingDetails ? (
                            <CircularProgress color="secondary" size={24} />
                        ) : (
                            <>
                                Sex: {gender}
                                <br />
                                Age: {age === null ? 'loadingDetails...' : age}
                            </>
                        )}
                    </Typography>
                </CardContent>
            )}
            {!loading && (
                <CardActions className={classes.footerRoot}>
                    <ButtonGroup disableElevation variant="contained" color="primary" fullWidth>
                        <Button
                            data-testid="btnDislike"
                            size="small"
                            color="primary"
                            startIcon={<BrokenHeartIcon title="Broken Heart" />}
                            onClick={() => onDislike(id)}>
                            Dislike
                        </Button>
                        <Button
                            data-testid="btnLike"
                            size="small"
                            color="primary"
                            startIcon={<FavoriteRoundedIcon />}
                            onClick={() => onLike(id)}>
                            Like
                        </Button>
                    </ButtonGroup>
                </CardActions>
            )}
        </Card>
    );
}
