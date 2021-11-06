import { Button, Card, CardActions, CardContent, ListItem, ListItemProps, ListItemText, makeStyles, Modal, Typography } from "@material-ui/core";
import React from "react";
import { deleteCharacter } from "../../data/RestService";
import { Character } from "../../interfaces/Character";
import { useAppStyles } from "../AppStyles";

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

interface CharacterListItemProps {
    character: Character,
    onDelete: (id : string) => Promise<void>
}

export const CharacterListItem = ({ character, onDelete }: CharacterListItemProps) => {
    const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
    const classes = useStyles();
    const globalClasses = useAppStyles();

    const toggleModal = () => setIsActionModalOpen(!isActionModalOpen);

    if (character) {

        return (
            <div>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{character.Name}</Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {character.Archetype?.Name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        Rank {character.Rank}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="outlined" size="small" href={`/characterSheet?id=${character.Id}`}>View</Button>
                        <Button color="secondary" variant="outlined" size="small" onClick={toggleModal}>Delete</Button>
                    </CardActions>
                </Card>
            <Modal
                open={isActionModalOpen}
                onClose={toggleModal}
                className={globalClasses.centerScreen}
            >
                <div>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography>Are you sure you want to delete this character?</Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="secondary" variant="outlined" size="small" onClick={() => onDelete(character.Id)}>Delete</Button>
                            <Button variant="outlined" size="small" onClick={toggleModal}>Cancel</Button>
                        </CardActions>
                    </Card>
                </div>
            </Modal>
            </div>
        );
    } else {
        return (<div></div>);
    }
}
