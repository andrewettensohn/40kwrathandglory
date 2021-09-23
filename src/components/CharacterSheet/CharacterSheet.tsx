import { Button, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getCharacterListFromSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";
import { getSyncModels } from "../../data/RestService";
import { SyncModel } from "../../interfaces/SyncModel";
import { getCharacterFromSyncModelListForId } from "../../helpers/SyncModelHelper";

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
});

export const CharacterSheet = () => {
    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const [character, setCharacter] = React.useState({} as Character);
    const classes = useStyles();
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("id") as string;

    useEffect(() => {
        setCharacterSheetData();
    }, []);

    const setCharacterSheetData = async () => {

        await getSyncModels()
            .then((models) => setSyncModels(models))

        setCharacter(getCharacterFromSyncModelListForId(syncModels, id));
    }

    console.log(character);

    return (
        <div>
            <Paper className={classes.formSurface}>
                <Grid justifyContent="flex-start" container>
                    <Grid item>
                        <Typography gutterBottom variant="body1">
                            {character.Name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="body1">
                            {character.Archetype?.Name}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}