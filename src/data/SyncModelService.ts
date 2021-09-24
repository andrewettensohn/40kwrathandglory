import { getDeserializedModelsForModelType } from "../helpers/SyncModelHelper";
import { Character } from "../interfaces/Character";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { SyncModel } from "../interfaces/SyncModel";
import { getSyncModels, updateSyncModels } from "./RestService";

export const getCharacterListFromSyncAPI = async (): Promise<Character[]> => {

    let characterList = [] as Character[];
    const syncModels = await getSyncModels();

    characterList = getDeserializedModelsForModelType(syncModels, ModelType.Character);

    return characterList;
}

export const updateCharacterAtSyncAPI = async (character: Character) => {

    const syncModel = {
        id: character.Id,
        json: JSON.stringify(character),
        modelType: ModelType.Character,
        lastUpdateDateTime: new Date().toISOString()
    } as SyncModel

    const syncModelList = [syncModel] as SyncModel[];

    await updateSyncModels(syncModelList);
}