import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { Skills } from "../../../interfaces/Skills";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

interface SkillInputProps {
    skillName: keyof Skills,
    skillValue: number,
    onValueChanged: (
        skillName: keyof Skills,
        oldValue: number,
        newValue: number) => Promise<void>
}

export const SkillInput = ({
    skillName,
    skillValue,
    onValueChanged
}: SkillInputProps) => {

    const classes = useStyles();

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
            onChange={(e) => onValueChanged(
                skillName,
                skillValue,
                parseFloat(e.target.value))}
            className={classes.numberInput}
        />
    );
}