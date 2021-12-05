import { Character } from "../../../interfaces/Character";
import { Gear } from "../../../interfaces/Gear";
import { Grid, List, ListItem, Button, TextField } from "@material-ui/core";
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
    const [characterGear, setCharacterGear] = React.useState([...character.CharacterGear]);
    const [allGear, setAllGear] = React.useState([...gearList])
    const [inventorySearchValue, setInventorySearchValue] = React.useState("");
    const [allGearSearchValue, setAllGearSearchValue] = React.useState("");
    const classes = useAppStyles();

    const onManageArmorClicked = () => setShowInput(!showInput);

    const updateCharacterGear = async (): Promise<void> => {
        await updateCharacter({
            ...character,
            CharacterGear: [...characterGear]
        });
    }

    const onAddToInventoryClicked = async (gear: Gear): Promise<void> => {

        characterGear.push(gear);
        setCharacterGear(characterGear);

        await updateCharacterGear();
    };

    const onRemoveFromInventoryClicked = async (gear: Gear): Promise<void> => {

        const newGearList = [...characterGear.filter(x => x.Id != gear.Id)];
        setCharacterGear(newGearList);

        await updateCharacterGear();
    };

    const onInventorySearchValueChange = (newSearchValue: string) => {

        setInventorySearchValue(newSearchValue);

        if (newSearchValue?.length == 0) {
            setCharacterGear([...character.CharacterGear])
            return;
        }

        const filteredGear = character.CharacterGear.filter(x =>
            x.Name.toLowerCase().includes(newSearchValue.toLowerCase())
        );

        setCharacterGear(filteredGear);
    };

    const onAllGearSearchValueChange = (newSearchValue: string) => {

        setAllGearSearchValue(newSearchValue);

        if (newSearchValue?.length == 0) {
            setAllGear([...gearList]);
            return;
        }

        const filteredWeapons = gearList.filter(x =>
            x.Name.toLowerCase().includes(newSearchValue.toLowerCase())
        );

        setAllGear(filteredWeapons);
    };

    return showInput
        ?
        <div>
            <Grid container className={classes.mt5}>
                <Grid item>
                    <TextField value={allGearSearchValue} onChange={(e) => onAllGearSearchValueChange(e.target.value)} label="Search All Gear" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container className={classes.mt5}>
                <Grid item>
                    <Button
                        startIcon={<ControlCamera />}
                        color="primary"
                        variant="outlined"
                        onClick={onManageArmorClicked}>Close</Button>
                </Grid>
                <Grid item>
                    <List component="nav">
                        {allGear.map(x => {
                            return character.CharacterGear.some(y => y.Id == x.Id)
                                ?
                                <ListItem key={x.Id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => onRemoveFromInventoryClicked(x)}>Remove From Inventory</Button>
                                        </Grid>
                                        <GearInfoBlock gear={x} />
                                    </Grid>
                                </ListItem>
                                :
                                <ListItem key={x.Id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => onAddToInventoryClicked(x)}>Add to Inventory</Button>
                                        </Grid>
                                        <GearInfoBlock gear={x} />
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
                    <TextField value={inventorySearchValue} onChange={(e) => onInventorySearchValueChange(e.target.value)} label="Search Your-+ Gear" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-start" className={classes.mt5}>
                <Grid item>
                    <Button
                        startIcon={<ControlCamera />}
                        color="primary"
                        variant="outlined"
                        onClick={onManageArmorClicked}>Manage</Button>
                </Grid>
                <Grid item>
                    <List component="nav">
                        {characterGear.map(x => {
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
        </div>
}