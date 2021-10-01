import { Divider, Grid, Typography } from "@material-ui/core";
import { Gear } from "../../../interfaces/Gear";

interface GearInfoBlockProps {
    gear: Gear
}

export const GearInfoBlock = ({ gear }: GearInfoBlockProps) => {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{gear.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{gear.Effect}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{gear.Keywords}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{gear.Description}</Typography>
            </Grid>
        </Grid>
    )
}