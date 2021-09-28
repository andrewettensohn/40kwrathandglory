import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";

interface AttributesInputProps {
    attributeName: string,
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const AttributesInput = ({ attributeName, character, updateCharacter }: AttributesInputProps) => {

    const [attributeValue, setAttribute] = React.useState(character.Attributes[attributeName])

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const oldValue = attributeValue as number;
        const newValue = event.target.value as number;

        setAttribute(newValue);

        const update = character;
        //calculate XP change before assigning new value
        update.XP = calculateXpForAttributeChange(oldValue, newValue, update.XP);

        update.Attributes[attributeName] = newValue;
        await updateCharacter(update);
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label={attributeName}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={attributeValue}
                    onChange={onValueChanged}
                />
            </Grid>
        </Grid>
    );
}