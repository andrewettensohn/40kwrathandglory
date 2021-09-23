import { Grid } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";
import { CharacterListItem } from "./CharacterListItem";

export const CharacterList = (props: { characters: Character[]; }) => {

    if (props.characters.length > 0) {

        return (
            <Grid container justifyContent="center">
                {props.characters.map(character => {
                    return (
                        <Grid key={character.Id} item xs={12}>
                            <CharacterListItem character={character} />
                        </Grid>
                    )
                })}
            </Grid>
        );
    } else {
        return (<div></div>);
    }
}