import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { Talent } from "../../../interfaces/Talent";
import { TalentInput } from "../Input/TalentInput";

interface ModifyTalentProps {
    TalentList: Talent[],
}

export const ModifyTalent = ({ TalentList }: ModifyTalentProps) => {
    const [selectedTalent, setSelectedTalent] = React.useState(TalentList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);

    const updateTalentList = (Talent: Talent) => {

        let TalentToUpdateIndex = TalentList.findIndex(x => x.Id == Talent.Id);
        TalentList[TalentToUpdateIndex] = Talent;
    }

    const onTalentSelected = (Talent: Talent) => {
        setIsAccordionExpanded(false);
        setSelectedTalent(Talent);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>Talent List</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List component="nav">
                            {TalentList.map(x => {
                                return (
                                    <ListItem key={x.Id} button onClick={() => onTalentSelected(x)}>
                                        <Typography>{x.Name}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <TalentInput selectedTalent={selectedTalent} isModify={true} key={selectedTalent.Id} updateTalentList={updateTalentList} />
            </Grid>
        </Grid>
    );
}