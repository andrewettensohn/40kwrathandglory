import axios from "axios";
import { SyncModel } from "../interfaces/SyncModel";

const baseApiRoute = "https://wrathandglorysyncapi.azurewebsites.net/sync/";

export const getSyncModels = async (): Promise<SyncModel[]> => {

    const action = `syncModels`;
    const response = await axios.get(`${baseApiRoute}${action}`);
    const syncModels = response.data as SyncModel[];

    return syncModels;
}