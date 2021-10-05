import { Grid, Typography } from "@material-ui/core";
import { isKeyOfSkills } from "../../../helpers/KeyHelper";
import { calculateXpForSkillChange } from "../../../helpers/XPHelper";
import { Character } from "../../../interfaces/Character";
import { Skills } from "../../../interfaces/Skills";
import { SkillInput } from "./SkillInput";

interface SkillsActionProps {
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const SkillsAction = ({ character, updateCharacter }: SkillsActionProps) => {

    const onValueChanged = async (
        skillName: keyof Skills,
        oldValue: number,
        newValue: number
    ) => {

        if (isNaN(newValue)) newValue = 0;

        await updateCharacter({
            ...character,
            XP: calculateXpForSkillChange(
                oldValue,
                newValue,
                character.XP),
            Skills: {
                ...character.Skills,
                [skillName]: newValue
            }
        });
    }

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} md={8} lg={8}>
                <Grid container justifyContent='center' spacing={3}>
                    {Object.entries(character.Skills).map(([key, value]) => {
                        if (isKeyOfSkills(key, character.Skills)) {
                            return (
                                <Grid item key={key}>
                                    <SkillInput
                                        skillName={key}
                                        skillValue={value}
                                        onValueChanged={onValueChanged} />
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}