import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { IsSmallScreen } from "../../../helpers/MediaQueryHelper";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Gear } from "../../../interfaces/Gear";
import { useAppStyles } from "../../AppStyles";
import { GearInput } from "../Input/GearInput";

interface ModifyGearProps {
    gearList: Gear[],
    toggleSaveSuccessSnackBar(value: boolean): void
}

export const ModifyGear = ({ gearList, toggleSaveSuccessSnackBar }: ModifyGearProps) => {
    const [selectedGear, setSelectedGear] = React.useState(gearList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updateGearList = async (gear: Gear) => {

        let gearToUpdateIndex = gearList.findIndex(x => x.Id == gear.Id);
        gearList[gearToUpdateIndex] = gear;

        await validateCharacterModels(gear.Id, ModelType.Gear);
    }

    const isSmallScreen = IsSmallScreen();

    return (
        <Grid container justifyContent="center">
            <Grid item>
                {isSmallScreen &&
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}>
                            <Typography>Gear List</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.scrollBox}>
                            <List component="nav">
                                {gearList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => setSelectedGear(x)}>
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
                        {gearList.map(x => {
                            return (
                                <ListItem key={x.Id} button onClick={() => setSelectedGear(x)}>
                                    <Typography>{x.Name}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Grid>
            <Grid item>
                <GearInput selectedGear={selectedGear} isModify={true} key={selectedGear.Id} updateGearList={updateGearList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}