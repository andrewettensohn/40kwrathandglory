import { Grid, Typography, Divider, Paper, makeStyles } from "@material-ui/core"
import React from "react"
import { Armor } from "../../../interfaces/Armor";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon"
import { useAppStyles } from "../../AppStyles";
import { ArmorTraitsList } from "./ArmorTraits";

interface ArmorStatBlockProps {
    armor: Armor,
}

export const ArmorStatBlock = ({ armor }: ArmorStatBlockProps) => {
    const classes = useAppStyles();

    return (
        <div>
            <Grid container spacing={1} className={classes.m3}>
                <Grid item xs={12}>
                    <Typography variant="h6">{armor.Name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Armor Rating (AR): {armor.AR}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ArmorTraitsList traits={armor.ArmorTraits} />
                </Grid>
                <Grid item xs={12}>
                    <Typography>{armor.Description}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Keywords: {armor.Keywords}</Typography>
                </Grid>
            </Grid>
        </div>
    );

}
