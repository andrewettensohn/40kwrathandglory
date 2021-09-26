import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";

export const AttributesAction = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const handleAttributeChange = async (attributeName: string, newAttributeValue: number, oldAttributeValue: number): Promise<void> => {

        //calculate XP change before assigning new value
        props.character.XP = calculateXpForAttributeChange(oldAttributeValue, newAttributeValue, props.character.XP);

        props.character.Attributes[attributeName] = newAttributeValue;
        await props.updateCharacter(props.character);
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item>
                <AttributesInput
                    attributeName="Strength"
                    attributeValue={props.character.Attributes.Strength}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Agility"
                    attributeValue={props.character.Attributes.Agility}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Toughness"
                    attributeValue={props.character.Attributes.Toughness}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Intellect"
                    attributeValue={props.character.Attributes.Intellect}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Willpower"
                    attributeValue={props.character.Attributes.Willpower}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Fellowship"
                    attributeValue={props.character.Attributes.Fellowship}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>
            <Grid item>
                <AttributesInput
                    attributeName="Initiative"
                    attributeValue={props.character.Attributes.Initiative}
                    handleAttributeChange={handleAttributeChange} />
            </Grid>

        </Grid>
    );
}