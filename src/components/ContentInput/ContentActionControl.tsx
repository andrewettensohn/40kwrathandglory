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
import { ThreatInput } from "./Input/ThreatInput";
import { ModifyThreat } from "./Modify/ModifyThreat";
import { PyschicPowerInput } from "./Input/PyschicPowerInput";
import { ModifyPyschicPower } from "./Modify/ModifyPyschicPower";

interface ContentActionControlProps {
    modelType: ModelType,
    syncModels: SyncModel[],
    isCreateMode: boolean,
    toggleSaveSuccessSnackBar(value: boolean): void,
}

export const ContentActionControl = ({ modelType, syncModels, isCreateMode, toggleSaveSuccessSnackBar }: ContentActionControlProps) => {

    if (modelType == ModelType.Archetype) {
        return isCreateMode
            ?
            <ArchetypeInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyArchetype ArchetypeList={getDeserializedModelsForModelType(syncModels, ModelType.Archetype)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Gear) {
        return isCreateMode
            ?
            <GearInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyGear gearList={getDeserializedModelsForModelType(syncModels, ModelType.Gear)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Armor) {
        return isCreateMode
            ?
            <ArmorInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyArmor ArmorList={getDeserializedModelsForModelType(syncModels, ModelType.Armor)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Talent) {
        return isCreateMode
            ?
            <TalentInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyTalent TalentList={getDeserializedModelsForModelType(syncModels, ModelType.Talent)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Weapon) {
        return isCreateMode
            ?
            <WeaponInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyWeapon WeaponList={getDeserializedModelsForModelType(syncModels, ModelType.Weapon)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Threat) {
        return isCreateMode
            ?
            <ThreatInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} syncModels={syncModels} />
            :
            <ModifyThreat syncModels={syncModels} threatList={getDeserializedModelsForModelType(syncModels, ModelType.Threat)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else if (modelType == ModelType.Pyschic) {
        return isCreateMode
            ?
            <PyschicPowerInput isModify={false} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
            :
            <ModifyPyschicPower PyschicPowerList={getDeserializedModelsForModelType(syncModels, ModelType.Pyschic)} toggleSaveSuccessSnackBar={toggleSaveSuccessSnackBar} />
    } else {
        return (<div></div>)
    }
}