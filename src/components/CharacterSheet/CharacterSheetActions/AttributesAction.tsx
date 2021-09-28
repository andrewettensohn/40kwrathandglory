import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";

interface AttributesActionProps {
    character: Character;
    updateCharacter: (character: Character) => Promise<void>
}

export const AttributesAction = ({ character, updateCharacter }: AttributesActionProps) => {

    const attributeNames = [
        "Strength",
        "Agility",
        "Toughness",
        "Intellect",
        "Willpower",
        "Fellowship",
        "Initiative"
    ];

    return (
        <Grid container spacing={3} justifyContent='center'>
            {attributeNames.map(x => {
                return (
                    <Grid item key={x}>
                        <AttributesInput
                            attributeName={x}
                            character={character}
                            updateCharacter={updateCharacter} />
                    </Grid>
                );
            })}
        </Grid>
    );
}