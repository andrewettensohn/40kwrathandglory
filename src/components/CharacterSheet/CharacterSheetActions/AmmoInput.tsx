import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Character } from "../../../interfaces/Character";

const useStyles = makeStyles({
    numberInput: {
        maxWidth: 100
    },
});

interface AmmoInputProps {
    ammoName: string,
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const AmmoInput = ({ ammoName, character, updateCharacter }: AmmoInputProps): JSX.Element => {

    const [value, setValue] = React.useState(character.Ammo[ammoName]);
    const classes = useStyles();

    const onValueChanged = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = event.target.value as number;
        const update = character;

        update.Ammo[ammoName] = newValue;
        setValue(newValue);
        await updateCharacter(update);
    }

    return (
        <TextField
            id="outlined-number"
            label={ammoName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={value}
            onChange={onValueChanged}
            className={classes.numberInput}
        />
    );
}