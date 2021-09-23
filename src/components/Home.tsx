import { Button, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CharacterList } from "./CharacterList/CharacterList";
import { Character } from "../interfaces/Character";
import { getCharacterListFromSyncAPI } from "../data/SyncModelService";

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

export const Home = () => {
    const [characterList, setCharacterList] = React.useState([] as Character[]);
    const classes = useStyles();

    const onGetCharacterListClicked = async () => {
        setCharacterList(await getCharacterListFromSyncAPI());

    };

    return (
        <div>
            <Paper className={classes.formSurface}>
                <Grid justifyContent="flex-end" container>
                    <Grid item>
                        <Button variant="contained" onClick={onGetCharacterListClicked}>Reset</Button>
                    </Grid>
                </Grid>
            </Paper>
            <CharacterList characters={characterList} />
        </div>
    );
}