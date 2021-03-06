import { CombatTraits } from "../classes/CombatTraits";
import { SkillChecks } from "../classes/SkillChecks";
import { Character } from "../interfaces/Character";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { SyncModel } from "../interfaces/SyncModel";

export const getDeserializedModelsForModelType = (syncModels: SyncModel[], modelType: ModelType): any[] => {

    let modelList = [] as any[];

    syncModels.forEach((x) => {
        if (x.modelType === modelType) {
            modelList.push(JSON.parse(x.json));
        }

        return;
    });

    return modelList;
}

export const getCharacterFromSyncModelListForId = (syncModels: SyncModel[], id: string): Character => {

    let character = {} as Character;
    let characterSyncModel = {} as SyncModel | undefined;

    characterSyncModel = syncModels.find(x => x.id === id);

    if (characterSyncModel !== undefined && characterSyncModel !== null) {
        character = JSON.parse(characterSyncModel.json);

        character.CombatTraits = new CombatTraits({ ...character });
        character.SkillChecks = new SkillChecks({ ...character });
    }

    return character;
}
