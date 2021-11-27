import axios from "axios";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { SyncModel } from "../interfaces/SyncModel";

const baseApiRoute = "https://wrathandglorysyncapi.azurewebsites.net/";

export const getSyncModels = async (): Promise<SyncModel[]> => {

    const action = `syncModel/getAll`;
    const response = await axios.get(`${baseApiRoute}${action}`);
    const syncModels = response.data as SyncModel[];

    return syncModels;
}

export const updateSyncModels = async (syncModels: SyncModel[]) => {

    const action = `syncModel/addOrUpdate`;
    await axios.post(`${baseApiRoute}${action}`, syncModels);
}

export const addNewCharacter = async () => {

    const action = `syncModel/newCharacter`;
    await axios.post(`${baseApiRoute}${action}`);
}

export const deleteCharacter = async (id: string) => {

    const action = `syncModel/delete/${id}`;
    await axios.delete(`${baseApiRoute}${action}`);
}

export const validateCharacterModels = async (id: string, modelType: ModelType) => {
    const action = `syncModel/validateCharacterModels/${id}/${modelType}`;
    await axios.post(`${baseApiRoute}${action}`);
}