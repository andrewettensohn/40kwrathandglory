import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { IsSmallScreen } from "../../../helpers/MediaQueryHelper";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Weapon } from "../../../interfaces/Weapon";
import { useAppStyles } from "../../AppStyles";
import { WeaponInput } from "../Input/WeaponInput";

interface ModifyWeaponProps {
    WeaponList: Weapon[],
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const ModifyWeapon = ({ WeaponList, toggleSaveSuccessSnackBar }: ModifyWeaponProps) => {
    const [selectedWeapon, setSelectedWeapon] = React.useState(WeaponList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updateWeaponList = async (Weapon: Weapon) => {

        let WeaponToUpdateIndex = WeaponList.findIndex(x => x.Id == Weapon.Id);
        WeaponList[WeaponToUpdateIndex] = Weapon;

        await validateCharacterModels(Weapon.Id, ModelType.Weapon);
    }

    const isSmallScreen = IsSmallScreen();

    return (
        <Grid container justifyContent="center">
            <Grid item>
                {isSmallScreen &&
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}>
                            <Typography>Weapon List</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.scrollBox}>
                            <List component="nav">
                                {WeaponList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => setSelectedWeapon(x)}>
                                            <Typography>{x.Name}</Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                }
                {!isSmallScreen &&
                    <List component="nav" className={classes.scrollBox}>
                        {WeaponList.map(x => {
                            return (
                                <ListItem key={x.Id} button onClick={() => setSelectedWeapon(x)}>
                                    <Typography>{x.Name}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Grid>
            <Grid item xs={12} md={6}>
                <WeaponInput selectedWeapon={selectedWeapon} isModify={true} key={selectedWeapon.Id} updateWeaponList={updateWeaponList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}