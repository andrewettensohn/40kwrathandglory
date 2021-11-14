import { Grid, List, ListItem, Button } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Armor } from "../../../interfaces/Armor";
import { Character } from "../../../interfaces/Character";
import { useAppStyles } from "../../AppStyles";
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

        character.Armor.forEach(x => {
            if (x.Id == armor.Id) {
                x.IsEquipped = isEquipped;
            }
        });

        await updateCharacter({
            ...character,
            Armor: character.Armor
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
                    {armorList.sort((x, y) => x.Name.localeCompare(y.Name)).map(x => {
                        return character.Armor.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
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
                    {character.Armor.sort((x, y) => x.Name.localeCompare(y.Name)).map(x => {
                        return x.IsEquipped
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onEquipChangeClicked(x, false)}>Unequip</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={() => onEquipChangeClicked(x, true)}>Equip</Button>
                                    </Grid>
                                    <ArmorStatBlock armor={x} />
                                </Grid>
                            </ListItem>
                    })}
                </List>
            </Grid>
        </Grid>
}