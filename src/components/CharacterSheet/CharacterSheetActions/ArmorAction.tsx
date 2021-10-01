import { Grid, List, ListItem, Button, Typography, Divider, IconButton } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Armor } from "../../../interfaces/Armor";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { ArmorStatBlock } from "./ArmorStatBlock";
import { WeaponStatBlock } from "./WeaponStatBlock";

interface ArmorActionProps {
    armorList: Armor[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const ArmorAction = ({ armorList, character, updateCharacter }: ArmorActionProps): JSX.Element => {

    const [showInput, setShowInput] = React.useState(false);

    const onManageArmorClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (armor: Armor): Promise<void> => {

        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        characterUpdate.Armor.push(armor);

        const armorList = character.Armor;
        armorList.push(armor);

        await updateCharacter({
            ...character,
            Armor: armorList
        });
    }

    const onRemoveFromInventoryClicked = async (armor: Armor): Promise<void> => {

        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        characterUpdate.Armor = characterUpdate.Armor.filter(x => x.Id != armor.Id);
        await updateCharacter(characterUpdate);
    }

    const onEquipChangeClicked = async (armor: Armor, isEquipped: boolean): Promise<void> => {
        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        const weaponToEquip = characterUpdate.Armor.find(x => x.Id == armor.Id);
        //characterUpdate.Armor = 

        if (weaponToEquip !== undefined) {
            weaponToEquip.IsEquipped = isEquipped;
            await updateCharacter(characterUpdate);
        }
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