import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { Ammo } from "../../../interfaces/Ammo";
import { useStyles } from "../../AppStyles";

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
        <Grid container justifyContent="center">
            <Grid item>
                <TextField
                    id="outlined-number"
                    label={ammoName}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={classes.numberInput}
                    value={ammoValue.toString()}
                    onChange={(e) => onValueChanged(
                        ammoName,
                        parseFloat(e.target.value))}
                />
            </Grid>
        </Grid>
    );
}