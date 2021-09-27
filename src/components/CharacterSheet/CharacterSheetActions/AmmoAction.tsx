import { Grid } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { AmmoInput } from "./AmmoInput";

export const AmmoAction = (props: {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}): JSX.Element => {

    const ammoNames = [
        "Projectile",
        "Las",
        "Flame",
        "Bolt",
        "Plasma",
        "Melta",
        "Shuriken",
        "Grenade",
        "Missle",
    ] as string[];

    return (
        <Grid container spacing={6}>
            {ammoNames.map(x => {
                return (
                    <Grid item xs={6}>
                        <AmmoInput ammoName={x} ammoValue={props.character.Ammo[x] as number} character={props.character} updateCharacter={props.updateCharacter} />
                    </Grid>
                )
            })}
        </Grid>
    );
}