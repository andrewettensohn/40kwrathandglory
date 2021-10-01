import { Grid, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../interfaces/Character";
import { useStyles } from "../AppStyles";
import { NameInput } from "./NameInput";

interface CharacterHeaderProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const CharacterHeader = ({ character, updateCharacter }: CharacterHeaderProps) => {

    const [xp, setXp] = React.useState(character.XP);
    const [tier, setTier] = React.useState(character.Tier);
    const [rank, setRank] = React.useState(character.Rank);
    const classes = useStyles();

    const onXpChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;
        const update = character;

        update.XP = value;
        setXp(value);

        await updateCharacter(update);
    }

    const onRankChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;
        const update = character;

        update.Rank = value;
        setRank(value);

        await updateCharacter(update);
    }

    const onTierChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;
        const update = character;

        update.Tier = value;
        setTier(value);

        await updateCharacter(update);
    }

    useEffect(() => {
        setXp(character.XP);
    }, [character.XP]);

    return (
        <Paper className={classes.sheetHeader}>
            <Grid justifyContent="space-between" container>
                <Grid item>
                    <NameInput character={character} updateCharacter={updateCharacter} />
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
                        value={rank}
                        onChange={onRankChange}
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
                        value={xp}
                        onChange={onXpChange}
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
                        value={tier}
                        onChange={onTierChange}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}