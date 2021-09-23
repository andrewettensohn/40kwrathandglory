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
};
