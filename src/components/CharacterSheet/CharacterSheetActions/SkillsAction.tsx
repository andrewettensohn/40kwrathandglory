import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { isKeyOfSkills } from "../../../helpers/KeyHelper";
import { calculateXpForAttributeChange, calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { Skills } from "../../../interfaces/Skills";
import { AttributesInput } from "./AttributeInput";
import { SkillInput } from "./SkillInput";

interface SkillsActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const SkillsAction = ({ character, updateCharacter }: SkillsActionProps) => {

    const onValueChanged = async (
        skillName: keyof Skills,
        oldValue: number,
        newValue: number
    ) => {

        await updateCharacter({
            ...character,
            XP: calculateXpForSkillChange(
                oldValue,
                newValue,
                character.XP),
            Skills: {
                ...character.Skills,
                [skillName]: newValue
            }
        });
    }

    return (
        <Grid container justifyContent='space-between' spacing={3}>
            {Object.entries(character.Skills).map(([key, value]) => {
                if (isKeyOfSkills(key, character.Skills)) {
                    return (
                        <Grid item key={key}>
                            <SkillInput
                                skillName={key}
                                skillValue={value}
                                onValueChanged={onValueChanged} />
                        </Grid>
                    )
                }
            })}
        </Grid>
    );
}