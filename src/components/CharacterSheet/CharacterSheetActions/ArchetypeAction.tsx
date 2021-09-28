import { Button, Grid, IconButton, List, ListItem, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../../interfaces/Character";
import { Edit } from "@material-ui/icons";
import { Archetype } from "../../../interfaces/Archetype";
import { CalculateXpForArchetype } from "../../../helpers/XPHelper";

interface ArchetypeActionProps {
    character: Character,
    archetypeList: Archetype[],
    updateCharacter: (character: Character) => Promise<void>
}

export const ArchetypeAction = ({ character, archetypeList, updateCharacter }: ArchetypeActionProps) => {
    const [showInput, setShowInput] = React.useState(true);

    useEffect(() => {
        const characterHasArchetype = character.Archetype?.Id?.length > 0;
        setShowInput(!characterHasArchetype);
    }, []);

    const onArchetypeSelected = async (id: string) => {

        setShowInput(!showInput);

        const selectedArchetype = archetypeList.find(x => x.Id == id) as Archetype | undefined

        if (selectedArchetype !== undefined) {
            const update = character;
            update.Archetype = selectedArchetype;
            update.XP = CalculateXpForArchetype(update, selectedArchetype);
            await updateCharacter(update);
        }
    }

    return showInput
        ?
        <Grid container>
            <List component="nav">
                {archetypeList.map(x => {
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
                {character.Archetype.Name}
            </Grid>
        </Grid>
}