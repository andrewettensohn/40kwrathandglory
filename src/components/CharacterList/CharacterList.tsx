import { Grid, List, makeStyles } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";
import { CharacterListItem } from "./CharacterListItem";

const useStyles = makeStyles({
    scrollBox: {
        overflowY: "scroll",
        height: "75vh",
        overflowX: "hidden",
        marginLeft: 16,
        marginRight: 16
    },
});

interface CharacterListProps {
    characters: Character[]
}

export const CharacterList = ({ characters }: CharacterListProps) => {
    const classes = useStyles();

    if (characters.length > 0) {

        return (
            <div className={classes.scrollBox}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <List component="nav">
                            {characters.map(character => {
                                return (
                                    <CharacterListItem key={character.Id} character={character} />
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return (<div>No characters found.</div>);
    }
}

