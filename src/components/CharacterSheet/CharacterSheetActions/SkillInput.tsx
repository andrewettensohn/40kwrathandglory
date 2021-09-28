import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

interface SkillInputProps {
    skillName: string,
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const SkillInput = ({ skillName, character, updateCharacter }: SkillInputProps) => {

    const [skillValue, setSkill] = React.useState(character.Skills[skillName])
    const classes = useStyles();

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const oldValue = skillValue as number;
        const newValue = event.target.value as number;

        setSkill(newValue);
        await updateCharacterForSkillChange(newValue, oldValue)
    }

    const updateCharacterForSkillChange = async (newSkillValue: number, oldSkillValue: number): Promise<void> => {
        const update = character;
        //calculate XP change before assigning new value
        update.XP = calculateXpForSkillChange(oldSkillValue, newSkillValue, update.XP);

        update.Skills[skillName] = newSkillValue;
        await updateCharacter(update);
    }

    return (
        <TextField
            id="outlined-number"
            label={skillName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={skillValue}
            onChange={onValueChanged}
            className={classes.numberInput}
        />
    );
}