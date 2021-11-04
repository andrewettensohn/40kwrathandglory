import { Grid, List, ListItem, Button, Typography, Divider, IconButton } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React from "react";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { useAppStyles } from "../../AppStyles";
import { WeaponStatBlock } from "./WeaponStatBlock";

interface WeaponActionProps {
    weaponsList: Weapon[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const WeaponAction = ({ weaponsList, character, updateCharacter }: WeaponActionProps): JSX.Element => {

    const [showInput, setShowInput] = React.useState(false);
    const classes = useAppStyles();

    const onManageWeaponsClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (weapon: Weapon): Promise<void> => {

        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        characterUpdate.Weapons.push(weapon);
        await updateCharacter(characterUpdate);
    }

    const onRemoveFromInventoryClicked = async (weapon: Weapon): Promise<void> => {

        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        characterUpdate.Weapons = characterUpdate.Weapons.filter(x => x.Id != weapon.Id);
        await updateCharacter(characterUpdate);
    }

    const onEquipChangeClicked = async (weapon: Weapon, isEquipped: boolean): Promise<void> => {
        const characterUpdate = JSON.parse(JSON.stringify(character)) as Character;
        const weaponToEquip = characterUpdate.Weapons.find(x => x.Id == weapon.Id);

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
                                        <Button variant="contained" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
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
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x, false)}>Unequip</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                            :
                            <ListItem key={x.Id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={() => onEquipChangeClicked(x, true)}>Equip</Button>
                                    </Grid>
                                    <WeaponStatBlock weapon={x} character={character} />
                                </Grid>
                            </ListItem>
                    })}
                </List>
            </Grid>
        </Grid>
}