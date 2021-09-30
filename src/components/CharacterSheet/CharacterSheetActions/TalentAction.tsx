import { Grid, Button, List, ListItem } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Talent } from "../../../interfaces/Talent";
import { TalentInfoBlock } from "./TalentInfoBlock";

interface TalentActionProps {
    talentList: Talent[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const TalentAction = ({ talentList, character, updateCharacter }: TalentActionProps) => {
    const [showInput, setShowInput] = React.useState(false);

    const onManageTalentsClicked = () => setShowInput(!showInput);

    const onAddTalentClicked = async (talent: Talent): Promise<void> => {

        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        characterUpdate.XP -= talent.XPCost;
        characterUpdate.Talents.push(talent);
        await updateCharacter(characterUpdate);
    }

    const onRemoveTalentClicked = async (talent: Talent): Promise<void> => {
        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;

        characterUpdate.XP += talent.XPCost;
        characterUpdate.Talents = characterUpdate.Talents.filter(x => x.Id != talent.Id);
        await updateCharacter(characterUpdate);
    }

    return showInput
        ?
        <Grid container>
            <Grid item>
                <Button
                    startIcon={<ControlCamera />}
                    color="primary"
                    variant="contained"
                    onClick={onManageTalentsClicked}>Close</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {talentList.map(x => {
                        return character.Talents.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onRemoveTalentClicked(x)}>Remove</Button>
                                    </Grid>
                                    <TalentInfoBlock talent={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onAddTalentClicked(x)}>Add</Button>
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
                    variant="contained"
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