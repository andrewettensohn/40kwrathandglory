import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Archetype } from "../../../interfaces/Archetype";
import { ArchetypeInput } from "../Input/ArchetypeInput";

interface ModifyArchetypeProps {
    ArchetypeList: Archetype[],
}

export const ModifyArchetype = ({ ArchetypeList }: ModifyArchetypeProps) => {
    const [selectedArchetype, setSelectedArchetype] = React.useState(ArchetypeList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);

    const updateArchetypeList = (Archetype: Archetype) => {

        let ArchetypeToUpdateIndex = ArchetypeList.findIndex(x => x.Id == Archetype.Id);
        ArchetypeList[ArchetypeToUpdateIndex] = Archetype;
    }

    const onArchetypeSelected = (Archetype: Archetype) => {
        setIsAccordionExpanded(false);
        setSelectedArchetype(Archetype);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>Archetype List</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List component="nav">
                            {ArchetypeList.map(x => {
                                return (
                                    <ListItem key={x.Id} button onClick={() => onArchetypeSelected(x)}>
                                        <Typography>{x.Name}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item>
                <ArchetypeInput selectedArchetype={selectedArchetype} isModify={true} key={selectedArchetype.Id} updateArchetypeList={updateArchetypeList} />
            </Grid>
        </Grid>
    );
}