import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { CharacterList } from "./CharacterList/CharacterList";
import { Character } from "../interfaces/Character";
import { getCharacterListFromSyncAPI } from "../data/SyncModelService";
import { useStyles } from "./AppStyles";
import { addNewCharacter } from "../data/RestService";

export const Home = () => {
    const [characterList, setCharacterList] = React.useState([] as Character[]);
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useStyles();

    useEffect(() => {
        getCharacterListClicked()
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }, []);

    const getCharacterListClicked = async () => {
        setCharacterList(await getCharacterListFromSyncAPI())
    };

    const newCharacterClicked = async () => {
        addNewCharacter();
        await getCharacterListClicked();
    }

    return !isLoading
        ?
        <Grid container justifyContent="center" className={classes.mt10}>
            <Grid item>
                <Button color="primary" variant="outlined" onClick={newCharacterClicked}>New Character</Button>
            </Grid>
            <Grid item>
                <CharacterList characters={characterList} />
            </Grid>
        </Grid>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>
}