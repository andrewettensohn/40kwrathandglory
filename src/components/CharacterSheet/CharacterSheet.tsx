import { Button, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getCharacterListFromSyncAPI } from "../../data/SyncModelService";
import { Character } from "../../interfaces/Character";

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
    const [character, setCharacter] = React.useState({} as Character);
    const classes = useStyles();
    const params = new URLSearchParams(document.location.search.substring(1));
    const id = params.get("id");

    // useEffect(() => {

    //     get(id as string)
    //         .then((item) => setPark(item))
    //         .catch((err) => console.log(err));

    // }, []);

    // const onGetCharacterListClicked = async () => {
    //     setCharacter(await getCharacterListFromSyncAPI());

    // };

    return (
        <div>
            <Paper className={classes.formSurface}>
                <Grid justifyContent="flex-start" container>
                    <Grid item>

                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="h2">
                            {character.Archetype?.Name}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}