import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isKeyOfAttributes } from "../../../helpers/KeyHelper";
import { Character } from "../../../interfaces/Character";

interface SkillsCheckActionProps {
    character: Character,
}

export const SkillsCheckAction = ({
    character }: SkillsCheckActionProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
    );
}