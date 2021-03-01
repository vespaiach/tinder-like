import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserProfile } from './types';

interface ListPageProps {
    profiles: UserProfile[];
}

const useStyles = makeStyles((theme) => ({
    listRoot: {},
}));

export default function ListPage({ profiles }: ListPageProps) {
    const classes = useStyles();
    return (
        <List className={classes.listRoot}>
            {profiles.map((p) => (
                <ListItem key={p.id} disableGutters>
                    <ListItemAvatar>
                        <Avatar alt={p.name} src={p.picture} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={p.name}
                        secondary={
                            <span>
                                Age: {p.age} | Gender: {p.gender}
                            </span>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}
