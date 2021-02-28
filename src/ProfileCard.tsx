import {
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteRounded as FavoriteRoundedIcon } from '@material-ui/icons';

import BrokenHeartIcon from './BrokenHeartIcon';

const useStyles = makeStyles((theme) => ({
    profileRoot: {},
}));

interface ProfileCardProps {
    id: string;
    name: string;
    gender: string;
    picture: string;
    age: number;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
}
export default function ProfileCard({ name, gender, age, picture, id, onDislike, onLike }: ProfileCardProps) {
    const classes = useStyles();
    return (
        <Card className={classes.profileRoot}>
            <CardActionArea>
                <CardMedia component="img" alt={name} height="320" image={picture} title={name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Sex: {gender}
                        <br />
                        Age: {age}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ButtonGroup disableElevation variant="contained" color="primary" fullWidth>
                    <Button
                        size="small"
                        color="primary"
                        startIcon={<BrokenHeartIcon title="Broken Heart" />}
                        onClick={() => onDislike(id)}
                    >
                        Dislike
                    </Button>
                    <Button size="small" color="primary" startIcon={<FavoriteRoundedIcon />} onClick={() => onLike(id)}>
                        Like
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
