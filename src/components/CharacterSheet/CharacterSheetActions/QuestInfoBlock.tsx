import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Quest } from "../../../interfaces/Quest";

interface QuestInfoBlockProps {
    quest: Quest
}

export const QuestInfoBlock = ({ quest }: QuestInfoBlockProps) => {

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography>{quest.Name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{quest.BriefDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography>{quest.FullDescription}</Typography>
            </Grid>
        </Grid>
    )
}