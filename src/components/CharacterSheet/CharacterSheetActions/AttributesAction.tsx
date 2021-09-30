import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { isKeyOfAttributes } from "../../../helpers/KeyHelper";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Attributes } from "../../../interfaces/Attributes";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";

interface AttributesActionProps {
    character: Character;
    updateCharacter: (character: Character) => Promise<void>
}

export const AttributesAction = ({ character, updateCharacter }: AttributesActionProps) => {

    const onValueChanged = async (
        attributeName: keyof Attributes,
        oldValue: number,
        newValue: number
    ) => {

        await updateCharacter({
            ...character,
            XP: calculateXpForAttributeChange(
                oldValue,
                newValue,
                character.XP),
            Attributes: {
                ...character.Attributes,
                [attributeName]: newValue
            }
        });
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            {Object.entries(character.Attributes).map(([key, value]) => {
                if (isKeyOfAttributes(key, character.Attributes)) {
                    return (
                        <Grid item key={key}>
                            <AttributesInput
                                attributeName={key}
                                attributeValue={value}
                                onValueChanged={onValueChanged} />
                        </Grid>
                    );
                }
            })}
        </Grid>
    );
}