import { Grid, List } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";
import { CharacterListItem } from "./CharacterListItem";

export const CharacterList = (props: { characters: Character[]; }) => {

    if (props.characters.length > 0) {

        return (
            <Grid container justifyContent="center">
                <Grid item>
                    <List component="nav">
                        {props.characters.map(character => {
                            return (
                                <CharacterListItem character={character} key={character.Id} />
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        );
    } else {
        return (<div></div>);
    }
}