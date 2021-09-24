import { Button, Fab, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Modal, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getCharacterListFromSyncAPI, updateCharacterAtSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";
import { getSyncModels } from "../../data/RestService";
import { SyncModel } from "../../interfaces/SyncModel";
import { getCharacterFromSyncModelListForId } from "../../helpers/SyncModelHelper";
import { NameInput } from "./NameInput";
import { Casino, Edit, Widgets } from "@material-ui/icons";

const useStyles = makeStyles({
    formSurface: {
        minHeight: 100,
        padding: 10
    },
    stateFormControl: {
        minWidth: 150,
    },
    searchTextFormControl: {
        minWidth: 300,
    },
    pos: {
        marginBottom: 50,
        marginTop: 25
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
    }
});

export const CharacterSheet = () => {
    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const [character, setCharacter] = React.useState({} as Character);
    const [isLoading, setIsLoading] = React.useState(true as boolean);
    const [isActionModalOpen, setIsActionModalOpen] = React.useState(false as boolean);
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

    console.log(character);

    return !isLoading
        ?
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.formSurface}>
                        <Grid justifyContent="flex-start" container>
                            <Grid item>
                                <NameInput character={character} updateCharacter={setAndUpdateCharacter} />
                            </Grid>
                        </Grid>
                        <Grid justifyContent="flex-start" container>
                            <Grid item>
                                <Typography gutterBottom variant="caption">
                                    {character.Archetype?.Name}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <Grid justifyContent="flex-start" container>
                        <Grid item>
                            <TextField
                                id="outlined-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value
                            />
                        </Grid>
                    </Grid> */}
                    </Paper>
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
                                <ListItemText primary="Archetype" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Attributes" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Modal>
        </div>
        :
        <div></div>


}