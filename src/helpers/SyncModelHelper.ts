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

    if (characterSyncModel !== undefined) {
        character = JSON.parse(characterSyncModel.json);
    }

    return character;
}
