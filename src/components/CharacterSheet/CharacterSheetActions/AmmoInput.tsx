import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

export const AmmoInput = (props: {
    ammoName: string,
    ammoValue: number,
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}): JSX.Element => {

    const [value, setValue] = React.useState(props.character.Ammo[props.ammoName] as number);
    const classes = useStyles();

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = event.target.value as number;

        props.character.Ammo[props.ammoName] = newValue;
        setValue(newValue);
        await props.updateCharacter(props.character);
    }

    return (
        <TextField
            id="outlined-number"
            label={props.ammoName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={value}
            onChange={onValueChanged}
            className={classes.numberInput}
        />
    );
}