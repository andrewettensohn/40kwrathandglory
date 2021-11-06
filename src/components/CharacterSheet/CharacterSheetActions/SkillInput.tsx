import { TextField } from "@material-ui/core";
import { Skills } from "../../../interfaces/Skills";
import { useAppStyles } from "../../AppStyles";

interface SkillInputProps {
    skillName: keyof Skills,
    skillValue: number,
    onValueChanged: (
        skillName: keyof Skills,
        oldValue: number,
        newValue: number) => Promise<void>
}

export const SkillInput = ({
    skillName,
    skillValue,
    onValueChanged
}: SkillInputProps) => {

    const classes = useAppStyles();

    return (
        <TextField
            id="outlined-number"
            label={skillName}
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            value={skillValue.toString()}
            onChange={(e) => onValueChanged(
                skillName,
                skillValue,
                parseFloat(e.target.value))}
            className={classes.numberInput}
        />
    );
}