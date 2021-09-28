import { Grid, Typography, Divider } from "@material-ui/core"
import { Talent } from "../../../interfaces/Talent";

interface TalentInfoBlockProps {
    talent: Talent,
}

export const TalentInfoBlock = ({ talent }: TalentInfoBlockProps) => {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{talent.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>XP Cost {talent.XPCost}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Requirments: {talent.Requirements}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{talent.Description}</Typography>
            </Grid>
        </Grid>
    );

}