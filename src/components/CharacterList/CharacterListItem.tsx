import { Button, Card, CardActions, CardContent, ListItem, ListItemProps, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

interface CharacterListItemProps {
    character: Character
}

export const CharacterListItem = ({ character }: CharacterListItemProps) => {
    const classes = useStyles();

    if (character) {

        return (
            <ListItemLink href={`/characterSheet?id=${character.Id}`} key={character.Id}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{character.Name}</Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {character.Archetype.Name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Rank {character.Rank}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="outlined" size="small">View</Button>
                    </CardActions>
                </Card>
            </ListItemLink>
        );
    } else {
        return (<div></div>);
    }
}
