import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Weapon } from "../../../interfaces/Weapon";
import { WeaponInput } from "../Input/WeaponInput";

interface ModifyWeaponProps {
    WeaponList: Weapon[],
}

export const ModifyWeapon = ({ WeaponList }: ModifyWeaponProps) => {
    const [selectedWeapon, setSelectedWeapon] = React.useState(WeaponList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);

    const updateWeaponList = (Weapon: Weapon) => {

        let WeaponToUpdateIndex = WeaponList.findIndex(x => x.Id == Weapon.Id);
        WeaponList[WeaponToUpdateIndex] = Weapon;
    }

    const onWeaponSelected = (Weapon: Weapon) => {
        setIsAccordionExpanded(false);
        setSelectedWeapon(Weapon);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>Weapon List</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List component="nav">
                            {WeaponList.map(x => {
                                return (
                                    <ListItem key={x.Id} button onClick={() => onWeaponSelected(x)}>
                                        <Typography>{x.Name}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <WeaponInput selectedWeapon={selectedWeapon} isModify={true} key={selectedWeapon.Id} updateWeaponList={updateWeaponList} />
            </Grid>
        </Grid>
    );
}