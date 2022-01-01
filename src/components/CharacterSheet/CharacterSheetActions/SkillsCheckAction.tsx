import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { useAppStyles } from "../../AppStyles";
import { DiceRoller } from "./DiceRoller";

interface SkillsCheckActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const SkillsCheckAction = ({ character, updateCharacter }: SkillsCheckActionProps) => {
    const classes = useAppStyles();

    const onValueChanged = async (value: number, propName: string) => {
        if (isNaN(value)) value = 0;

        await updateCharacter({
            ...character,
            [propName]: value
        });
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" className={classes.mt5}>
                    <Grid item>
                        <TextField
                            id="outlined-number"
                            label="Wrath"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={character.Wrath?.toString()}
                            onChange={(e) => onValueChanged(parseFloat(e.target.value), "Wrath")}
                            className={classes.numberInput}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-number"
                            label="Glory"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={character.Glory?.toString()}
                            onChange={(e) => onValueChanged(parseFloat(e.target.value), "Glory")}
                            className={classes.numberInput}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-number"
                            label="Corruption"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={character.Corruption?.toString()}
                            onChange={(e) => onValueChanged(parseFloat(e.target.value), "Corruption")}
                            className={classes.numberInput}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Skill Check</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Athletics</TableCell>
                                <TableCell align="left">{character.SkillChecks.Athletics}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Awareness</TableCell>
                                <TableCell align="left">{character.SkillChecks.Awareness}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Ballistic</TableCell>
                                <TableCell align="left">{character.SkillChecks.Ballistic}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Cunning</TableCell>
                                <TableCell align="left">{character.SkillChecks.Cunning}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Deception</TableCell>
                                <TableCell align="left">{character.SkillChecks.Deception}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Insight</TableCell>
                                <TableCell align="left">{character.SkillChecks.Insight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Intimidation</TableCell>
                                <TableCell align="left">{character.SkillChecks.Intimidation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Investigation</TableCell>
                                <TableCell align="left">{character.SkillChecks.Investigation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Leadership</TableCell>
                                <TableCell align="left">{character.SkillChecks.Leadership}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Medicae</TableCell>
                                <TableCell align="left">{character.SkillChecks.Medicae}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Persuasion</TableCell>
                                <TableCell align="left">{character.SkillChecks.Persuasion}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Pilot</TableCell>
                                <TableCell align="left">{character.SkillChecks.Pilot}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Pyschic</TableCell>
                                <TableCell align="left">{character.SkillChecks.Pyschic}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Scholar</TableCell>
                                <TableCell align="left">{character.SkillChecks.Scholar}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Stealth</TableCell>
                                <TableCell align="left">{character.SkillChecks.Stealth}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Survival</TableCell>
                                <TableCell align="left">{character.SkillChecks.Survival}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Tech</TableCell>
                                <TableCell align="left">{character.SkillChecks.Tech}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Weapon</TableCell>
                                <TableCell align="left">{character.SkillChecks.Weapon}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}