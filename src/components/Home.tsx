import { Button, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CharacterList } from "./CharacterList/CharacterList";
import { Character } from "../interfaces/Character";
import { getCharacterListFromSyncAPI } from "../data/SyncModelService";

const useStyles = makeStyles({

});

export const Home = () => {
    const [characterList, setCharacterList] = React.useState([] as Character[]);
    const classes = useStyles();

    useEffect(() => {
        getCharacterListClicked()
            .catch((err) => console.log(err))
        //.finally(() => setIsLoading(false))
    }, []);

    const getCharacterListClicked = async () => {
        setCharacterList(await getCharacterListFromSyncAPI());

    };

    return (
        <div>
            <CharacterList characters={characterList} />
        </div>
    );
}