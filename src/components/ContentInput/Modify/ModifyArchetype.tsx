import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { IsSmallScreen } from "../../../helpers/MediaQueryHelper";
import { Archetype } from "../../../interfaces/Archetype";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { useAppStyles } from "../../AppStyles";
import { ArchetypeInput } from "../Input/ArchetypeInput";

interface ModifyArchetypeProps {
    ArchetypeList: Archetype[],
    toggleSaveSuccessSnackBar(value: boolean): void
}

export const ModifyArchetype = ({ ArchetypeList, toggleSaveSuccessSnackBar }: ModifyArchetypeProps) => {
    const [selectedArchetype, setSelectedArchetype] = React.useState(ArchetypeList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updateArchetypeList = async (Archetype: Archetype) => {

        let ArchetypeToUpdateIndex = ArchetypeList.findIndex(x => x.Id == Archetype.Id);
        ArchetypeList[ArchetypeToUpdateIndex] = Archetype;

        await validateCharacterModels(Archetype.Id, ModelType.Archetype);
    }

    const isSmallScreen = IsSmallScreen();

    return (
        <Grid container justifyContent="center">
            <Grid item>
                {isSmallScreen &&
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}>
                            <Typography>Archetype List</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.scrollBox}>
                            <List component="nav">
                                {ArchetypeList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => setSelectedArchetype(x)}>
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
                        {ArchetypeList.map(x => {
                            return (
                                <ListItem key={x.Id} button onClick={() => setSelectedArchetype(x)}>
                                    <Typography>{x.Name}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Grid>
            <Grid item xs={12} md={6}>
                <ArchetypeInput selectedArchetype={selectedArchetype} isModify={true} key={selectedArchetype.Id} updateArchetypeList={updateArchetypeList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}