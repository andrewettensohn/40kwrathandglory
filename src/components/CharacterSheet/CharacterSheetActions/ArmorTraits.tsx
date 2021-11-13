import { Grid, Typography, Divider, Chip, Tooltip } from "@material-ui/core"
import React from "react"
import { BulkTooltip, PoweredTooltip } from "../../../data/Tooltips";
import { Armor } from "../../../interfaces/Armor";
import { ArmorTraits } from "../../../interfaces/ArmorTraits";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon"

interface ArmorTraitsProps {
    traits: ArmorTraits,
}

export const ArmorTraitsList = ({ traits }: ArmorTraitsProps) => {

    return traits !== undefined && traits !== null
        ?
        <Grid container >
            {traits.Bulk &&
                <Grid item xs={12}>
                    <Tooltip title={BulkTooltip}>
                        <Chip
                            label="Bulk"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Cumbersome &&
                <Grid item xs={12}>
                    <Chip
                        label="Cumbersome"
                        variant="outlined"
                    />
                </Grid>}
            {traits.EreWeGo &&
                <Grid item xs={12}>
                    <Chip
                        label="EreWeGo"
                        variant="outlined"
                    />
                </Grid>}
            {traits.Field &&
                <Grid item xs={12}>
                    <Chip
                        label="Field"
                        variant="outlined"
                    />
                </Grid>}
            {traits.Powered > 0 &&
                <Grid item xs={12}>
                    <Tooltip title={PoweredTooltip}>
                        <Chip
                            label={`Powered(${traits.Powered})`}
                            variant="outlined"
                        /></Tooltip>
                </Grid>}
            {traits.Shield &&
                <Grid item xs={12}>
                    <Chip
                        label="Shield"
                        variant="outlined"
                    />
                </Grid>}
        </Grid>
        :
        <div></div>
}