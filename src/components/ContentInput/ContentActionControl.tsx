import { getDeserializedModelsForModelType } from "../../helpers/SyncModelHelper";
import { Character } from "../../interfaces/Character";
import { ActionType } from "../../interfaces/Enumerations/ActionType";
import { ModelType } from "../../interfaces/Enumerations/ModelType";
import { SyncModel } from "../../interfaces/SyncModel";
import { ArchetypeInput } from "./Input/ArchetypeInput";
import { GearInput } from "./Input/GearInput";
import { ArmorInput } from "./Input/ArmorInput";
import { WeaponInput } from "./Input/WeaponInput";
import { TalentInput } from "./Input/TalentInput";
import { ModifyGear } from "./Modify/ModifyGear";
import { ModifyTalent } from "./Modify/ModifyTalent";
import { ModifyWeapon } from "./Modify/ModifyWeapon";
import { ModifyArchetype } from "./Modify/ModifyArchetype";
import { ModifyArmor } from "./Modify/ModifyArmor";

interface ContentActionControlProps {
    modelType: ModelType,
    syncModels: SyncModel[],
    isCreateMode: boolean
}

export const ContentActionControl = ({ modelType, syncModels, isCreateMode }: ContentActionControlProps) => {

    if (modelType == ModelType.Archetype) {
        return isCreateMode
            ?
            <ArchetypeInput isModify={false} />
            :
            <ModifyArchetype ArchetypeList={getDeserializedModelsForModelType(syncModels, ModelType.Archetype)} />
    } else if (modelType == ModelType.Gear) {
        return isCreateMode
            ?
            <GearInput isModify={false} />
            :
            <ModifyGear gearList={getDeserializedModelsForModelType(syncModels, ModelType.Gear)} />
    } else if (modelType == ModelType.Armor) {
        return isCreateMode
            ?
            <ArmorInput isModify={false} />
            :
            <ModifyArmor ArmorList={getDeserializedModelsForModelType(syncModels, ModelType.Armor)} />
    } else if (modelType == ModelType.Talent) {
        return isCreateMode
            ?
            <TalentInput isModify={false} />
            :
            <ModifyTalent TalentList={getDeserializedModelsForModelType(syncModels, ModelType.Talent)} />
    } else if (modelType == ModelType.Weapon) {
        return isCreateMode
            ?
            <WeaponInput isModify={false} />
            :
            <ModifyWeapon WeaponList={getDeserializedModelsForModelType(syncModels, ModelType.Weapon)} />
    } else {
        return (<div></div>)
    }
}