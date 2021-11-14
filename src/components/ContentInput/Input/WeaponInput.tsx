import { Button, FormControl, Grid, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Weapon } from "../../../interfaces/Weapon";
import { WeaponTraits } from "../../../interfaces/WeaponTraits";
import { useAppStyles } from "../../AppStyles";

interface WeaponInputProps {
    selectedWeapon?: Weapon,
    updateWeaponList?(Weapon: Weapon): void
    isModify: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const WeaponInput = ({ isModify, selectedWeapon, updateWeaponList, toggleSaveSuccessSnackBar }: WeaponInputProps) => {

    const setInitalWeaponValues = (): Weapon => {

        const initalWeaponTraits: WeaponTraits = {
            Agonising: false,
            Arc: 0,
            Assualt: false,
            Blast: 0,
            Brutal: false,
            Force: false,
            Flamer: false,
            Heavy: 0,
            Inflict: "",
            InflictDN: 0,
            Kustom: "",
            Melta: false,
            Parry: false,
            Pistol: false,
            Rad: 0,
            RapidFire: 0,
            Reliable: false,
            Rending: 0,
            Silent: false,
            Sniper: 0,
            Spread: false,
            Supercharge: false,
            Unwieldy: 0,
            Waaagh: false,
            Warp: false,
        };

        let initialWeapon: Weapon = {
            Id: "",
            Name: "",
            Description: "",
            Damage: 0,
            ED: 0,
            AP: 0,
            Salvo: "",
            Range: "",
            IsMelee: false,
            IsEquipped: false,
            Traits: "",
            WeaponTraits: initalWeaponTraits
        };

        if (isModify && selectedWeapon !== undefined && selectedWeapon !== null) {
            initialWeapon = { ...selectedWeapon };
        }

        return initialWeapon;
    }

    const [Weapon, setWeapon] = React.useState(setInitalWeaponValues());
    const classes = useAppStyles();

    const submitWeapon = async () => {
        await addOrUpdateModelAtSyncAPI(Weapon, ModelType.Weapon);
        toggleSaveSuccessSnackBar(true);

        if (!isModify) {
            setWeapon(setInitalWeaponValues());
        } else if (updateWeaponList !== undefined) {
            updateWeaponList(Weapon);
        }
    }

    const onChangeWeaponString = (propertyName: string, value: string) => {
        setWeapon({
            ...Weapon,
            [propertyName]: value
        });
    }

    const onChangeWeaponNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setWeapon({
            ...Weapon,
            [propertyName]: value
        });
    }

    const onChangeWeaponBool = (propertyName: string, value: boolean) => {

        setWeapon({
            ...Weapon,
            [propertyName]: value
        });
    }

    const onChangeWeaponTraitsString = (propertyName: string, value: string) => {
        setWeapon({
            ...Weapon,
            ["WeaponTraits"]: {
                ...Weapon.WeaponTraits,
                [propertyName]: value
            }
        });
    }

    const onChangeWeaponTraitsNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setWeapon({
            ...Weapon,
            ["WeaponTraits"]: {
                ...Weapon.WeaponTraits,
                [propertyName]: value
            }
        });
    }

    const onChangeWeaponTraitsBool = (propertyName: string, value: boolean) => {

        setWeapon({
            ...Weapon,
            ["WeaponTraits"]: {
                ...Weapon.WeaponTraits,
                [propertyName]: value
            }
        });
    }

    if (isModify && (selectedWeapon === null || selectedWeapon === undefined)) {
        return (<div>Select a Weapon to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Weapon.Name} onChange={(e) => onChangeWeaponString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Salvo
                            } onChange={(e) => onChangeWeaponString("Salvo", e.target.value.toString())} label="Salvo" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Damage?.toString()} onChange={(e) => onChangeWeaponNumber("Damage", parseFloat(e.target.value))} type="number" label="Damage" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.ED?.toString()} onChange={(e) => onChangeWeaponNumber("ED", parseFloat(e.target.value))} type="number" label="ED" variant="outlined" />
                        </Grid>

                        <Grid item>
                            <TextField value={Weapon.AP?.toString()} onChange={(e) => onChangeWeaponNumber("AP", parseFloat(e.target.value))} type="number" label="AP" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Arc?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Arc", parseFloat(e.target.value))} type="number" label="Arc" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Blast?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Blast", parseFloat(e.target.value))} type="number" label="Blast" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Heavy?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Heavy", parseFloat(e.target.value))} type="number" label="Heavy" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Rad?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Rad", parseFloat(e.target.value))} type="number" label="Rad" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.RapidFire?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("RapidFire", parseFloat(e.target.value))} type="number" label="Rapid Fire" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Rending?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Rending", parseFloat(e.target.value))} type="number" label="Rending" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Unwieldy?.toString()} onChange={(e) => onChangeWeaponTraitsNumber("Unwieldy", parseFloat(e.target.value))} type="number" label="Unwieldy" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Inflict} onChange={(e) => onChangeWeaponTraitsString("Inflict", e.target.value.toString())} label="Inflict" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.WeaponTraits?.Sniper} onChange={(e) => onChangeWeaponTraitsString("Sniper", e.target.value.toString())} label="Sniper" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Weapon.Description}
                                    label="Description"
                                    onChange={(e) => onChangeWeaponString("Description", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Typography>Is Melee Weapon</Typography>
                            <Switch checked={Weapon.IsMelee} color="primary" onChange={(e) => onChangeWeaponBool("IsMelee", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Agonising</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Agonising} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Agonising", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Assualt</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Assualt} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Assualt", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Brutal</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Brutal} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Brutal", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Force</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Force} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Force", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Flamer</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Flamer} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Flamer", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Melta</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Melta} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Melta", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Parry</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Parry} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Parry", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Pistol</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Pistol} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Pistol", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Reliable</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Reliable} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Reliable", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Silent</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Silent} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Silent", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Spread</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Spread} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Spread", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Supercharge</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Supercharge} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Supercharge", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Waaagh</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Waaagh} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Waaagh", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Warp</Typography>
                            <Switch checked={Weapon.WeaponTraits?.Warp} color="primary" onChange={(e) => onChangeWeaponTraitsBool("Warp", e.target.checked)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitWeapon}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}