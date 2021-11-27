import { Grid, Button, List, ListItem } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Talent } from "../../../interfaces/Talent";
import { useAppStyles } from "../../AppStyles";
import { TalentInfoBlock } from "./TalentInfoBlock";

interface TalentActionProps {
    talentList: Talent[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const TalentAction = ({ talentList, character, updateCharacter }: TalentActionProps) => {
    const [showInput, setShowInput] = React.useState(false);
    const classes = useAppStyles();

    const onManageTalentsClicked = () => setShowInput(!showInput);

    const onAddTalentClicked = async (talent: Talent): Promise<void> => {

        const update = {
            ...character,
            XP: character.XP -= talent.XPCost,
        } as Character;

        update.Talents.push(talent);

        await updateCharacter(update);
    }

    const onRemoveTalentClicked = async (talent: Talent): Promise<void> => {
        await updateCharacter({
            ...character,
            XP: character.XP += talent.XPCost,
            Talents: character.Talents.filter(x => x.Id != talent.Id)
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
                    onClick={onManageTalentsClicked}>Close</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {talentList.filter(x => x.ThreatOnly == false).map(x => {
                        return character.Talents.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onRemoveTalentClicked(x)}>Remove</Button>
                                    </Grid>
                                    <TalentInfoBlock talent={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onAddTalentClicked(x)}>Add</Button>
                                    </Grid>
                                    <TalentInfoBlock talent={x} />
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
                    onClick={onManageTalentsClicked}>Manage</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {character.Talents.map(x => {
                        return (
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <TalentInfoBlock talent={x} />
                                </Grid>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>

}