import { Button, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";
import { Edit } from "@material-ui/icons";

interface NameInputProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const NameInput = ({ character, updateCharacter }: NameInputProps) => {

    const [characterName, setCharacterName] = React.useState(character.Name);
    const [showInput, setShowInput] = React.useState(false);

    const onChangeNameBtnClicked = () => {
        setShowInput(!showInput);
    }

    const handleNameChange = async (event: React.ChangeEvent<{ value: unknown }>) => {

        setCharacterName(event.target.value as string);
    };

    const onSaveNameButtonClicked = async () => {
        setShowInput(!showInput);
        const update = character;

        update.Name = characterName;
        await updateCharacter(update);
    };

    return showInput
        ?
        <Grid container>
            <Grid item>
                <TextField
                    id="character-name-input"
                    label="Character Name"
                    value={characterName}
                    onChange={handleNameChange}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={onSaveNameButtonClicked}>Save</Button>
            </Grid>
        </Grid>
        :
        <Grid container>
            <Grid item>
                <Typography variant="body1">
                    {characterName}
                    <IconButton onClick={onChangeNameBtnClicked} >
                        <Edit />
                    </IconButton>
                </Typography>
            </Grid>
        </Grid>
}