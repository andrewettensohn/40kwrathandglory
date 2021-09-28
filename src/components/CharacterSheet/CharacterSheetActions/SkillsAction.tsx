import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { calculateXpForAttributeChange, calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { AttributesInput } from "./AttributeInput";
import { SkillInput } from "./SkillInput";

interface SkillsActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const SkillsAction = ({ character, updateCharacter }: SkillsActionProps) => {

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
    ];

    return (
        <Grid container justifyContent='space-between' spacing={3}>
            {skillNames.map(x => {
                return (
                    <Grid item key={x}>
                        <SkillInput
                            skillName={x}
                            character={character}
                            updateCharacter={updateCharacter} />
                    </Grid>
                )
            })}
        </Grid>
    );
}