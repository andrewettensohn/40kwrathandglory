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
import { ArmorAction } from "./CharacterSheetActions/ArmorAction";
import { AttributesAction } from "./CharacterSheetActions/AttributesAction";
import { CombatAction } from "./CharacterSheetActions/CombatAction";
import { GearAction } from "./CharacterSheetActions/GearAction";
import { QuestList } from "./CharacterSheetActions/Quests";
import { SkillsAction } from "./CharacterSheetActions/SkillsAction";
import { SkillsCheckAction } from "./CharacterSheetActions/SkillsCheckAction";
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
    } else if (actionType == ActionType.Combat) {
        return (
            <CombatAction character={character} updateCharacter={updateCharacter} />
        );
    } else if (actionType == ActionType.Checks) {
        return (
            <SkillsCheckAction character={character} />
        );
    } else if (actionType == ActionType.Armor) {
        return (
            <ArmorAction armorList={getDeserializedModelsForModelType(syncModels, ModelType.Armor)} updateCharacter={updateCharacter} character={character} />
        );
    } else if (actionType == ActionType.Gear) {
        return (
            <GearAction gearList={getDeserializedModelsForModelType(syncModels, ModelType.Gear)} updateCharacter={updateCharacter} character={character} />
        );
    } else {

        return (<div></div>)
    }
}