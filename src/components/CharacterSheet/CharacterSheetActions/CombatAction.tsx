import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isKeyOfAttributes } from "../../../helpers/KeyHelper";
import { Character } from "../../../interfaces/Character";
import { useAppStyles } from "../../AppStyles";

interface CombatActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const CombatAction = ({
    character,
    updateCharacter }: CombatActionProps) => {
    const classes = useAppStyles();

    const onWoundChange = async (value: number) => {
        await updateCharacter({
            ...character,
            CurrentWounds: value
        });
    }

    const onShockChange = async (value: number) => {
        await updateCharacter({
            ...character,
            CurrentShock: value
        });
    }

    return (
        <Grid container>
            <Grid item>
                <Grid container justifyContent='space-between' spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            label={`Wounds | Max ${character.CombatTraits.maxWounds}`}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={character.CurrentWounds}
                            onChange={(e) => onWoundChange(parseFloat(e.target.value))}
                            className={classes.numberInputMd}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label={`Shock | Max ${character.CombatTraits.maxShock}`}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={character.CurrentShock}
                            onChange={(e) => onShockChange(parseFloat(e.target.value))}
                            className={classes.numberInputMd}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Combat Trait</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Movment</TableCell>
                                <TableCell align="left">{character.SkillChecks.Movement}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Defense</TableCell>
                                <TableCell align="left">{character.CombatTraits.defense}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Resilience</TableCell>
                                <TableCell align="left">{character.CombatTraits.resilience}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Determination</TableCell>
                                <TableCell align="left">{character.CombatTraits.determination}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Passive Awareness</TableCell>
                                <TableCell align="left">{character.CombatTraits.passiveAwareness}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Conviction</TableCell>
                                <TableCell align="left">{character.CombatTraits.conviction}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Resolve</TableCell>
                                <TableCell align="left">{character.CombatTraits.resolve}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}