import { Grid, Button, List, ListItem } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { PyschicPower } from "../../../interfaces/PyschicPower";
import { useAppStyles } from "../../AppStyles";
import { PyschicPowerInfoBlock } from "./PyschicPowerInfoBlock";

interface PsychicActionProps {
    pyschicList: PyschicPower[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const PyschicPowerAction = ({ pyschicList, character, updateCharacter }: PsychicActionProps) => {
    const [showInput, setShowInput] = React.useState(false);
    const classes = useAppStyles();

    const onManagePowersClicked = () => setShowInput(!showInput);

    const onAddPowerClicked = async (power: PyschicPower): Promise<void> => {

        const update = {
            ...character,
            XP: character.XP -= power.XPCost,
        } as Character;

        update.PsychicPowers.push(power);

        await updateCharacter(update);
    }

    const onRemovePowerClicked = async (power: PyschicPower): Promise<void> => {
        await updateCharacter({
            ...character,
            XP: character.XP += power.XPCost,
            PsychicPowers: character.PsychicPowers.filter(x => x.Id != power.Id)
        });
    }

    return showInput
        ?
        <Grid container>
            <Grid item>
                <Button
                    startIcon={<ControlCamera />}
                    color="primary"
                    variant="outlined"
                    onClick={onManagePowersClicked}>Close</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {pyschicList.map(x => {
                        return character.PsychicPowers.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onRemovePowerClicked(x)}>Remove</Button>
                                    </Grid>
                                    <PyschicPowerInfoBlock power={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onAddPowerClicked(x)}>Add</Button>
                                    </Grid>
                                    <PyschicPowerInfoBlock power={x} />
                                </Grid>
                            </ListItem>
                    })}
                </List>
            </Grid>
        </Grid>
        :
        <Grid container justifyContent="flex-start">
            <Grid item>
                <Button
                    startIcon={<ControlCamera />}
                    color="primary"
                    variant="outlined"
                    onClick={onManagePowersClicked}>Manage</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {character.PsychicPowers.map(x => {
                        return (
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <PyschicPowerInfoBlock power={x} />
                                </Grid>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>

}