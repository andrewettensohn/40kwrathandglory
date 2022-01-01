import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { IsSmallScreen } from "../../../helpers/MediaQueryHelper";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { Talent } from "../../../interfaces/Talent";
import { useAppStyles } from "../../AppStyles";
import { TalentInput } from "../Input/TalentInput";

interface ModifyTalentProps {
    TalentList: Talent[],
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const ModifyTalent = ({ TalentList, toggleSaveSuccessSnackBar }: ModifyTalentProps) => {
    const [selectedTalent, setSelectedTalent] = React.useState(TalentList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updateTalentList = async (Talent: Talent) => {

        let TalentToUpdateIndex = TalentList.findIndex(x => x.Id == Talent.Id);
        TalentList[TalentToUpdateIndex] = Talent;

        await validateCharacterModels(Talent.Id, ModelType.Talent);
    }

    const isSmallScreen = IsSmallScreen();

    return (
        <Grid container justifyContent="center">
            <Grid item>
                {isSmallScreen &&
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}>
                            <Typography>Talent List</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.scrollBox}>
                            <List component="nav">
                                {TalentList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => setSelectedTalent(x)}>
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
                        {TalentList.map(x => {
                            return (
                                <ListItem key={x.Id} button onClick={() => setSelectedTalent(x)}>
                                    <Typography>{x.Name}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Grid>
            <Grid item>
                <TalentInput selectedTalent={selectedTalent} isModify={true} key={selectedTalent.Id} updateTalentList={updateTalentList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid >
    );
}