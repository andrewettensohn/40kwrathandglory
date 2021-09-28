import { List, ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import React from "react";
import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { Archetype } from "../../interfaces/Archetype";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { AmmoAction } from "./CharacterSheetActions/AmmoAction";
import { ArchetypeAction } from "./CharacterSheetActions/ArchetypeAction";
import { AttributesAction } from "./CharacterSheetActions/AttributesAction";
import { QuestList } from "./CharacterSheetActions/Quests";
import { SkillsAction } from "./CharacterSheetActions/SkillsAction";
import { TalentAction } from "./CharacterSheetActions/TalentAction";
import { WeaponAction } from "./CharacterSheetActions/WeaponAction";

interface SheetActionControlProps {
    character: Character,
    actionType: ActionType,
    syncModels: SyncModel[],
    updateCharacter: (character: Character) => Promise<void>
}

export const SheetActionControl = ({ character, actionType, syncModels, updateCharacter }: SheetActionControlProps) => {

    if (actionType == ActionType.Archetype) {

        return (
            <ArchetypeAction
                character={character}
                updateCharacter={updateCharacter}
                archetypeList={getDeserializedModelsForModelType(syncModels, ModelType.Archetype)} />
        );
    } else if (actionType == ActionType.Attributes) {
        return (
            <AttributesAction
                character={character}
                updateCharacter={updateCharacter} />
        );
    } else if (actionType == ActionType.Weapon) {
        return (
            <WeaponAction
                weaponsList={getDeserializedModelsForModelType(syncModels, ModelType.Weapon)}
                character={character}
                updateCharacter={updateCharacter} />
        );
    } else if (actionType == ActionType.Skills) {
        return (
            <SkillsAction character={character} updateCharacter={updateCharacter} />
        );
    } else if (actionType == ActionType.Ammo) {
        return (
            <AmmoAction character={character} updateCharacter={updateCharacter} />
        );
    } else if (actionType == ActionType.Talent) {
        return (
            <TalentAction character={character} updateCharacter={updateCharacter} talentList={getDeserializedModelsForModelType(syncModels, ModelType.Talent)} />
        );
    } else if (actionType == ActionType.Quest) {
        return (
            <QuestList questList={getDeserializedModelsForModelType(syncModels, ModelType.Quest)} />
        );
    } else {

        return (<div></div>)
    }
}