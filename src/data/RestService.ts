import axios from "axios";
import { ModelType } from "../interfaces/Enumerations/ModelType";
import { SyncModel } from "../interfaces/SyncModel";

const baseApiRoute = "https://localhost:5001/syncModel/";

export const getSyncModels = async (): Promise<SyncModel[]> => {

    const action = `getAll`;
    const response = await axios.get(`${baseApiRoute}${action}`);
    const syncModels = response.data as SyncModel[];

    return syncModels;
}

export const updateSyncModels = async (syncModels: SyncModel[]) => {

    const action = `addOrUpdate`;
    await axios.post(`${baseApiRoute}${action}`, syncModels);
}

export const addNewCharacter = async () => {

    const action = `newCharacter`;
    await axios.post(`${baseApiRoute}${action}`);
}

export const deleteCharacter = async (id: string) => {

    const action = `delete/${id}`;
    await axios.delete(`${baseApiRoute}${action}`);
}

export const validateCharacterModels = async (id: string, modelType: ModelType) => {
    const action = `validateCharacterModels/${id}/${modelType}`;
    await axios.post(`${baseApiRoute}${action}`);
}