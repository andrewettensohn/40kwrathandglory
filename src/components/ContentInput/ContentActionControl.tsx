import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";

interface SheetActionControlProps {
    character: Character,
    actionType: ActionType,
    syncModels: SyncModel[],
    updateCharacter: (character: Character) => Promise<void>
}

export const ContentActionControl = ({ character, actionType, syncModels, updateCharacter }: SheetActionControlProps) => {

    if (actionType == ActionType.Archetype) {
        return (
            <ArchetypeAction
                character={character}
                updateCharacter={updateCharacter}
                archetypeList={getDeserializedModelsForModelType(syncModels, ModelType.Archetype)} />
        );
        // } else if (actionType == ActionType.Weapon) {
        //     return (
        //         <WeaponAction
        //             weaponsList={getDeserializedModelsForModelType(syncModels, ModelType.Weapon)}
        //             character={character}
        //             updateCharacter={updateCharacter} />
        //     );
        // } else if (actionType == ActionType.Talent) {
        //     return (
        //         <TalentAction character={character} updateCharacter={updateCharacter} talentList={getDeserializedModelsForModelType(syncModels, ModelType.Talent)} />
        //     );
        // } else if (actionType == ActionType.Quest) {
        //     return (
        //         <QuestList questList={getDeserializedModelsForModelType(syncModels, ModelType.Quest)} />
        //     );
        // } else if (actionType == ActionType.Armor) {
        //     return (
        //         <ArmorAction armorList={getDeserializedModelsForModelType(syncModels, ModelType.Armor)} updateCharacter={updateCharacter} character={character} />
        //     );
    } else if (actionType == ActionType.Gear) {
        return (
            <GearAction gearList={getDeserializedModelsForModelType(syncModels, ModelType.Gear)} updateCharacter={updateCharacter} character={character} />
        );
    } else {

        return (<div></div>)
    }
}