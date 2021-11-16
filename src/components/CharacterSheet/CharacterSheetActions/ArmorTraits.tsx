import { Grid, Chip, Tooltip } from "@material-ui/core"
import { BulkTooltip, CumbersomeTooltip, EreWeGoTooltip, PoweredTooltip, PowerFieldTooltip, ShieldeTooltip } from "../../../data/Tooltips";
import { ArmorTraits } from "../../../interfaces/ArmorTraits";

interface ArmorTraitsProps {
    traits: ArmorTraits,
}

export const ArmorTraitsList = ({ traits }: ArmorTraitsProps) => {

    return traits !== undefined && traits !== null
        ?
        <Grid container >
            {traits.Bulk > 0 &&
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
                    <Tooltip title={CumbersomeTooltip}>
                        <Chip
                            label="Cumbersome"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.EreWeGo &&
                <Grid item xs={12}>
                    <Tooltip title={EreWeGoTooltip}>
                        <Chip
                            label="EreWeGo"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Field &&
                <Grid item xs={12}>
                    <Tooltip title={PowerFieldTooltip}>
                        <Chip
                            label="Field"
                            variant="outlined"
                        />
                    </Tooltip>
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
                    <Tooltip title={ShieldeTooltip}>
                        <Chip
                            label="Shield"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
        </Grid>
        :
        <div></div>
}