import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { Armor } from "../../../interfaces/Armor";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { ArmorInput } from "../Input/ArmorInput";

interface ModifyArmorProps {
    ArmorList: Armor[],
    toggleSaveSuccessSnackBar(value: boolean): void
}

export const ModifyArmor = ({ ArmorList, toggleSaveSuccessSnackBar }: ModifyArmorProps) => {
    const [selectedArmor, setSelectedArmor] = React.useState(ArmorList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);

    const updateArmorList = async (Armor: Armor) => {

        let ArmorToUpdateIndex = ArmorList.findIndex(x => x.Id == Armor.Id);
        ArmorList[ArmorToUpdateIndex] = Armor;

        await validateCharacterModels(Armor.Id, ModelType.Armor);
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
            <Grid item xs={12} md={6}>
                <ArmorInput selectedArmor={selectedArmor} isModify={true} key={selectedArmor.Id} updateArmorList={updateArmorList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}