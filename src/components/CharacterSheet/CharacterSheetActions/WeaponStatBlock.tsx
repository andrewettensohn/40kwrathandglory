import { Grid, Typography, Divider, Button, Modal, Paper } from "@material-ui/core"
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
            <Grid container className={classes.m3}>
                {displayAttackButton &&
                    <Grid item>
                        <Button variant="outlined" onClick={toggleModal}>Attack</Button>
                    </Grid>}
                <Grid item xs={12}>
                    <Typography variant="h6">{weapon.Name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Hit: {HitCheck(weapon, character)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Damage: {WeaponDamageCheck(weapon, character)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>ED: {weapon.ED}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>AP: {weapon.AP}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Salvo: {weapon.Salvo}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Range: {weapon.Range}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <WeaponTraitsList traits={weapon.WeaponTraits} />
                </Grid>
                <Grid item xs={12}>
                    <Typography>{weapon.Description}</Typography>
                </Grid>
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                className={classes.centerScreen}
            >
                <Paper className={classes.scrollBox}>
                    <Grid container spacing={3}>
                        <Grid item>
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