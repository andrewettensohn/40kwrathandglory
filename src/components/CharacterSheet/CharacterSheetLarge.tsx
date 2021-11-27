import { AppBar, CircularProgress, Grid, Tab } from "@material-ui/core";
import React, { useEffect } from "react";
import { updateCharacterAtSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";
import { getSyncModels } from "../../data/RestService";
import { SyncModel } from "../../interfaces/SyncModel";
import { getCharacterFromSyncModelListForId, getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { CombatTraits } from "../../classes/CombatTraits";
import { SkillChecks } from "../../classes/SkillChecks";
import { useAppStyles } from "../AppStyles";
import { AttributesAction } from "./CharacterSheetActions/AttributesAction";
import { CharacterHeaderLarge } from "./CharacterHeaderLarge";
import { SkillsAction } from "./CharacterSheetActions/SkillsAction";
import { SkillsCheckAction } from "./CharacterSheetActions/SkillsCheckAction";
import { CombatAction } from "./CharacterSheetActions/CombatAction";
import { ArchetypeAction } from "./CharacterSheetActions/ArchetypeAction";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { WeaponAction } from "./CharacterSheetActions/WeaponAction";
import { GearAction } from "./CharacterSheetActions/GearAction";
import { ArmorAction } from "./CharacterSheetActions/ArmorAction";
import { TalentAction } from "./CharacterSheetActions/TalentAction";
import { AmmoAction } from "./CharacterSheetActions/AmmoAction";
import { QuickReference } from "./CharacterSheetActions/QuickReference";

export const CharacterSheetLarge = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const [leftTabSelection, setLeftTabSelection] = React.useState("1");
    const [rightTabSelection, setRightTabSelection] = React.useState("1");
    const [character, setCharacter] = React.useState({} as Character);
    const classes = useAppStyles();

    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("id") as string;

    useEffect(() => {

        if (syncModels?.length <= 0) {
            setCharacterSheetData()
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        }
    }, []);

    const setCharacterSheetData = async () => {
        await getSyncModels()
            .then((models) => {
                setSyncModels(models)
                setCharacter(getCharacterFromSyncModelListForId(models, id));
            });
    }

    const setAndUpdateCharacter = async (updatedCharacter: Character) => {
        updatedCharacter.CombatTraits = new CombatTraits({ ...character });
        updatedCharacter.SkillChecks = new SkillChecks({ ...character });
        setCharacter(updatedCharacter);
        await updateCharacterAtSyncAPI(updatedCharacter);
    }

    const handleLeftTabSelectionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLeftTabSelection(newValue.toString());
    };

    const handleRightTabSelectionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setRightTabSelection(newValue.toString());
    };

    return !isLoading
        ?
        <div>
            <Grid container>
                <Grid item>
                    <CharacterHeaderLarge character={character} updateCharacter={setAndUpdateCharacter} />
                </Grid>
                <Grid item xs={6} className={classes.mt10}>
                    <ArchetypeAction
                        character={character}
                        updateCharacter={setAndUpdateCharacter}
                        archetypeList={getDeserializedModelsForModelType(syncModels, ModelType.Archetype)} />
                </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.mt10}>
                <Grid item lg={6}>
                    <TabContext value={leftTabSelection}>
                        <AppBar position="static" color="default" className={classes.m3}>
                            <TabList onChange={handleLeftTabSelectionChange} >
                                <Tab label="Checks" value="1" />
                                <Tab label="Modify Skills" value="2" />
                                <Tab label="Modify Attributes" value="3" />
                                <Tab label="Reference" value="4" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <Grid container className={classes.scrollBoxLargeScreen} spacing={2}>
                                <Grid item xs={6}>
                                    <SkillsCheckAction updateCharacter={setAndUpdateCharacter} character={character} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CombatAction updateCharacter={setAndUpdateCharacter} character={character} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item className={classes.mt5}>
                                    <SkillsAction character={character} updateCharacter={setAndUpdateCharacter} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="3">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item className={classes.mt5}>
                                    <AttributesAction
                                        character={character}
                                        updateCharacter={setAndUpdateCharacter} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="4">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item className={classes.mt5}>
                                    <QuickReference />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Grid>
                <Grid item lg={6}>
                    <TabContext value={rightTabSelection}>
                        <AppBar position="static" color="default" className={classes.m3}>
                            <TabList onChange={handleRightTabSelectionChange} >
                                <Tab label="Weapons" value="1" />
                                <Tab label="Gear" value="2" />
                                <Tab label="Armor" value="3" />
                                <Tab label="Talents" value="4" />
                                <Tab label="Ammo" value="5" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item>
                                    <WeaponAction
                                        weaponsList={getDeserializedModelsForModelType(syncModels, ModelType.Weapon)}
                                        character={character}
                                        updateCharacter={setAndUpdateCharacter} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item>
                                    <GearAction gearList={getDeserializedModelsForModelType(syncModels, ModelType.Gear)} updateCharacter={setAndUpdateCharacter} character={character} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="3">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item>
                                    <ArmorAction armorList={getDeserializedModelsForModelType(syncModels, ModelType.Armor)} updateCharacter={setAndUpdateCharacter} character={character} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="4">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item>
                                    <TalentAction character={character} updateCharacter={setAndUpdateCharacter} talentList={getDeserializedModelsForModelType(syncModels, ModelType.Talent)} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="5">
                            <Grid container className={classes.scrollBoxLargeScreen}>
                                <Grid item className={classes.mt5}>
                                    <AmmoAction character={character} updateCharacter={setAndUpdateCharacter} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </div>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>


}