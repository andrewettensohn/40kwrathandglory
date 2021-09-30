import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { calculateXpForAttributeChange } from "../../../helpers/XPHelper";
import { Attributes } from "../../../interfaces/Attributes";
import { Character } from "../../../interfaces/Character";

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
                    value={attributeValue}
                    onChange={(e) => onValueChanged(
                        attributeName,
                        attributeValue,
                        parseFloat(e.target.value))}
                />
            </Grid>
        </Grid>
    );
}