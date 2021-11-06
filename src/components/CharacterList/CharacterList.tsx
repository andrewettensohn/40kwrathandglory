import { Grid, List, makeStyles } from "@material-ui/core";
import React from "react";
import { deleteCharacter } from "../../data/RestService";
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
    const [characterList, setCharacterList] = React.useState(characters);
    const classes = useStyles();

    const removeCharacterFromList = async (id : string) => {
        await deleteCharacter(id);

        let newCharacterList = [...characterList];
        
        newCharacterList = newCharacterList.filter(x => x.Id != id);

        setCharacterList(newCharacterList);
    }

    if (characterList.length > 0) {

        return (
            <div className={classes.scrollBox}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <List component="nav">
                            {characterList.map(character => {
                                return (
                                    <CharacterListItem key={character.Id} character={character} onDelete={removeCharacterFromList} />
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

