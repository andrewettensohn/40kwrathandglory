import { Button, Divider, FormControl, FormControlLabel, Grid, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { Armor } from "../../../interfaces/Armor";
import { ArmorTraits } from "../../../interfaces/ArmorTraits";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { useAppStyles } from "../../AppStyles";

interface ArmorInputProps {
    selectedArmor?: Armor,
    updateArmorList?(Armor: Armor): void
    isModify: boolean,
}

export const ArmorInput = ({ isModify, selectedArmor, updateArmorList }: ArmorInputProps) => {

    const setInitalArmorValues = (): Armor => {

        const initalTraits: ArmorTraits = {
            Bulk: 0,
            Cumbersome: false,
            EreWeGo: false,
            Field: false,
            Powered: 0,
            Shield: false,
        };

        let initialArmor: Armor = {
            Id: "",
            Name: "",
            Description: "",
            AR: 0,
            Value: "",
            Keywords: "",
            IsEquipped: false,
            Traits: initalTraits
        };

        if (isModify && selectedArmor !== undefined && selectedArmor !== null) {
            initialArmor = { ...selectedArmor };

            if (initialArmor.Traits === undefined || initialArmor.Traits === undefined) {
                initialArmor = { ...initialArmor, Traits: initalTraits }
            }

        }

        return initialArmor;
    }

    const [Armor, setArmor] = React.useState(setInitalArmorValues());
    const classes = useAppStyles();

    const submitArmor = async () => {

        if (!isModify) {
            setArmor(setInitalArmorValues());
        } else if (updateArmorList !== undefined) {
            updateArmorList(Armor);
        }
    }

    const onChanArmormorString = (propertyName: string, value: string) => {
        setArmor({
            ...Armor,
            [propertyName]: value
        });
    }

    const onChanArmormorNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setArmor({
            ...Armor,
            [propertyName]: value
        });
    }

    const onChangeTraitsNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setArmor({
            ...Armor,
            ["Traits"]: {
                ...Armor.Traits,
                [propertyName]: value
            }
        });
    }

    const onChangeTraitsBool = (propertyName: string, value: boolean) => {

        setArmor({
            ...Armor,
            ["Traits"]: {
                ...Armor.Traits,
                [propertyName]: value
            }
        });
    }


    if (isModify && (selectedArmor === null || selectedArmor === undefined)) {
        return (<div>Select a Armor to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Armor.Name} onChange={(e) => onChanArmormorString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Armor.Keywords} onChange={(e) => onChanArmormorString("Keywords", e.target.value.toString())} label="Keywords" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Armor.AR?.toString()} onChange={(e) => onChanArmormorNumber("AR", parseFloat(e.target.value))} type="number" label="AR" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Armor.Value?.toString()} onChange={(e) => onChanArmormorNumber("Value", parseFloat(e.target.value))} type="number" label="Value" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Armor.Traits?.Bulk?.toString()} onChange={(e) => onChangeTraitsNumber("Bulk", parseFloat(e.target.value))} type="number" label="Bulk" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Armor.Traits?.Powered?.toString()} onChange={(e) => onChangeTraitsNumber("Powered", parseFloat(e.target.value))} type="number" label="Powered" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Armor.Description}
                                    label="Description"
                                    onChange={(e) => onChanArmormorString("Description", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Typography>Cumbersome</Typography>
                            <Switch checked={Armor.Traits?.Cumbersome} color="primary" onChange={(e) => onChangeTraitsBool("Cumbersome", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>EreWeGo</Typography>
                            <Switch checked={Armor.Traits?.EreWeGo} color="primary" onChange={(e) => onChangeTraitsBool("EreWeGo", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Field</Typography>
                            <Switch checked={Armor.Traits?.Field} color="primary" onChange={(e) => onChangeTraitsBool("Field", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Shield</Typography>
                            <Switch checked={Armor.Traits?.Shield} color="primary" onChange={(e) => onChangeTraitsBool("Shield", e.target.checked)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitArmor}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}