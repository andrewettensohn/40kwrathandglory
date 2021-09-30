import { Button, Fab, Grid, List, ListItem, Modal, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { updateCharacterAtSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";
import { getSyncModels } from "../../data/RestService";
import { SyncModel } from "../../interfaces/SyncModel";
import { getCharacterFromSyncModelListForId } from "../../helpers/SyncModelHelper";
import { NameInput } from "./NameInput";
import { Casino } from "@material-ui/icons";
import { SheetActionControl } from "./SheetActionControl";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { CharacterHeader } from "./CharacterHeader";
import { CombatTraits } from "../../Classes/CombatTraits";
import { SkillChecks } from "../../Classes/SkillChecks";

const useStyles = makeStyles({
    sheetHeader: {
        minHeight: 100,
        padding: 10
    },
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    actionModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionMenu: {
        //backgroundColor: "#1d1d1d",
        margin: 16,
    },
    numberInput: {
        maxWidth: 100
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    mb25: {
        marginBottom: 25
    }
});

export const CharacterSheet = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
    const [selectedActionType, setSelectedActionType] = React.useState(ActionType.Attributes);

    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const [character, setCharacter] = React.useState({} as Character);
    const classes = useStyles();

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
        updatedCharacter.CombatTraits = new CombatTraits(updatedCharacter);
        updatedCharacter.SkillChecks = new SkillChecks(updatedCharacter);
        setCharacter(updatedCharacter);
        await updateCharacterAtSyncAPI(updatedCharacter);
    }

    const toggleModal = () => setIsActionModalOpen(!isActionModalOpen);

    const handleActionTypeSwitch = (actionType: ActionType) => {
        setSelectedActionType(actionType);
        toggleModal();
    }

    console.log(character);

    return !isLoading
        ?
        <div>
            <Grid container className={classes.mb25}>
                <Grid item xs={12}>
                    <CharacterHeader character={character} updateCharacter={setAndUpdateCharacter} />
                </Grid>
                <Grid item xs={12} className={classes.mt10}>
                    <Grid item>
                        <SheetActionControl
                            character={character}
                            syncModels={syncModels}
                            actionType={selectedActionType}
                            updateCharacter={setAndUpdateCharacter} />
                    </Grid>
                </Grid>
            </Grid>
            <Fab color="primary" className={classes.floatingActionButton} onClick={toggleModal}>
                <Casino />
            </Fab>
            <Modal
                open={isActionModalOpen}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.actionModal}
            >
                <Grid justifyContent="center" container className={classes.actionMenu}>
                    <Grid item>
                        <Paper>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Archetype)}>Archetype</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Attributes)}>Modify Attributes</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Skills)}>Modify Skills</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Weapon)}>Weapons</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Ammo)}>Ammo</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Talent)}>Talents</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Quest)}>Quests</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Combat)}>Combat</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleActionTypeSwitch(ActionType.Checks)}>Skill Checks</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Modal>
        </div>
        :
        <div></div>


}