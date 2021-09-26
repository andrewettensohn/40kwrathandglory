import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { } from "react";
import { Character } from "../../../interfaces/Character";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

export const SkillInput = (props: {
    skillName: string,
    skillValue: number,
    handleSkillChange: (skillName: string, newSkillValue: number, oldSkillValue: number) => Promise<void>
}) => {

    const [attributeValue, setAttribute] = React.useState(props.skillValue as number)
    const classes = useStyles();

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const oldValue = attributeValue;
        const newValue = event.target.value as number;

        setAttribute(newValue);
        await props.handleSkillChange(props.skillName, newValue, oldValue)
    }

    return (
        <TextField
            id="outlined-number"
            label={props.skillName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={attributeValue}
            onChange={onValueChanged}
            className={classes.numberInput}
        />
    );
}