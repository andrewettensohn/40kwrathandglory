import { Button, FormControl, Grid, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { PyschicPower } from "../../../interfaces/PyschicPower";
import { useAppStyles } from "../../AppStyles";

interface PyschicInputProps {
    selectedPower?: PyschicPower,
    updatePowerList?(Power: PyschicPower): void
    isModify: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const PyschicPowerInput = ({ isModify, selectedPower, updatePowerList, toggleSaveSuccessSnackBar }: PyschicInputProps) => {

    const setInitalPyschicPowerValues = (): PyschicPower => {

        let initialPower: PyschicPower = {
            Id: "",
            Name: "",
            Effect: "",
            Requirements: "",
            XPCost: 0,
            DN: 0,
            Discipline: "",
            Activation: "",
            Duration: "",
            Range: "",
            MultiTarget: false,
            Keywords: "",
            Potency: "",
        };

        if (isModify && selectedPower !== undefined && selectedPower !== null) {
            initialPower = { ...selectedPower };
        }

        return initialPower;
    }

    const [PyschicPower, setPyschicPower] = React.useState(setInitalPyschicPowerValues());
    const classes = useAppStyles();

    const submitPower = async () => {

        await addOrUpdateModelAtSyncAPI(PyschicPower, ModelType.Pyschic);
        toggleSaveSuccessSnackBar(true);

        if (!isModify) {
            setPyschicPower(setInitalPyschicPowerValues());
        } else if (updatePowerList !== undefined) {
            updatePowerList(PyschicPower);
        }
    }

    const onChangeString = (propertyName: string, value: string) => {
        setPyschicPower({
            ...PyschicPower,
            [propertyName]: value
        });
    }

    const onChangeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setPyschicPower({
            ...PyschicPower,
            [propertyName]: value
        });
    }

    const onChangeBool = (propertyName: string, value: boolean) => {

        setPyschicPower({
            ...PyschicPower,
            [propertyName]: value
        });
    }

    if (isModify && (selectedPower === null || selectedPower === undefined)) {
        return (<div>Select a PyschicPower to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={PyschicPower.Name} onChange={(e) => onChangeString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Discipline} onChange={(e) => onChangeString("Discipline", e.target.value.toString())} label="Discipline" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Requirements} onChange={(e) => onChangeString("Requirements", e.target.value.toString())} label="Requirements" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.XPCost?.toString()} onChange={(e) => onChangeNumber("XPCost", parseFloat(e.target.value))} type="number" label="XP Cost" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.DN?.toString()} onChange={(e) => onChangeNumber("DN", parseFloat(e.target.value))} type="number" label="DN" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Activation} onChange={(e) => onChangeString("Activation", e.target.value.toString())} label="Activation" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Duration} onChange={(e) => onChangeString("Duration", e.target.value.toString())} label="Duration" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Range} onChange={(e) => onChangeString("Range", e.target.value.toString())} label="Range" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={PyschicPower.Potency} onChange={(e) => onChangeString("Potency", e.target.value.toString())} label="Potency" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <Typography>Multi-Target</Typography>
                            <Switch checked={PyschicPower?.MultiTarget} color="primary" onChange={(e) => onChangeBool("MultiTarget", e.target.checked)} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={PyschicPower.Effect}
                                    label="Effect"
                                    onChange={(e) => onChangeString("Effect", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitPower}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}