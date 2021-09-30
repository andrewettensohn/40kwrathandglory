import { Grid } from "@material-ui/core";
import React from "react";
import { isKeyOfAmmo } from "../../../helpers/KeyHelper";
import { Ammo } from "../../../interfaces/Ammo";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { AmmoInput } from "./AmmoInput";

interface AmmoActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const AmmoAction = ({ character, updateCharacter }: AmmoActionProps): JSX.Element => {

    const onValueChanged = async (
        ammoName: keyof Ammo,
        newValue: number,
    ) => {
        await updateCharacter({
            ...character,
            Ammo: {
                ...character.Ammo,
                [ammoName]: newValue
            }
        });
    }

    return (
        <Grid container spacing={6}>
            {Object.entries(character.Ammo).map(([key, value]) => {
                if (isKeyOfAmmo(key, character.Ammo)) {
                    return (
                        <Grid item xs={6} key={key}>
                            <AmmoInput ammoName={key} ammoValue={value} onValueChanged={onValueChanged} />
                        </Grid>
                    )
                }
            })}
        </Grid>
    );
}