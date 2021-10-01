import { TextField } from "@material-ui/core";
import { Ammo } from "../../../interfaces/Ammo";
import { useStyles } from "../../AppStyles";

interface AmmoInputProps {
    ammoName: keyof Ammo,
    ammoValue: number,
    onValueChanged: (
        ammoName: keyof Ammo,
        newValue: number) => Promise<void>
}

export const AmmoInput = ({
    ammoName,
    ammoValue,
    onValueChanged
}: AmmoInputProps): JSX.Element => {

    const classes = useStyles();

    return (
        <TextField
            id="outlined-number"
            label={ammoName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={ammoValue}
            onChange={(e) => onValueChanged(
                ammoName,
                parseFloat(e.target.value))}
            className={classes.numberInput}
        />
    );
}