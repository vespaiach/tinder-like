import {
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteRounded as FavoriteRoundedIcon } from '@material-ui/icons';

import BrokenHeartIcon from './BrokenHeartIcon';

const useStyles = makeStyles((theme) => ({
    profileRoot: {},
    footerRoot: {
        paddingRight: 0,
        paddingLeft: 0,
    },
}));

interface HomePageProps {
    id: string;
    name: string;
    picture: string;
    gender?: string | null;
    age?: number | null;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
}
export default function HomePage({
    name,
    gender,
    age,
    picture,
    id,
    onDislike,
    onLike,
}: HomePageProps) {
    const classes = useStyles();
    const loading = !gender || !age;
    return (
        <Card className={classes.profileRoot} elevation={0}>
            <CardActionArea>
                <CardMedia component="img" alt={name} height="320" image={picture} title={name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        {loading ? (
                            <CircularProgress color="secondary" size={24} />
                        ) : (
                            <>
                                Sex: {gender}
                                <br />
                                Age: {age === null ? 'loading...' : age}
                            </>
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.footerRoot}>
                <ButtonGroup disableElevation variant="contained" color="primary" fullWidth>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<BrokenHeartIcon title="Broken Heart" />}
                        onClick={() => onDislike(id)}>
                        Dislike
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<FavoriteRoundedIcon />}
                        onClick={() => onLike(id)}>
                        Like
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
