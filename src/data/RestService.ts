import axios from "axios";
import { SyncModel } from "../interfaces/SyncModel";

const baseApiRoute = "https://wrathandglorysyncapi.azurewebsites.net/sync/";

export const getSyncModels = async (): Promise<SyncModel[]> => {

    const action = `syncModels`;
    const response = await axios.get(`${baseApiRoute}${action}`);
    const syncModels = response.data as SyncModel[];

    return syncModels;
}

export const updateSyncModels = async (syncModels: SyncModel[]) => {

    const action = `syncModels`;
    await axios.post(`${baseApiRoute}${action}`, syncModels);
}

export const addNewCharacter = async () => {

    const action = `characterSyncModel`;
    await axios.post(`${baseApiRoute}${action}`);
}

export const deleteCharacter = async (id : string) => {

    const action = `syncModels/${id}`;
    await axios.delete(`${baseApiRoute}${action}`);
}