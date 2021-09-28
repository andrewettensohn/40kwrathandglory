import { Grid, Typography, Divider } from "@material-ui/core"
import React from "react"
import { BallisticSkillCheck, WeaponSkillCheck } from "../../../helpers/SkillCheckHelper";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon"

interface WeaponStatBlockProps {
    weapon: Weapon,
    character: Character
}

export const WeaponStatBlock = ({ weapon, character }: WeaponStatBlockProps) => {

    const hit = weapon.IsMelee ? WeaponSkillCheck(character) : BallisticSkillCheck(character);

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{weapon.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Hit: {hit}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Damage: {weapon.Damage}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>ED: {weapon.ED}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>AP: {weapon.AP}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Range: {weapon.Range}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Traits: {weapon.Traits}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{weapon.Description}</Typography>
            </Grid>
        </Grid>
    );

}