import { Button, Grid, IconButton, List, ListItem, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../../interfaces/Character";
import { Edit } from "@material-ui/icons";
import { Archetype } from "../../../interfaces/Archetype";
import { CalculateXpForArchetype } from "../../../helpers/XPHelper";

export const ArchetypeAction = (props: {
    character: Character,
    archetypeList: Archetype[],
    updateCharacter: (character: Character) => Promise<void>
}) => {
    const [showInput, setShowInput] = React.useState(true as boolean);

    useEffect(() => {
        const characterHasArchetype = props.character.Archetype?.Id?.length > 0;
        setShowInput(!characterHasArchetype);
    }, []);

    const onArchetypeSelected = async (id: string) => {

        setShowInput(!showInput);

        const selectedArchetype = props.archetypeList.find(x => x.Id == id) as Archetype | undefined

        if (selectedArchetype !== undefined) {
            props.character.Archetype = selectedArchetype;
            props.character.XP = CalculateXpForArchetype(props.character, selectedArchetype);
            await props.updateCharacter(props.character);
        }
    }

    return showInput
        ?
        <Grid container>
            <List component="nav">
                {props.archetypeList.map(x => {
                    return (
                        <ListItem key={x.Id}>
                            <Button onClick={() => onArchetypeSelected(x.Id)}>{x.Name}</Button>
                        </ListItem>
                    );
                })}
            </List>
        </Grid>
        :
        <Grid container>
            <Grid item>
                {props.character.Archetype.Name}
            </Grid>
        </Grid>
}