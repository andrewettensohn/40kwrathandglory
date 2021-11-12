import { Button, FormControl, Grid, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Weapon } from "../../../interfaces/Weapon";
import { WeaponTraits } from "../../../interfaces/WeaponTraits";
import { useAppStyles } from "../../AppStyles";

export const WeaponInput = () => {

    const setInitalWeaponValues = (): Weapon => {

        const initalTraits: WeaponTraits = {
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
            Spread: false,
            Supercharge: false,
            Unwieldy: 0,
            Waaagh: false,
            Warp: false,
        };

        const initialWeapon: Weapon = {
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
            Traits: initalTraits
        };

        return initialWeapon;
    }

    const [Weapon, setWeapon] = React.useState(setInitalWeaponValues());
    const classes = useAppStyles();

    const submitWeapon = async () => {

        console.log(Weapon);
        await addOrUpdateModelAtSyncAPI(Weapon, ModelType.Weapon);
        setWeapon(setInitalWeaponValues());
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

    const onChangeTraitsString = (propertyName: string, value: string) => {
        setWeapon({
            ...Weapon,
            ["Traits"]: {
                ...Weapon.Traits,
                [propertyName]: value
            }
        });
    }

    const onChangeTraitsNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setWeapon({
            ...Weapon,
            ["Traits"]: {
                ...Weapon.Traits,
                [propertyName]: value
            }
        });
    }

    const onChangeTraitsBool = (propertyName: string, value: boolean) => {

        setWeapon({
            ...Weapon,
            ["Traits"]: {
                ...Weapon.Traits,
                [propertyName]: value
            }
        });
    }

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
                            <TextField value={Weapon.Damage.toString()} onChange={(e) => onChangeWeaponNumber("Damage", parseFloat(e.target.value))} type="number" label="Damage" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.ED.toString()} onChange={(e) => onChangeWeaponNumber("ED", parseFloat(e.target.value))} type="number" label="ED" variant="outlined" />
                        </Grid>

                        <Grid item>
                            <TextField value={Weapon.AP.toString()} onChange={(e) => onChangeWeaponNumber("AP", parseFloat(e.target.value))} type="number" label="AP" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Arc.toString()} onChange={(e) => onChangeTraitsNumber("Arc", parseFloat(e.target.value))} type="number" label="Arc" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Blast.toString()} onChange={(e) => onChangeTraitsNumber("Blast", parseFloat(e.target.value))} type="number" label="Blast" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Heavy.toString()} onChange={(e) => onChangeTraitsNumber("Heavy", parseFloat(e.target.value))} type="number" label="Heavy" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Rad.toString()} onChange={(e) => onChangeTraitsNumber("Rad", parseFloat(e.target.value))} type="number" label="Rad" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.RapidFire.toString()} onChange={(e) => onChangeTraitsNumber("RapidFire", parseFloat(e.target.value))} type="number" label="Rapid Fire" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Rending.toString()} onChange={(e) => onChangeTraitsNumber("Rending", parseFloat(e.target.value))} type="number" label="Rending" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Unwieldy.toString()} onChange={(e) => onChangeTraitsNumber("Unwieldy", parseFloat(e.target.value))} type="number" label="Unwieldy" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Weapon.Traits.Inflict} onChange={(e) => onChangeTraitsString("Inflict", e.target.value.toString())} label="Inflict" variant="outlined" />
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
                            <Switch checked={Weapon.Traits.Agonising} color="primary" onChange={(e) => onChangeTraitsBool("Agonising", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Assualt</Typography>
                            <Switch checked={Weapon.Traits.Assualt} color="primary" onChange={(e) => onChangeTraitsBool("Assualt", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Brutal</Typography>
                            <Switch checked={Weapon.Traits.Brutal} color="primary" onChange={(e) => onChangeTraitsBool("Brutal", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Force</Typography>
                            <Switch checked={Weapon.Traits.Force} color="primary" onChange={(e) => onChangeTraitsBool("Force", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Flamer</Typography>
                            <Switch checked={Weapon.Traits.Flamer} color="primary" onChange={(e) => onChangeTraitsBool("Flamer", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Melta</Typography>
                            <Switch checked={Weapon.Traits.Melta} color="primary" onChange={(e) => onChangeTraitsBool("Melta", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Parry</Typography>
                            <Switch checked={Weapon.Traits.Parry} color="primary" onChange={(e) => onChangeTraitsBool("Parry", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Pistol</Typography>
                            <Switch checked={Weapon.Traits.Pistol} color="primary" onChange={(e) => onChangeTraitsBool("Pistol", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Reliable</Typography>
                            <Switch checked={Weapon.Traits.Reliable} color="primary" onChange={(e) => onChangeTraitsBool("Reliable", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Silent</Typography>
                            <Switch checked={Weapon.Traits.Silent} color="primary" onChange={(e) => onChangeTraitsBool("Silent", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Spread</Typography>
                            <Switch checked={Weapon.Traits.Spread} color="primary" onChange={(e) => onChangeTraitsBool("Spread", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Supercharge</Typography>
                            <Switch checked={Weapon.Traits.Supercharge} color="primary" onChange={(e) => onChangeTraitsBool("Supercharge", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Waaagh</Typography>
                            <Switch checked={Weapon.Traits.Waaagh} color="primary" onChange={(e) => onChangeTraitsBool("Waaagh", e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <Typography>Warp</Typography>
                            <Switch checked={Weapon.Traits.Warp} color="primary" onChange={(e) => onChangeTraitsBool("Warp", e.target.checked)} />
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