import { Character } from "../interfaces/Character";

export const BallisticSkillCheck = (character: Character): number => {
    return character.Skills.Ballistic + character.Attributes.Agility;
}

export const WeaponSkillCheck = (character: Character): number => {
    return character.Skills.Weapon + character.Attributes.Initiative;
}