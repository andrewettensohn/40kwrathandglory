import { Grid, Typography, Divider } from "@material-ui/core"
import { PyschicPower } from "../../../interfaces/PyschicPower";
import { Talent } from "../../../interfaces/Talent";

interface PsychicPowerInfoBlockProps {
    power: PyschicPower,
}

export const PyschicPowerInfoBlock = ({ power }: PsychicPowerInfoBlockProps) => {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{power.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>XP Cost {power.XPCost}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Requirments: {power.Requirements}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>DN: {power.DN}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Activation: {power.Activation}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Duration: {power.Duration}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Range: {power.Range}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Mult-Target: {power.MultiTarget}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Keywords: {power.Keywords}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{power.Effect}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Potency: {power.Potency}</Typography>
            </Grid>
        </Grid>
    );

}