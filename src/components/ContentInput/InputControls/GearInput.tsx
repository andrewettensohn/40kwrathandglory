import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Gear } from "../../../interfaces/Gear";
import { useAppStyles } from "../../AppStyles";

export const GearInput = () => {

    const setInitalGearValues = (): Gear => {

        const initialGear: Gear = {
            Id: "",
            Name: "",
            Keywords: "",
            Description: "",
            Effect: "",
            Value: 0,
            Rarity: "",
        };

        return initialGear;
    }

    const [Gear, setGear] = React.useState(setInitalGearValues());
    const classes = useAppStyles();

    const submitArchetype = async () => {

        await addOrUpdateModelAtSyncAPI(Gear, ModelType.Gear);
        setGear(setInitalGearValues());
    }

    const onChangeString = (propertyName: string, value: string) => {
        setGear({
            ...Gear,
            [propertyName]: value
        });
    }

    const onChangeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setGear({
            ...Gear,
            [propertyName]: value
        });
    }

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Gear.Name} onChange={(e) => onChangeString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Keywords} onChange={(e) => onChangeString("Keywords", e.target.value.toString())} label="Keywords" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Rarity} onChange={(e) => onChangeString("Rarity", e.target.value.toString())} label="Rarity" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Value.toString()} onChange={(e) => onChangeNumber("Value", parseFloat(e.target.value))} type="number" label="Value" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Gear.Effect}
                                    label="Effect"
                                    onChange={(e) => onChangeString("Effect", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Gear.Description}
                                    label="Description"
                                    onChange={(e) => onChangeString("Description", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitArchetype}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}