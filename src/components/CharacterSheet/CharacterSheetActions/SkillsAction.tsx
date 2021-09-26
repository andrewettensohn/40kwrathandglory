import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { calculateXpForAttributeChange, calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";
import { SkillInput } from "./SkillInput";

export const SkillsAction = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const skillNames = ["Athletics",
        "Awareness",
        "Ballistic",
        "Cunning",
        "Deception",
        "Insight",
        "Intimidation",
        "Investigation",
        "Leadership",
        "Persuasion",
        "Pilot",
        "Pyschic",
        "Scholar",
        "Stealth",
        "Survival",
        "Tech",
        "Weapon"
    ] as string[];

    const handleSkillChange = async (skillName: string, newSkillValue: number, oldSkillValue: number): Promise<void> => {

        //calculate XP change before assigning new value
        props.character.XP = calculateXpForSkillChange(oldSkillValue, newSkillValue, props.character.XP);

        props.character.Skills[skillName] = newSkillValue;
        await props.updateCharacter(props.character);
    }

    return (
        <Grid container justifyContent='space-between' spacing={3}>
            {skillNames.map(x => {
                return (
                    <Grid item key={x}>
                        <SkillInput
                            skillName={x}
                            skillValue={props.character.Skills[x] as number}
                            handleSkillChange={handleSkillChange} />
                    </Grid>
                )
            })}
        </Grid>
    );
}