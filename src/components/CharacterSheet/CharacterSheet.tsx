import { Button, CircularProgress, Divider, Fab, Grid, Modal, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { updateCharacterAtSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";
import { getSyncModels } from "../../data/RestService";
import { SyncModel } from "../../interfaces/SyncModel";
import { getCharacterFromSyncModelListForId } from "../../helpers/SyncModelHelper";
import { Casino } from "@material-ui/icons";
import { SheetActionControl } from "./SheetActionControl";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { CharacterHeader } from "./CharacterHeader";
import { CombatTraits } from "../../classes/CombatTraits";
import { SkillChecks } from "../../classes/SkillChecks";
import { useAppStyles } from "../AppStyles";

export const CharacterSheet = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
    const [selectedActionType, setSelectedActionType] = React.useState(ActionType.Attributes);

    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
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

    const toggleModal = () => setIsActionModalOpen(!isActionModalOpen);

    const handleActionTypeSwitch = (actionType: ActionType) => {
        setSelectedActionType(actionType);
        toggleModal();
    }

    return !isLoading
        ?
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CharacterHeader character={character} updateCharacter={setAndUpdateCharacter} />
                </Grid>
                <Grid item xs={12} className={classes.scrollBox}>
                    <SheetActionControl
                        character={character}
                        syncModels={syncModels}
                        actionType={selectedActionType}
                        updateCharacter={setAndUpdateCharacter} />
                </Grid>
                <Grid item xs={12}>
                    <Divider className={classes.mt10} />
                </Grid>
            </Grid>
            <Fab color="primary" className={classes.floatingActionButton} onClick={toggleModal}>
                <Casino />
            </Fab>
            <Modal
                open={isActionModalOpen}
                onClose={toggleModal}
                className={classes.centerScreen}
            >
                <Paper>
                    <Grid container className={classes.mb25}>
                        <Grid container justifyContent="center" spacing={1} className={classes.mt10}>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Archetype)}>Archetype</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Checks)}>Checks</Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={1} className={classes.mt10}>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Combat)}>Combat</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Weapon)}>Weapons</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Ammo)}>Ammo</Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={1} className={classes.mt10}>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Talent)}>Talents</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Attributes)}>Attributes</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Skills)}>Skills</Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={1} className={classes.mt10}>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Armor)}>Armor</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Gear)}>Gear</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.QuickReference)}>Quick Reference</Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" spacing={1} className={classes.mt10}>
                            <Grid item>
                                <Button color="primary" variant="outlined" onClick={() => handleActionTypeSwitch(ActionType.Pyschic)}>Pyschic Powers</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </div>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>


}