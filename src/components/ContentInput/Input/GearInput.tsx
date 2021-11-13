import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Gear } from "../../../interfaces/Gear";
import { useAppStyles } from "../../AppStyles";

interface GearInputProps {
    selectedGear?: Gear,
    updateGearList?(gear: Gear): void
    isModify: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const GearInput = ({ isModify, selectedGear, updateGearList, toggleSaveSuccessSnackBar }: GearInputProps) => {

    const setInitalGearValues = (): Gear => {

        let initialGear: Gear = {
            Id: "",
            Name: "",
            Keywords: "",
            Description: "",
            Effect: "",
            Value: 0,
            Rarity: "",
        };

        if (isModify && selectedGear !== undefined && selectedGear !== null) {
            initialGear = { ...selectedGear };
        }

        return initialGear;
    };

    const [Gear, setGear] = React.useState(setInitalGearValues());
    const classes = useAppStyles();

    const submitArchetype = async () => {

        await addOrUpdateModelAtSyncAPI(Gear, ModelType.Gear);
        toggleSaveSuccessSnackBar(true);

        if (!isModify) {
            setGear(setInitalGearValues());
        } else if (updateGearList !== undefined) {
            updateGearList(Gear);
        }
    };

    const onChangeString = (propertyName: string, value: string) => {
        setGear({
            ...Gear,
            [propertyName]: value
        });
    };

    const onChangeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setGear({
            ...Gear,
            [propertyName]: value
        });
    };

    if (isModify && (selectedGear === null || selectedGear === undefined)) {
        return (<div>Select a Gear to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Gear.Name?.toString()} onChange={(e) => onChangeString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Keywords?.toString()} onChange={(e) => onChangeString("Keywords", e.target.value.toString())} label="Keywords" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Rarity?.toString()} onChange={(e) => onChangeString("Rarity", e.target.value.toString())} label="Rarity" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Gear.Value?.toString()} onChange={(e) => onChangeNumber("Value", parseFloat(e.target.value))} type="number" label="Value" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Gear.Effect?.toString()}
                                    label="Effect"
                                    onChange={(e) => onChangeString("Effect", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Gear.Description?.toString()}
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
};