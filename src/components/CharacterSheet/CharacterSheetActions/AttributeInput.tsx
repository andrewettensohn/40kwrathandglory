import { Grid, TextField } from "@material-ui/core";
import React, { } from "react";
import { Character } from "../../../interfaces/Character";

export const AttributesInput = (props: {
    attributeName: string,
    attributeValue: number,
    handleAttributeChange: (attributeName: string, newAttributeValue: number, oldAttributeValue: number) => Promise<void>
}) => {

    const [attributeValue, setAttribute] = React.useState(props.attributeValue as number)

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const oldValue = attributeValue;
        const newValue = event.target.value as number;

        setAttribute(newValue);
        await props.handleAttributeChange(props.attributeName, newValue, oldValue)
    }

    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label={props.attributeName}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={attributeValue}
                    onChange={onValueChanged}
                />
            </Grid>
        </Grid>
    );
}