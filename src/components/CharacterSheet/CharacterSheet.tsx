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
        backgroundColor: "#1d1d1d",
        margin: 16,
        padding: 20
    },
    numberInput: {
        maxWidth: 100
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    }
});

export const CharacterSheet = () => {
    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const [character, setCharacter] = React.useState({} as Character);
    const [isLoading, setIsLoading] = React.useState(true as boolean);
    const [isActionModalOpen, setIsActionModalOpen] = React.useState(false as boolean);
    const [selectedActionType, setSelectedActionType] = React.useState(ActionType.Archetype as ActionType);
    const classes = useStyles();

    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("id") as string;

    useEffect(() => {
        setCharacterSheetData()
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }, []);

    const setCharacterSheetData = async () => {
        await getSyncModels()
            .then((models) => {
                setSyncModels(models)
                setCharacter(getCharacterFromSyncModelListForId(models, id));
            })
    }

    const setAndUpdateCharacter = async (character: Character) => {
        setCharacter(character);
        await updateCharacterAtSyncAPI(character);
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
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.sheetHeader}>
                        <Grid justifyContent="space-between" container>
                            <Grid item>
                                <NameInput character={character} updateCharacter={setAndUpdateCharacter} />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="Rank"
                                    type="number"
                                    className={classes.numberInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={character.Rank}
                                />
                            </Grid>
                        </Grid>
                        <Grid justifyContent="space-between" container spacing={3} className={classes.mt5}>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="XP"
                                    type="number"
                                    className={classes.numberInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={character.XP}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="Tier"
                                    type="number"
                                    className={classes.numberInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={character.Tier}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
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
                        <List component="nav">
                            <ListItem>
                                <Button onClick={() => handleActionTypeSwitch(ActionType.Archetype)}>Archetype</Button>
                            </ListItem>
                            <ListItem>
                                <Button onClick={() => handleActionTypeSwitch(ActionType.Attributes)}>Attributes</Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Modal>
        </div>
        :
        <div></div>


}