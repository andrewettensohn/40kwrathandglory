import { Grid, List, ListItem, Button } from "@material-ui/core";
import React from "react";
import { Quest } from "../../../interfaces/Quest";
import { useAppStyles } from "../../AppStyles";
import { QuestInfoBlock } from "./QuestInfoBlock";
import { WeaponStatBlock } from "./WeaponStatBlock";

interface QuestsProps {
    questList: Quest[],
}

export const QuestList = ({ questList }: QuestsProps) => {
    const classes = useAppStyles();

    return (
        <List component="nav">
            {questList.map(x => {
                return (
                    <ListItem key={x.Id}>
                        <QuestInfoBlock quest={x} />
                    </ListItem>
                )
            })}
        </List>
    )
}