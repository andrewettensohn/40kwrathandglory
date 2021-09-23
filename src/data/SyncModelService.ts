import { getDeserializedModelsForModelType } from "../helpers/SyncModelHelper";
import { Character } from "../interfaces/Character";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { getSyncModels } from "./RestService";

export const getCharacterListFromSyncAPI = async (): Promise<Character[]> => {

    let characterList = [] as Character[];
    const syncModels = await getSyncModels();

    characterList = getDeserializedModelsForModelType(syncModels, ModelType.Character);

    return characterList;
}