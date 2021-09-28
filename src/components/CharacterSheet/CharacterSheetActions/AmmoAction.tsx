import { Grid } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { AmmoInput } from "./AmmoInput";

interface AmmoActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const AmmoAction = ({ character, updateCharacter }: AmmoActionProps): JSX.Element => {

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
                    <Grid item xs={6} key={x}>
                        <AmmoInput ammoName={x} character={character} updateCharacter={updateCharacter} />
                    </Grid>
                )
            })}
        </Grid>
    );
}