import { List, ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import React from "react";
import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { Archetype } from "../../interfaces/Archetype";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { ArchetypeAction } from "./CharacterSheetActions/ArchetypeAction";
import { AttributesAction } from "./CharacterSheetActions/AttributesAction";

export const SheetActionControl = (props: {
    character: Character,
    actionType: ActionType,
    syncModels: SyncModel[],
    updateCharacter: (character: Character) => Promise<void>
}) => {

    const actionType = props.actionType;

    if (actionType == ActionType.Archetype) {

        return (
            <ArchetypeAction
                character={props.character}
                updateCharacter={props.updateCharacter}
                archetypeList={getDeserializedModelsForModelType(props.syncModels, ModelType.Archetype)} />
        );
    } else if (actionType == ActionType.Attributes) {
        return (
            <AttributesAction
                character={props.character}
                updateCharacter={props.updateCharacter} />
        );
    } else if (actionType == ActionType.Weapon) {
        return (
            <AttributesAction character={props.character} updateCharacter={props.updateCharacter} />
        );
    } else {
        return (<div></div>)
    }
}