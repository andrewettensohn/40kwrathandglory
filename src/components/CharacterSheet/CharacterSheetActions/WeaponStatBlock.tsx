import { Grid, Typography, Divider, Button, Modal, Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { TableChartSharp } from "@material-ui/icons";
import React from "react"
import { HitCheck, WeaponDamageCheck } from "../../../helpers/CheckHelper";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon"
import { useAppStyles } from "../../AppStyles";
import { DiceRoller } from "./DiceRoller";
import { WeaponTraitsList } from "./WeaponTraitsList";

interface WeaponStatBlockProps {
    weapon: Weapon,
    character: Character,
    displayAttackButton: boolean,
}

export const WeaponStatBlock = ({ weapon, character, displayAttackButton }: WeaponStatBlockProps) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const classes = useAppStyles();

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div>
            <Grid container>
                <Grid item>
                    {displayAttackButton &&
                        <Grid item>
                            <Button variant="outlined" onClick={toggleModal}>Attack</Button>
                        </Grid>}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">{weapon.Name}</Typography>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <WeaponTraitsList salvo={weapon.Salvo} traits={weapon.WeaponTraits} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Hit</TableCell>
                                        <TableCell>DMG</TableCell>
                                        <TableCell>ED</TableCell>
                                        <TableCell>AP</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{HitCheck(weapon, character)}</TableCell>
                                        <TableCell>{WeaponDamageCheck(weapon, character)}</TableCell>
                                        <TableCell>{weapon.ED}</TableCell>
                                        <TableCell>{weapon.AP}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item>
                        <Typography>{weapon.Description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                className={classes.centerScreen}
            >
                <Paper className={classes.scrollBox}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <WeaponStatBlock weapon={weapon} character={character} displayAttackButton={false} />
                        </Grid>
                        <Grid item>
                            <DiceRoller initalDiceValue={HitCheck(weapon, character)} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <img src="images/CriticalHitTable.png" className={classes.imgAction} />
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </div>
    );

}