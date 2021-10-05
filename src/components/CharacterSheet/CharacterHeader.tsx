import { Grid, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../interfaces/Character";
import { useStyles } from "../AppStyles";
import { DiceRoller } from "./CharacterSheetActions/DiceRoller";
import { NameInput } from "./NameInput";

interface CharacterHeaderProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const CharacterHeader = ({ character, updateCharacter }: CharacterHeaderProps) => {

    // const [xp, setXp] = React.useState(character.XP);
    // const [tier, setTier] = React.useState(character.Tier);
    // const [rank, setRank] = React.useState(character.Rank);
    const classes = useStyles();

    const onXpChange = async (value: number) => {
        await updateCharacter({
            ...character,
            XP: value
        });
    }

    const onRankChange = async (value: number) => {
        await updateCharacter({
            ...character,
            Rank: value
        });
    }

    const onTierChange = async (value: number) => {
        await updateCharacter({
            ...character,
            Tier: value
        });
    }

    // useEffect(() => {
    //     setXp(character.XP);
    // }, [character.XP]);

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
                        value={character.Rank.toString()}
                        onChange={(e) => onRankChange(parseInt(e.target.value))}
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
                        value={character.Tier.toString()}
                        onChange={(e) => onTierChange(parseInt(e.target.value))}
                    />
                </Grid>
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
                        value={character.XP.toString()}
                        onChange={(e) => onXpChange(parseInt(e.target.value))}
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