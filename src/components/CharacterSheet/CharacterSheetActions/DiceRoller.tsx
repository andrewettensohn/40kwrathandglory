import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { useStyles } from "../../AppStyles";

export const DiceRoller = () => {

    const [numberOfDice, setNumberOfDice] = React.useState(0);
    const [rollResults, setRollResults] = React.useState([] as number[]);
    const classes = useStyles();

    const OnRoll = () => setRollResults(Array.from({ length: numberOfDice }, () => Math.floor((Math.random() * 6) + 1)));
    const OnNumberOfDiceChanged = (dice: number) => {
        if (dice > 16) {
            dice = 16;
        }

        setNumberOfDice(dice);
    }

    const onIncreaseNumberOfDice = () => setNumberOfDice(numberOfDice + 1)
    const onDecreaseNumberOfDice = () => setNumberOfDice(numberOfDice - 1)

    return (
        <Grid container spacing={2}>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label="Dice to Roll"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={numberOfDice.toString()}
                    onChange={(e) => OnNumberOfDiceChanged(parseInt(e.target.value))}
                />
                <Grid container>
                    <Grid item>
                        <Button onClick={onIncreaseNumberOfDice} color="primary">Increase</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={onDecreaseNumberOfDice} color="secondary">Decrease</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
                <Button onClick={OnRoll}>Roll</Button>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {rollResults.map(x => {
                        return x > 3
                            ?
                            <Grid item>
                                <Card elevation={3} variant="outlined">
                                    <Typography color="primary">{x}</Typography>
                                </Card>
                            </Grid>
                            :
                            <Grid item>
                                <Card elevation={3} variant="outlined">
                                    <Typography color="error">{x}</Typography>
                                </Card>
                            </Grid>
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}