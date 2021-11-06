import { Character } from "../../../interfaces/Character";
import { Gear } from "../../../interfaces/Gear";
import { Grid, List, ListItem, Button } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { GearInfoBlock } from "./GearInfoBlock";
import { useAppStyles } from "../../AppStyles";

interface GearActionProps {
    gearList: Gear[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const GearAction = ({ gearList, character, updateCharacter }: GearActionProps) => {
    const [showInput, setShowInput] = React.useState(false);
    const classes = useAppStyles();

    const onManageArmorClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (gear: Gear): Promise<void> => {

        const gearList = character.CharacterGear;
        gearList.push(gear);

        await updateCharacter({
            ...character,
            CharacterGear: gearList
        });
    }

    const onRemoveFromInventoryClicked = async (gear: Gear): Promise<void> => {

        await updateCharacter({
            ...character,
            CharacterGear: character.CharacterGear.filter(x => x.Id != gear.Id)
        });
    }

    return showInput
        ?
        <Grid container>
            <Grid item>
                <Button
                    startIcon={<ControlCamera />}
                    color="primary"
                    variant="contained"
                    onClick={onManageArmorClicked}>Close</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {gearList.map(x => {
                        return character.CharacterGear.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                    </Grid>
                                    <GearInfoBlock gear={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
                                    </Grid>
                                    <GearInfoBlock gear={x} />
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
                    onClick={onManageArmorClicked}>Manage</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {character.CharacterGear.map(x => {
                        return (
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <GearInfoBlock gear={x} />
                                </Grid>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>
}