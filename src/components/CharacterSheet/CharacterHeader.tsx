import classes from "*.module.css";
import { Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Character } from "../../interfaces/Character";
import { NameInput } from "./NameInput";


const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    sheetHeader: {
        minHeight: 100,
        padding: 10
    },
});

export const CharacterHeader = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const [xp, setXp] = React.useState(props.character.XP as number);
    const [tier, setTier] = React.useState(props.character.Tier as number);
    const [rank, setRank] = React.useState(props.character.Rank as number);
    const classes = useStyles();

    const onXpChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;

        props.character.XP = value;
        setXp(value);

        await props.updateCharacter(props.character);
    }

    const onRankChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;

        props.character.Rank = value;
        setRank(value);

        await props.updateCharacter(props.character);
    }

    const onTierChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;

        props.character.Tier = value;
        setTier(value);

        await props.updateCharacter(props.character);
    }

    useEffect(() => {
        setXp(props.character.XP);
    }, [props]);

    return (
        <Paper className={classes.sheetHeader}>
            <Grid justifyContent="space-between" container>
                <Grid item>
                    <NameInput character={props.character} updateCharacter={props.updateCharacter} />
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