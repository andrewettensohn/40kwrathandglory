import { Grid, List, ListItem, Button, Typography, Divider, IconButton } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { WeaponStatBlock } from "./WeaponStatBlock";

interface WeaponActionProps {
    weaponsList: Weapon[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const WeaponAction = ({ weaponsList, character, updateCharacter }: WeaponActionProps): JSX.Element => {

    const [showInput, setShowInput] = React.useState(false);

    const onManageWeaponsClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (id: string): Promise<void> => {
        const newWeapon = weaponsList.find(x => x.Id == id);

        if (newWeapon !== undefined) {
            const update = character;
            update.Weapons.push(newWeapon);
            await updateCharacter(update);
        }
    }

    const onRemoveFromInventoryClicked = async (id: string): Promise<void> => {
        const update = character;
        update.Weapons = update.Weapons.filter(x => x.Id != id);
        await updateCharacter(update);
    }

    const onEquipChangeClicked = async (id: string, isEquipped: boolean): Promise<void> => {
        const update = character;
        const weaponToEquip = update.Weapons.find(x => x.Id == id);

        if (weaponToEquip !== undefined) {
            weaponToEquip.IsEquipped = isEquipped;
            await updateCharacter(update);
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
                    onClick={onManageWeaponsClicked}>Close</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {weaponsList.map(x => {
                        return character.Weapons.some(y => y.Id == x.Id)
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onRemoveFromInventoryClicked(x.Id)}>Remove From Inventory</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onAddToInventoryClicked(x.Id)}>Add to Inventory</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
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
                    onClick={onManageWeaponsClicked}>Manage</Button>
            </Grid>
            <Grid item>
                <List component="nav">
                    {character.Weapons.map(x => {
                        return x.IsEquipped
                            ?
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x.Id, false)}>Unequip</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x.Id, true)}>Equip</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                    })}
                </List>
            </Grid>
        </Grid>
}