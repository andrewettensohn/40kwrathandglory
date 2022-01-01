import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { validateCharacterModels } from "../../../data/RestService";
import { IsSmallScreen } from "../../../helpers/MediaQueryHelper";
import { PyschicPower } from "../../../interfaces/PyschicPower";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { useAppStyles } from "../../AppStyles";
import { PyschicPowerInput } from "../Input/PyschicPowerInput";

interface ModifyPyschicPowerProps {
    PyschicPowerList: PyschicPower[],
    toggleSaveSuccessSnackBar(value: boolean): void
}

export const ModifyPyschicPower = ({ PyschicPowerList, toggleSaveSuccessSnackBar }: ModifyPyschicPowerProps) => {
    const [selectedPyschicPower, setSelectedPyschicPower] = React.useState(PyschicPowerList[0]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(true);
    const classes = useAppStyles();

    const updatePyschicPowerList = async (PyschicPower: PyschicPower) => {

        let PyschicPowerToUpdateIndex = PyschicPowerList.findIndex(x => x.Id == PyschicPower.Id);
        PyschicPowerList[PyschicPowerToUpdateIndex] = PyschicPower;

        await validateCharacterModels(PyschicPower.Id, ModelType.Pyschic);
    }

    const isSmallScreen = IsSmallScreen();

    return (
        <Grid container justifyContent="center">
            <Grid item>
                {isSmallScreen &&
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}>
                            <Typography>PyschicPower List</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.scrollBox}>
                            <List component="nav">
                                {PyschicPowerList.map(x => {
                                    return (
                                        <ListItem key={x.Id} button onClick={() => setSelectedPyschicPower(x)}>
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
                        {PyschicPowerList.map(x => {
                            return (
                                <ListItem key={x.Id} button onClick={() => setSelectedPyschicPower(x)}>
                                    <Typography>{x.Name}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Grid>
            <Grid item xs={12} md={6}>
                <PyschicPowerInput selectedPower={selectedPyschicPower} isModify={true} key={selectedPyschicPower?.Id} updatePowerList={updatePyschicPowerList} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            </Grid>
        </Grid>
    );
}