import { Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Attributes } from "../../../interfaces/Attributes";
import { Character } from "../../../interfaces/Character";
import { useStyles } from "../../AppStyles";

interface AttributesInputProps {
    attributeName: keyof Attributes,
    attributeValue: number,
    onValueChanged: (
        attributeName: keyof Attributes,
        oldValue: number,
        newValue: number) => Promise<void>
}

export const AttributesInput = ({
    attributeName,
    attributeValue,
    onValueChanged
}: AttributesInputProps) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label={attributeName}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={classes.numberInput}
                    value={attributeValue.toString()}
                    onChange={(e) => onValueChanged(
                        attributeName,
                        attributeValue,
                        parseInt(e.target.value))}
                />
            </Grid>
        </Grid>
    );
}