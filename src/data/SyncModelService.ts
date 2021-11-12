import { getDeserializedModelsForModelType } from "../helpers/SyncModelHelper";
import { Archetype } from "../interfaces/Archetype";
import { Character } from "../interfaces/Character";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { Gear } from "../interfaces/Gear";
import { SyncModel } from "../interfaces/SyncModel";
import { getSyncModels, updateSyncModels } from "./RestService";

const emptyGuid = "00000000-0000-0000-0000-000000000000";

export const getCharacterListFromSyncAPI = async (): Promise<Character[]> => {

    let characterList: Character[] = [];
    const syncModels = await getSyncModels();

    characterList = getDeserializedModelsForModelType(syncModels, ModelType.Character);

    return characterList;
}

export const updateCharacterAtSyncAPI = async (character: Character) => {

    const syncModel: SyncModel = {
        id: character.Id,
        json: JSON.stringify(character),
        modelType: ModelType.Character,
        lastUpdateDateTime: new Date().toISOString()
    }

    const syncModelList: SyncModel[] = [syncModel];
    await updateSyncModels(syncModelList);
}

export const addOrUpdateModelAtSyncAPI = async (model: any, modelType: ModelType) => {
    model.Id = emptyGuid;
    const syncModel: SyncModel = {
        id: model.Id,
        json: JSON.stringify(model),
        modelType: modelType,
        lastUpdateDateTime: new Date().toISOString()
    }

    const syncModelList: SyncModel[] = [syncModel];
    await updateSyncModels(syncModelList);
}