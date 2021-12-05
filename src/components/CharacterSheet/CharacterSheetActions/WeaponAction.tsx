import { Grid, List, ListItem, Button, Typography, Divider, IconButton, Modal, Paper, Box, TextField } from "@material-ui/core";
import { ControlCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import { HitCheck } from "../../../helpers/CheckHelper";
import { Character } from "../../../interfaces/Character";
import { Weapon } from "../../../interfaces/Weapon";
import { useAppStyles } from "../../AppStyles";
import { DiceRoller } from "./DiceRoller";
import { WeaponStatBlock } from "./WeaponStatBlock";

interface WeaponActionProps {
    weaponsList: Weapon[],
    character: Character,
    updateCharacter: (character: Character) => Promise<void>
}

export const WeaponAction = ({ weaponsList, character, updateCharacter }: WeaponActionProps): JSX.Element => {

    const [showInput, setShowInput] = React.useState(false);
    const [characterWeapons, setCharacterWeapons] = React.useState([...character.Weapons]);
    const [allWeapons, setAllWeapons] = React.useState([...weaponsList])
    const [inventorySearchValue, setInventorySearchValue] = React.useState("");
    const [allWeaponsSearchValue, setAllWeaponsSearchValue] = React.useState("");
    const classes = useAppStyles();

    const updateCharacterWeapons = async () => {
        const characterUpdate = { ...character, "Weapons": characterWeapons }
        await updateCharacter(characterUpdate);
    };

    const onManageWeaponsClicked = () => setShowInput(!showInput);

    const onAddToInventoryClicked = async (weapon: Weapon): Promise<void> => {
        characterWeapons.push(weapon);
        setCharacterWeapons(characterWeapons);

        await updateCharacterWeapons();
    };

    const onRemoveFromInventoryClicked = async (weapon: Weapon): Promise<void> => {
        const newWeaponList = [...characterWeapons.filter(x => x.Id != weapon.Id)];
        setCharacterWeapons(newWeaponList);
        await updateCharacterWeapons();
    };

    const onEquipChangeClicked = async (weapon: Weapon, isEquipped: boolean): Promise<void> => {
        const weaponToEquip = characterWeapons.find(x => x.Id == weapon.Id);

        if (weaponToEquip !== undefined) {
            weaponToEquip.IsEquipped = isEquipped;
            await updateCharacterWeapons();
        }
    };

    const onInventorySearchValueChange = (newSearchValue: string) => {

        setInventorySearchValue(newSearchValue);

        if (newSearchValue?.length == 0) {
            setCharacterWeapons([...character.Weapons])
            return;
        }

        const filteredWeapons = character.Weapons.filter(x =>
            x.Name.toLowerCase().includes(newSearchValue.toLowerCase())
        );

        setCharacterWeapons(filteredWeapons);
    };

    const onAllWeaponsSearchValueChange = (newSearchValue: string) => {

        setAllWeaponsSearchValue(newSearchValue);

        if (newSearchValue?.length == 0) {
            setAllWeapons([...weaponsList]);
            return;
        }

        const filteredWeapons = weaponsList.filter(x =>
            x.Name.toLowerCase().includes(newSearchValue.toLowerCase())
        );

        setAllWeapons(filteredWeapons);
    };

    return showInput
        ?
        <div>
            <Grid container className={classes.mt5}>
                <Grid item>
                    <TextField value={allWeaponsSearchValue} onChange={(e) => onAllWeaponsSearchValueChange(e.target.value)} label="Search All Weapons" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container className={classes.mt5}>
                <Grid item>
                    <Button
                        startIcon={<ControlCamera />}
                        color="primary"
                        variant="outlined"
                        onClick={onManageWeaponsClicked}>Close</Button>
                </Grid>
                <Grid item>
                    <List component="nav">
                        {allWeapons.map(x => {
                            return characterWeapons.some(y => y.Id == x.Id)
                                ?
                                <ListItem key={x.Id}>
                                    <Grid container>
                                        <Grid item>
                                            <Button variant="outlined" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                        </Grid>
                                        <WeaponStatBlock weapon={x} character={character} displayAttackButton={false} />
                                    </Grid>
                                </ListItem>
                                :
                                <ListItem key={x.Id}>
                                    <Grid container>
                                        <Grid item>
                                            <Button variant="outlined" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
                                        </Grid>
                                        <WeaponStatBlock weapon={x} character={character} displayAttackButton={false} />
                                    </Grid>
                                </ListItem>
                        })}
                    </List>
                </Grid>
            </Grid>
        </div>
        :
        <div>
            <Grid container className={classes.mt5}>
                <Grid item>
                    <TextField value={inventorySearchValue} onChange={(e) => onInventorySearchValueChange(e.target.value)} label="Search Weapons" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-start" className={classes.mt5}>
                <Grid item>
                    <Button
                        startIcon={<ControlCamera />}
                        color="primary"
                        variant="outlined"
                        onClick={onManageWeaponsClicked}>Manage</Button>
                </Grid>
                <Grid item>
                    <List component="nav">
                        {characterWeapons.map(x => {
                            return x.IsEquipped
                                ?
                                <ListItem key={x.Id}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Button variant="outlined" onClick={() => onEquipChangeClicked(x, false)}>Unequip</Button>
                                        </Grid>
                                        <Grid item>
                                            <WeaponStatBlock weapon={x} character={character} displayAttackButton={true} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                :
                                <ListItem key={x.Id}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => onEquipChangeClicked(x, true)}>Equip</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <WeaponStatBlock weapon={x} character={character} displayAttackButton={false} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                        })}
                    </List>
                </Grid>
            </Grid>
        </div>
}