import { Grid, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../interfaces/Character";
import { useAppStyles } from "../AppStyles";
import { DiceRoller } from "./CharacterSheetActions/DiceRoller";
import { NameInput } from "./NameInput";

interface CharacterHeaderProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const CharacterHeader = ({ character, updateCharacter }: CharacterHeaderProps) => {

    const classes = useAppStyles();

    const onNumberChanged = async (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        await updateCharacter({
            ...character,
            [propertyName]: value
        });
    }

    return (
        <Paper className={classes.sheetHeader} elevation={5}>
            <Grid container>
                <Grid item>
                    <NameInput character={character} updateCharacter={updateCharacter} />
                </Grid>
            </Grid>
            <Grid justifyContent="flex-start" container spacing={1}>
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
                        value={character.Rank?.toString()}
                        onChange={(e) => onNumberChanged("Rank", parseInt(e.target.value))}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Tier"
                        type="number"
                        className={classes.numberInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={character.Tier?.toString()}
                        onChange={(e) => onNumberChanged("Tier", parseInt(e.target.value))}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="XP"
                        type="number"
                        className={classes.numberInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={character.XP?.toString()}
                        onChange={(e) => onNumberChanged("XP", parseInt(e.target.value))}
                    />
                </Grid>
            </Grid>
            <Grid justifyContent="flex-start" container spacing={3}>
                <Grid item>
                    <DiceRoller />
                </Grid>
            </Grid>
        </Paper>
    );
}