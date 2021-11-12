import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { ArchetypeInput } from "./InputControls/ArchetypeInput";
import { GearInput } from "./InputControls/GearInput";
import { ArmorInput } from "./InputControls/ArmorInput";
import { WeaponInput } from "./InputControls/WeaponInput";
import { TalentInput } from "./InputControls/TalentInput";

interface ContentActionControlProps {
    modelType: ModelType,
    syncModels: SyncModel[],
    isCreateMode: boolean
}

export const ContentActionControl = ({ modelType, syncModels, isCreateMode }: ContentActionControlProps) => {

    if (modelType == ModelType.Archetype) {
        return isCreateMode
            ?
            <ArchetypeInput />
            :
            <div></div>
    } else if (modelType == ModelType.Gear) {
        return isCreateMode
            ?
            <GearInput />
            :
            <div></div>
    } else if (modelType == ModelType.Armor) {
        return isCreateMode
            ?
            <ArmorInput />
            :
            <div></div>
    } else if (modelType == ModelType.Talent) {
        return isCreateMode
            ?
            <TalentInput />
            :
            <div></div>
    } else if (modelType == ModelType.Weapon) {
        return isCreateMode
            ?
            <WeaponInput />
            :
            <div></div>
    } else {
        return (<div></div>)
    }
}