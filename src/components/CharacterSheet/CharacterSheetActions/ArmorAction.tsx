import { Grid, List, ListItem, Button } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Armor } from "../../../interfaces/Armor";
import { Character } from "../../../interfaces/Character";
import { ArmorStatBlock } from "./ArmorStatBlock";

interface ArmorActionProps {
    armorList: Armor[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const ArmorAction = ({ armorList, character, updateCharacter }: ArmorActionProps): JSX.Element => {

    const [showInput, setShowInput] = React.useState(false);

    const onManageArmorClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (armor: Armor): Promise<void> => {

        const armorList = character.Armor;
        armorList.push(armor);

        await updateCharacter({
            ...character,
            Armor: armorList
        });
    }

    const onRemoveFromInventoryClicked = async (armor: Armor): Promise<void> => {

        await updateCharacter({
            ...character,
            Armor: character.Armor.filter(x => x.Id != armor.Id)
        });
    }

    const onEquipChangeClicked = async (armor: Armor, isEquipped: boolean): Promise<void> => {

        const characterArmor = character.Armor;
        character.Armor.forEach(x => {
            if (x.Id == armor.Id) {
                x.IsEquipped = isEquipped;
            } else {
                x.IsEquipped = false;
            }
        });

        await updateCharacter({
            ...character,
            Armor: characterArmor
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
                    {armorList.map(x => {
                        return character.Armor.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
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
                    {character.Armor.map(x => {
                        return x.IsEquipped
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x, false)}>Unequip</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x, true)}>Equip</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                    })}
                </List>
            </Grid>
        </Grid>
}