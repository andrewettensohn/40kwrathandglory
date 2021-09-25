import { Button, Grid, IconButton, List, ListItem, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../interfaces/Character";
import { Edit } from "@material-ui/icons";
import { Archetype } from "../../interfaces/Archetype";
import { CalculateXpForArchetype } from "../../helpers/XPHelper";
import { AttributeType } from "../../interfaces/Enumerations/AttributeType";
import { Attributes } from "../../interfaces/Attributes";

export const AttributesAction = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const [showInput, setShowInput] = React.useState(true as boolean);

    const handleAttributeChange = (attributeType: AttributeType, event: React.ChangeEvent<{ value: unknown }>) => {

        const value = event.target.value as number;
        const attributeName = attributeType.toString() as string;

        //calculate XP change
        props.character.Attributes[attributeName] = value;
        type attributeName = keyof Attributes;

        (props.character.Attributes as any)[attributeName] = value;


        props.updateCharacter(props.character);
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Strength"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Strength}
                    onChange={(x) => handleAttributeChange(AttributeType.Strength, x)}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Agility"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Agility}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Toughness"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Toughness}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Intellect"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Intellect}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Willpower"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Willpower}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Fellowship"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Fellowship}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Initiative"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={props.character.Attributes.Initiative}
                />
            </Grid>
        </Grid>
    );
}