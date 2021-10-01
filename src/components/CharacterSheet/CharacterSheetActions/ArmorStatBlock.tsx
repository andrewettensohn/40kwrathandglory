import { Grid, Typography, Divider } from "@material-ui/core"
import React from "react"
import { Armor } from "../../../interfaces/Armor";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon"

interface ArmorStatBlockProps {
    armor: Armor,
}

export const ArmorStatBlock = ({ armor }: ArmorStatBlockProps) => {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{armor.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Armor Rating (AR): {armor.AR}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Traits: {armor.Traits}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Keywords: {armor.Keywords}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{armor.Description}</Typography>
            </Grid>
        </Grid>
    );

}