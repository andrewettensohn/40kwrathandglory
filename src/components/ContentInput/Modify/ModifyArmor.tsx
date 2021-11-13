import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Armor } from "../../../interfaces/Armor";
import { ArmorInput } from "../Input/ArmorInput";

interface ModifyArmorProps {
    ArmorList: Armor[],
    toggleSaveSuccessSnackBar(value: boolean): void
}

export const ModifyArmor = ({ ArmorList, toggleSaveSuccessSnackBar }: ModifyArmorProps) => {
    const [selectedArmor, setSelectedArmor] = React.useState(ArmorList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);

    const updateArmorList = (Armor: Armor) => {

        let ArmorToUpdateIndex = ArmorList.findIndex(x => x.Id == Armor.Id);
        ArmorList[ArmorToUpdateIndex] = Armor;
    }

    const onArmorSelected = (Armor: Armor) => {
        setIsAccordionExpanded(false);
        setSelectedArmor(Armor);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>Armor List</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List component="nav">
                            {ArmorList.map(x => {
                                return (
                                    <ListItem key={x.Id} button onClick={() => onArmorSelected(x)}>
                                        <Typography>{x.Name}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <ArmorInput selectedArmor={selectedArmor} isModify={true} key={selectedArmor.Id} updateArmorList={updateArmorList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}