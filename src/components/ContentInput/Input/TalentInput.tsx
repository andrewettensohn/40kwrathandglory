import { Button, FormControl, Grid, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Talent } from "../../../interfaces/Talent";
import { useAppStyles } from "../../AppStyles";

interface TalentInputProps {
    selectedTalent?: Talent,
    updateTalentList?(Talent: Talent): void
    isModify: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const TalentInput = ({ isModify, selectedTalent, updateTalentList, toggleSaveSuccessSnackBar }: TalentInputProps) => {

    const setInitalTalentValues = (): Talent => {

        let initialTalent: Talent = {
            Id: "",
            Name: "",
            Description: "",
            Requirements: "",
            XPCost: 0,
            ThreatOnly: false,
        };

        if (isModify && selectedTalent !== undefined && selectedTalent !== null) {
            initialTalent = { ...selectedTalent };
        }

        return initialTalent;
    }

    const [Talent, setTalent] = React.useState(setInitalTalentValues());
    const classes = useAppStyles();

    const submitArchetype = async () => {

        await addOrUpdateModelAtSyncAPI(Talent, ModelType.Talent);
        toggleSaveSuccessSnackBar(true);

        if (!isModify) {
            setTalent(setInitalTalentValues());
        } else if (updateTalentList !== undefined) {
            updateTalentList(Talent);
        }
    }

    const onChangeString = (propertyName: string, value: string) => {
        setTalent({
            ...Talent,
            [propertyName]: value
        });
    }

    const onChangeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setTalent({
            ...Talent,
            [propertyName]: value
        });
    }

    const onChangeBool = (propertyName: string, value: boolean) => {

        setTalent({
            ...Talent,
            [propertyName]: value
        });
    }

    if (isModify && (selectedTalent === null || selectedTalent === undefined)) {
        return (<div>Select a Talent to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Talent.Name} onChange={(e) => onChangeString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Talent.Requirements} onChange={(e) => onChangeString("Requirements", e.target.value.toString())} label="Requirements" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Talent.XPCost?.toString()} onChange={(e) => onChangeNumber("XPCost", parseFloat(e.target.value))} type="number" label="XP Cost" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <Typography>Shield</Typography>
                            <Switch checked={Talent?.ThreatOnly} color="primary" onChange={(e) => onChangeBool("ThreatOnly", e.target.checked)} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Talent.Description}
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