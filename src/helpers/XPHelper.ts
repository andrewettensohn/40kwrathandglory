import { Archetype } from "../interfaces/Archetype";
import { Character } from "../interfaces/Character";

const attributeCost = 4;
const skillCost = 2;

export const CalculateXpForArchetype = (character: Character, archetype: Archetype): number => {

    if (archetype.AttributeBonus > 0) {
        character.XP += archetype.AttributeBonus * attributeCost;
    }

    if (archetype.SkillBonus > 0) {
        character.XP += archetype.SkillBonus * skillCost;
    }

    character.XP -= archetype.XPCost;

    return character.XP;
}

export const calculateXpForAttributeChange = (oldAttributeValue: number, newAttributeValue: number, xp: number): number => {

    if (oldAttributeValue == newAttributeValue) return xp;

    const isIncrease = newAttributeValue > oldAttributeValue as boolean;

    if (isIncrease) {
        let attributeValueChange = newAttributeValue - oldAttributeValue;
        xp -= attributeValueChange * attributeCost;
    } else {
        let attributeValueChange = oldAttributeValue - newAttributeValue;
        xp += attributeValueChange * attributeCost;
    }

    return xp;
}

export const calculateXpForSkillChange = (oldSkillValue: number, newSkillValue: number, xp: number): number => {

    if (oldSkillValue == newSkillValue) return xp;

    const isIncrease = newSkillValue > oldSkillValue as boolean;

    if (isIncrease) {
        let attributeValueChange = newSkillValue - oldSkillValue;
        xp -= attributeValueChange * skillCost;
    } else {
        let attributeValueChange = oldSkillValue - newSkillValue;
        xp += attributeValueChange * skillCost;
    }

    return xp;
}