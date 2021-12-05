import { Grid, Typography, Divider, Chip, Tooltip } from "@material-ui/core"
import React from "react"
import { AgonisingTooltip, ArcTooltip, AssaultTooltip, BlastTooltip, BrutalTooltip, BulkTooltip, FlamerTooltip, ForceTooltip, HeavyTooltip, MeltaTooltip, ParryTooltip, PistolTooltip, PoweredTooltip, RadTooltip, RapidFireTooltip, ReliableTooltip, RendingTooltip, SalvoTooltip, SilentTooltip, SniperTooltip, SpreadTooltip, SuperchargeTooltip, UnwieldyTooltip, WaaaghTooltip, WarpTooltip } from "../../../data/Tooltips";
import { Weapon } from "../../../interfaces/Weapon";
import { WeaponTraits } from "../../../interfaces/WeaponTraits";
import { Character } from "../../../interfaces/Character";

interface WeaponTraitsProps {
    traits: WeaponTraits,
    salvo: string
}

export const WeaponTraitsList = ({ traits, salvo }: WeaponTraitsProps) => {

    return traits !== undefined && traits !== null
        ?
        <Grid container spacing={1} >
            {(salvo != "0" && salvo != "" && salvo.length > 0) &&
                <Grid item>
                    <Tooltip title={SalvoTooltip}>
                        <Chip
                            label={`Salvo (${salvo})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Agonising &&
                <Grid item >
                    <Tooltip title={AgonisingTooltip}>
                        <Chip
                            label="Agonising"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Arc > 0 &&
                <Grid item >
                    <Tooltip title={ArcTooltip}>
                        <Chip
                            label={`Arc(${traits.Arc})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Assualt &&
                <Grid item >
                    <Tooltip title={AssaultTooltip}>
                        <Chip
                            label="Assualt"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Blast > 0 &&
                <Grid item >
                    <Tooltip title={BlastTooltip}>
                        <Chip
                            label={`Blast (${traits.Blast})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Brutal &&
                <Grid item >
                    <Tooltip title={BrutalTooltip}>
                        <Chip
                            label="Brutal"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Force &&
                <Grid item >
                    <Tooltip title={ForceTooltip}>
                        <Chip
                            label="Force"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Flamer &&
                <Grid item >
                    <Tooltip title={FlamerTooltip}>
                        <Chip
                            label="Flamer"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Heavy > 0 &&
                <Grid item >
                    <Tooltip title={HeavyTooltip}>
                        <Chip
                            label={`Heavy (${traits.Heavy})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Melta &&
                <Grid item >
                    <Tooltip title={MeltaTooltip}>
                        <Chip
                            label="Melta"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Parry &&
                <Grid item >
                    <Tooltip title={ParryTooltip}>
                        <Chip
                            label="Parry"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Pistol &&
                <Grid item >
                    <Tooltip title={PistolTooltip}>
                        <Chip
                            label="Pistol"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Rad > 0 &&
                <Grid item >
                    <Tooltip title={RadTooltip}>
                        <Chip
                            label={`Rad (${traits.Rad})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.RapidFire > 0 &&
                <Grid item >
                    <Tooltip title={RapidFireTooltip}>
                        <Chip
                            label={`Rapid Fire (${traits.RapidFire})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Reliable &&
                <Grid item >
                    <Tooltip title={ReliableTooltip}>
                        <Chip
                            label="Reliable"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Rending > 0 &&
                <Grid item >
                    <Tooltip title={RendingTooltip}>
                        <Chip
                            label={`Rending (${traits.Rending})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Silent &&
                <Grid item >
                    <Tooltip title={SilentTooltip}>
                        <Chip
                            label="Silent"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Sniper > 0 &&
                <Grid item>
                    <Tooltip title={SniperTooltip}>
                        <Chip
                            label={`Sniper (${traits.Sniper})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Spread &&
                <Grid item >
                    <Tooltip title={SpreadTooltip}>
                        <Chip
                            label="Spread"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Supercharge &&
                <Grid item >
                    <Tooltip title={SuperchargeTooltip}>
                        <Chip
                            label="Supercharge"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Unwieldy > 0 &&
                <Grid item >
                    <Tooltip title={UnwieldyTooltip}>
                        <Chip
                            label={`Unwieldy (${traits.Unwieldy})`}
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
            {traits.Waaagh &&
                <Grid item >
                    <Tooltip title={WaaaghTooltip}>
                        <Chip
                            label="Waaagh"
                            variant="outlined"
                        />

                    </Tooltip>
                </Grid>}
            {traits.Warp &&
                <Grid item >
                    <Tooltip title={WarpTooltip}>
                        <Chip
                            label="Warp"
                            variant="outlined"
                        />
                    </Tooltip>
                </Grid>}
        </Grid>
        :
        <div></div>
}