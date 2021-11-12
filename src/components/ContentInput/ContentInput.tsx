import { Button, Card, CardActions, CardContent, CircularProgress, FormControl, Grid, InputLabel, ListItem, ListItemProps, ListItemText, makeStyles, Modal, Select, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { deleteCharacter, getSyncModels } from "../../data/RestService";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { useAppStyles } from "../AppStyles";
import { ContentActionControl } from "./ContentActionControl";

export const ContentInput = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedModelType, setSelectedModelType] = React.useState(ModelType.Gear);
    const [syncModels, setSyncModels] = React.useState([] as SyncModel[]);
    const classes = useAppStyles();

    useEffect(() => {

        if (syncModels?.length <= 0) {
            getContent()
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        }

    }, []);

    const getContent = async () => {
        await getSyncModels()
            .then((models) => {
                setSyncModels(models)
            });
    }

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        try {
            const value = event.target.value as number;
            if (!(value in ModelType)) return;

            setSelectedModelType(value);
        }
        catch (err) {
            console.log(err);
        }
    }

    return !isLoading
        ?
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <FormControl>
                            <Select
                                native
                                value={selectedModelType}
                                onChange={(e) => handleChange(e)}
                            >
                                <option value={0}>Archetype</option>
                                <option value={1}>Armor</option>
                                <option value={3}>Gear</option>
                                <option value={6}>Talent</option>
                                <option value={7}>Weapon</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={12} md={12} className={classes.scrollBoxLong}>
                <ContentActionControl modelType={selectedModelType} syncModels={syncModels} isCreateMode={true} />
            </Grid>
        </Grid>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>
}
