import { Button, Divider, FormControl, Grid, List, ListItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { getDeserializedModelsForModelType } from "../../../helpers/SyncModelHelper";
import { Armor } from "../../../interfaces/Armor";
import { Attributes } from "../../../interfaces/Attributes";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Skills } from "../../../interfaces/Skills";
import { SyncModel } from "../../../interfaces/SyncModel";
import { Talent } from "../../../interfaces/Talent";
import { Threat } from "../../../interfaces/Threat";
import { Weapon } from "../../../interfaces/Weapon";
import { useAppStyles } from "../../AppStyles";

interface ThreatInputProps {
    selectedThreat?: Threat,
    updateThreatList?(Threat: Threat): void
    isModify: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
    syncModels: SyncModel[],
}

export const ThreatInput = ({ isModify, selectedThreat, updateThreatList, toggleSaveSuccessSnackBar, syncModels }: ThreatInputProps) => {

    const setInitalThreatValues = (): Threat => {

        let initalAttributes: Attributes = {
            Strength: 0,
            Agility: 0,
            Toughness: 0,
            Intellect: 0,
            Willpower: 0,
            Fellowship: 0,
            Initiative: 0,
        };

        let initalSkills: Skills = {
            Athletics: 0,
            Awareness: 0,
            Ballistic: 0,
            Cunning: 0,
            Deception: 0,
            Insight: 0,
            Intimidation: 0,
            Investigation: 0,
            Leadership: 0,
            Medicae: 0,
            Persuasion: 0,
            Pilot: 0,
            Pyschic: 0,
            Scholar: 0,
            Stealth: 0,
            Survival: 0,
            Tech: 0,
            Weapon: 0,
        };

        let initialThreat: Threat = {
            Id: "",
            Name: "",
            Wounds: 0,
            Shock: 0,
            Defence: 0,
            Resilience: 0,
            Conviction: 0,
            Resolve: 0,
            Speed: 0,
            Size: "",
            Description: "",
            AvatarPath: "",
            Attributes: initalAttributes,
            Skills: initalSkills,
            DefaultSkill: 0,
            Armor: [],
            Talents: [],
            Weapons: [],
            PsychicPowers: [],
        };

        if (isModify && selectedThreat !== undefined && selectedThreat !== null) {
            console.log(selectedThreat);
            initialThreat = { ...selectedThreat };
        }

        return initialThreat;
    }

    const [Threat, setThreat] = React.useState(setInitalThreatValues());
    const classes = useAppStyles();
    const weaponList: Weapon[] = getDeserializedModelsForModelType(syncModels, ModelType.Weapon);
    const armorList: Armor[] = getDeserializedModelsForModelType(syncModels, ModelType.Armor);
    const talentList: Talent[] = getDeserializedModelsForModelType(syncModels, ModelType.Talent);

    const submitThreat = async () => {
        await addOrUpdateModelAtSyncAPI(Threat, ModelType.Threat);
        toggleSaveSuccessSnackBar(true);

        if (!isModify) {
            setThreat(setInitalThreatValues());
        } else if (updateThreatList !== undefined) {
            updateThreatList(Threat);
        }
    }

    const onChangeThreatString = (propertyName: string, value: string) => {
        setThreat({
            ...Threat,
            [propertyName]: value
        });
    }

    const onChangeThreatNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setThreat({
            ...Threat,
            [propertyName]: value
        });
    }

    const onChangeThreatAttributeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setThreat({
            ...Threat,
            ["Attributes"]: {
                ...Threat.Attributes,
                [propertyName]: value
            }
        });
    }

    const onChangeThreatSkillNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setThreat({
            ...Threat,
            ["Skills"]: {
                ...Threat.Skills,
                [propertyName]: value
            }
        });
    }

    const handleAddWeapon = (id: string) => {
        try {
            const selectedWeapon = weaponList.find(x => x.Id == id);

            if (selectedWeapon === undefined || Threat.Weapons.some(x => x.Id == selectedWeapon?.Id)) return;

            const newWeaponList: Weapon[] = [...Threat.Weapons];
            newWeaponList.push(selectedWeapon);

            setThreat({
                ...Threat,
                Weapons: newWeaponList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRemoveWeapon = (id: string) => {
        try {
            console.log(id);
            const selectedWeapon = weaponList.find(x => x.Id == id);

            if (selectedWeapon === undefined) return;

            const newWeaponList: Weapon[] = [...Threat.Weapons.filter(x => x.Id != selectedWeapon.Id)];

            setThreat({
                ...Threat,
                Weapons: newWeaponList
            });
            console.log(Threat);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleAddArmor = (id: string) => {
        try {
            const selectedArmor = armorList.find(x => x.Id == id);

            if (selectedArmor === undefined || Threat.Armor.some(x => x.Id == selectedArmor?.Id)) return;

            const newArmorList: Armor[] = [...Threat.Armor];
            newArmorList.push(selectedArmor);

            setThreat({
                ...Threat,
                Armor: newArmorList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRemoveArmor = (id: string) => {
        try {
            const selectedArmor = armorList.find(x => x.Id == id);

            if (selectedArmor === undefined) return;

            const newArmorList: Armor[] = [...Threat.Armor.filter(x => x.Id != selectedArmor.Id)];

            setThreat({
                ...Threat,
                Armor: newArmorList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleAddTalent = (id: string) => {
        try {
            const selectedTalent = talentList.find(x => x.Id == id);

            if (selectedTalent === undefined || Threat.Armor.some(x => x.Id == selectedTalent?.Id)) return;

            const newTalentList: Talent[] = [...Threat.Talents];
            newTalentList.push(selectedTalent);

            setThreat({
                ...Threat,
                Talents: newTalentList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRemoveTalent = (id: string) => {
        try {
            const selectedTalent = talentList.find(x => x.Id == id);

            if (selectedTalent === undefined) return;

            const newTalentList: Armor[] = [...Threat.Armor.filter(x => x.Id != selectedTalent.Id)];

            setThreat({
                ...Threat,
                Armor: newTalentList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if (isModify && (selectedThreat === null || selectedThreat === undefined)) {
        return (<div>Select a Threat to Modify.</div>);
    };

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Threat.Name} onChange={(e) => onChangeThreatString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Wounds?.toString()} onChange={(e) => onChangeThreatNumber("Wounds", parseFloat(e.target.value))} type="number" label="Wounds" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Shock?.toString()} onChange={(e) => onChangeThreatNumber("Shock", parseFloat(e.target.value))} type="number" label="Shock" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Defence?.toString()} onChange={(e) => onChangeThreatNumber("Defence", parseFloat(e.target.value))} type="number" label="Defence" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Resilience?.toString()} onChange={(e) => onChangeThreatNumber("Resilience", parseFloat(e.target.value))} type="number" label="Resilience" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Conviction?.toString()} onChange={(e) => onChangeThreatNumber("Conviction", parseFloat(e.target.value))} type="number" label="Conviction" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Resolve?.toString()} onChange={(e) => onChangeThreatNumber("Resolve", parseFloat(e.target.value))} type="number" label="Resolve" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Speed?.toString()} onChange={(e) => onChangeThreatNumber("Speed", parseFloat(e.target.value))} type="number" label="Speed" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Size} onChange={(e) => onChangeThreatString("Size", e.target.value.toString())} label="Size" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.DefaultSkill?.toString()} onChange={(e) => onChangeThreatNumber("DefaultSkill", parseFloat(e.target.value))} type="number" label="Default Skill" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Threat.Description}
                                    label="Description"
                                    onChange={(e) => onChangeThreatString("Description", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Agility?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Agility", parseFloat(e.target.value))} type="number" label="Agility" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Fellowship?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Fellowship", parseFloat(e.target.value))} type="number" label="Fellowship" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Initiative?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Initiative", parseFloat(e.target.value))} type="number" label="Initiative" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Intellect?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Intellect", parseFloat(e.target.value))} type="number" label="Intellect" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Strength?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Strength", parseFloat(e.target.value))} type="number" label="Strength" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Toughness?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Toughness", parseFloat(e.target.value))} type="number" label="Toughness" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Attributes?.Willpower?.toString()} onChange={(e) => onChangeThreatAttributeNumber("Willpower", parseFloat(e.target.value))} type="number" label="Willpower" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Athletics?.toString()} onChange={(e) => onChangeThreatSkillNumber("Athletics", parseFloat(e.target.value))} type="number" label="Athletics" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Awareness?.toString()} onChange={(e) => onChangeThreatSkillNumber("Awareness", parseFloat(e.target.value))} type="number" label="Awareness" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Ballistic?.toString()} onChange={(e) => onChangeThreatSkillNumber("Ballistic", parseFloat(e.target.value))} type="number" label="Ballistic" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Cunning?.toString()} onChange={(e) => onChangeThreatSkillNumber("Cunning", parseFloat(e.target.value))} type="number" label="Cunning" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Deception?.toString()} onChange={(e) => onChangeThreatSkillNumber("Deception", parseFloat(e.target.value))} type="number" label="Deception" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Insight?.toString()} onChange={(e) => onChangeThreatSkillNumber("Insight", parseFloat(e.target.value))} type="number" label="Insight" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Intimidation?.toString()} onChange={(e) => onChangeThreatSkillNumber("Intimidation", parseFloat(e.target.value))} type="number" label="Intimidation" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Investigation?.toString()} onChange={(e) => onChangeThreatSkillNumber("Investigation", parseFloat(e.target.value))} type="number" label="Investigation" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Leadership?.toString()} onChange={(e) => onChangeThreatSkillNumber("Leadership", parseFloat(e.target.value))} type="number" label="Leadership" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Medicae?.toString()} onChange={(e) => onChangeThreatSkillNumber("Medicae", parseFloat(e.target.value))} type="number" label="Medicae" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Persuasion?.toString()} onChange={(e) => onChangeThreatSkillNumber("Persuasion", parseFloat(e.target.value))} type="number" label="Persuasion" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Pilot?.toString()} onChange={(e) => onChangeThreatSkillNumber("Pilot", parseFloat(e.target.value))} type="number" label="Pilot" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Pyschic?.toString()} onChange={(e) => onChangeThreatSkillNumber("Pyschic", parseFloat(e.target.value))} type="number" label="Pyschic" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Scholar?.toString()} onChange={(e) => onChangeThreatSkillNumber("Scholar", parseFloat(e.target.value))} type="number" label="Scholar" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Stealth?.toString()} onChange={(e) => onChangeThreatSkillNumber("Stealth", parseFloat(e.target.value))} type="number" label="Stealth" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Survival?.toString()} onChange={(e) => onChangeThreatSkillNumber("Survival", parseFloat(e.target.value))} type="number" label="Survival" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Tech?.toString()} onChange={(e) => onChangeThreatSkillNumber("Tech", parseFloat(e.target.value))} type="number" label="Tech" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Threat.Skills?.Weapon?.toString()} onChange={(e) => onChangeThreatSkillNumber("Weapon", parseFloat(e.target.value))} type="number" label="Weapon" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Weapon List</Typography>
                            <List component="nav">
                                {weaponList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleAddWeapon(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Threat Weapons</Typography>
                            <List component="nav">
                                {Threat.Weapons.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleRemoveWeapon(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Armor List</Typography>
                            <List component="nav">
                                {armorList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleAddArmor(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Threat Armor</Typography>
                            <List component="nav">
                                {Threat.Armor.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleRemoveArmor(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Talent List</Typography>
                            <List component="nav">
                                {talentList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleAddTalent(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                        <Grid item className={classes.scrollBox} xs={4}>
                            <Typography variant="h6">Threat Talents</Typography>
                            <List component="nav">
                                {Threat.Talents.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => handleRemoveTalent(x.Id)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitThreat}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}