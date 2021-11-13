import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import React from "react";
import { addOrUpdateModelAtSyncAPI } from "../../../data/SyncModelService";
import { Archetype } from "../../../interfaces/Archetype";
import { ModelType } from "../../../interfaces/Enumerations/ModelType";
import { useAppStyles } from "../../AppStyles";

export const ArchetypeInput = () => {

    const setInitalArchetypeValues = (): Archetype => {

        const initialArchetype: Archetype = {
            Id: "",
            Name: "",
            Keywords: "",
            ArchetypeAbility: "",
            Tier: 0,
            XPCost: 0,
            AttributeBonus: 0,
            SkillBonus: 0,
            Influence: 0
        };

        return initialArchetype;
    }

    const [Archetype, setArchetype] = React.useState(setInitalArchetypeValues());
    const classes = useAppStyles();

    const submitArchetype = async () => {

        await addOrUpdateModelAtSyncAPI(Archetype, ModelType.Archetype);

        setArchetype(setInitalArchetypeValues());
    }

    const onChangeString = (propertyName: string, value: string) => {
        setArchetype({
            ...Archetype,
            [propertyName]: value
        });
    }

    const onChangeNumber = (propertyName: string, value: number) => {

        if (isNaN(value)) value = 0;

        setArchetype({
            ...Archetype,
            [propertyName]: value
        });
    }

    return (
        <div>
            <Grid container justifyContent="center" className={classes.mb25}>
                <Grid item xs={12} md={8} lg={8}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <TextField value={Archetype.Name} onChange={(e) => onChangeString("Name", e.target.value.toString())} label="Name" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Archetype.Keywords} onChange={(e) => onChangeString("Keywords", e.target.value.toString())} label="Keywords" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Archetype.Tier.toString()} onChange={(e) => onChangeNumber("Tier", parseFloat(e.target.value))} type="number" label="Tier" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Archetype.XPCost.toString()} onChange={(e) => onChangeNumber("XPCost", parseFloat(e.target.value))} type="number" label="XP Cost" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Archetype.AttributeBonus.toString()} onChange={(e) => onChangeNumber("AttributeBonus", parseFloat(e.target.value))} type="number" label="Attribute Bonus" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField value={Archetype.SkillBonus.toString()} onChange={(e) => onChangeNumber("SkillBonus", parseFloat(e.target.value))} type="number" label="Skill Bonus" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField value={Archetype.ArchetypeAbility}
                                    label="Ability Description"
                                    onChange={(e) => onChangeString("ArchetypeAbility", e.target.value.toString())}
                                    multiline
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={submitArchetype}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

function addArchetypeAtSyncAPI(Archetype: Archetype) {
    throw Error("Function not implemented.");
}
