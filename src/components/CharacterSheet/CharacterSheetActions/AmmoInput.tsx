import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Ammo } from "../../../interfaces/Ammo";
import { Attributes } from "../../../interfaces/Attributes";
import { Character } from "../../../interfaces/Character";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

interface AmmoInputProps {
    ammoName: keyof Ammo,
    ammoValue: number,
    onValueChanged: (
        ammoName: keyof Ammo,
        newValue: number) => Promise<void>
}

export const AmmoInput = ({
    ammoName,
    ammoValue,
    onValueChanged
}: AmmoInputProps): JSX.Element => {

    const classes = useStyles();

    return (
        <TextField
            id="outlined-number"
            label={ammoName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={ammoValue}
            onChange={(e) => onValueChanged(
                ammoName,
                parseFloat(e.target.value))}
            className={classes.numberInput}
        />
    );
}