import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, FormControl, Grid, IconButton, List, ListItem, Select, Snackbar, Switch, Typography, } from "@material-ui/core";
import { AddBox, AddBoxOutlined, ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { getSyncModels } from "../../data/RestService";
import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { Threat } from "../../interfaces/Threat";
import { useAppStyles } from "../AppStyles";
import { DiceRoller } from "../CharacterSheet/CharacterSheetActions/DiceRoller";
import { ThreatStatBlock } from "./ThreatStatBlock";

export const ThreatManager = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [threatList, setThreatList] = React.useState([] as Threat[]);
    const [encounterList, setEncounterList] = React.useState([] as Threat[]);
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(false);
    const classes = useAppStyles();

    useEffect(() => {

        if (threatList?.length <= 0) {
            getContent()
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        }

    }, []);

    const getContent = async () => {
        await getSyncModels()
            .then((models) => {
                setThreatList(getDeserializedModelsForModelType(models, ModelType.Threat))
            });
    }

    const onThreatSelected = (threat: Threat) => {
        setIsAccordionExpanded(false);
        const newEncounterList = [...encounterList];
        newEncounterList.push({ ...threat });
        setEncounterList(newEncounterList);
    }

    const resetThreatList = () => setEncounterList([] as Threat[]);

    return !isLoading
        ?
        <Grid container justifyContent="center">
            <Grid container justifyContent="center" className={classes.mt5}>
            <Grid item>
                        <Button variant="outlined" onClick={resetThreatList}>Reset Encounter List</Button>
                    </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Accordion expanded={isAccordionExpanded} onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                        <AccordionSummary
                            expandIcon={<AddBoxOutlined />}>
                            <Typography>Add Threat</Typography>
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
            </Grid>
            {encounterList.length > 0 &&
                <List component="nav" className={classes.scrollBoxLong}>
                    {encounterList.map((x, key) => {
                        return (
                            <ListItem key={key}>
                                <ThreatStatBlock key={key} threat={x} />
                            </ListItem>
                        )
                    })}
                </List>}
        </Grid>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>
}
