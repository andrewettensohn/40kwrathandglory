import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../../interfaces/SyncModel";
import { Threat } from "../../../interfaces/Threat";
import { useAppStyles } from "../../AppStyles";
import { ThreatInput } from "../Input/ThreatInput";

interface ModifyThreatProps {
    syncModels: SyncModel[],
    threatList: Threat[],
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const ModifyThreat = ({ syncModels, threatList, toggleSaveSuccessSnackBar }: ModifyThreatProps) => {
    const [selectedThreat, setSelectedThreat] = React.useState(threatList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updateThreatList = async (threat: Threat) => {

        let threatToUpdateIndex = threatList.findIndex(x => x.Id == threat.Id);
        threatList[threatToUpdateIndex] = threat;

        await validateCharacterModels(threat.Id, ModelType.Threat);
    }

    const onThreatSelected = (threat: Threat) => {
        setIsAccordionExpanded(false);
        setSelectedThreat(threat);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>Threat List</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.scrollBox}>
                        <List component="nav">
                            {threatList.map(x => {
                                return (
                                    <ListItem key={x.Id} button onClick={() => onThreatSelected(x)}>
                                        <Typography>{x.Name}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={6}>
                <ThreatInput selectedThreat={selectedThreat} isModify={true} key={selectedThreat.Id} updateThreatList={updateThreatList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} syncModels={syncModels} />
            </Grid>
        </Grid>
    );
}