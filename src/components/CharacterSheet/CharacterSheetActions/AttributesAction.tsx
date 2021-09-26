import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";

export const AttributesAction = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const attributeNames = [
        "Strength",
        "Agility",
        "Toughness",
        "Intellect",
        "Willpower",
        "Fellowship",
        "Initiative"
    ] as string[];

    const handleAttributeChange = async (attributeName: string, newAttributeValue: number, oldAttributeValue: number): Promise<void> => {

        //calculate XP change before assigning new value
        props.character.XP = calculateXpForAttributeChange(oldAttributeValue, newAttributeValue, props.character.XP);

        props.character.Attributes[attributeName] = newAttributeValue;
        await props.updateCharacter(props.character);
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            {attributeNames.map(x => {
                return (
                    <Grid item>
                        <AttributesInput
                            attributeName={x}
                            attributeValue={props.character.Attributes[x] as number}
                            handleAttributeChange={handleAttributeChange} />
                    </Grid>
                );
            })}
        </Grid>
    );
}