import { Character } from "../interfaces/Character";

export const AthleticsSkillCheck = (Character: Character): number => {
    return Character.Skills.Athletics - 1;
}

export const AwarenessSkillCheck = (Character: Character): number => {
    return Character.Skills.Awareness + Character.Attributes.Intellect;
}

export const BallisticSkillCheck = (Character: Character): number => {
    return Character.Skills.Ballistic + Character.Attributes.Agility;
}

export const CunningSkillCheck = (Character: Character): number => {
    return Character.Skills.Cunning + Character.Attributes.Fellowship;
}

export const DeceptionSkillCheck = (Character: Character): number => {
    return Character.Skills.Deception + Character.Attributes.Fellowship;
}

export const InsightSkillCheck = (Character: Character): number => {
    return Character.Skills.Insight + Character.Attributes.Fellowship;
}

export const IntimidationSkillCheck = (Character: Character): number => {
    return Character.Skills.Intimidation + Character.Attributes.Willpower;
}

export const InvestigationSkillCheck = (Character: Character): number => {
    return Character.Skills.Investigation + Character.Attributes.Intellect;
}

export const LeadershipSkillCheck = (Character: Character): number => {
    return Character.Skills.Leadership + Character.Attributes.Willpower;
}

export const MedicaeSkillCheck = (Character: Character): number => {
    return Character.Skills.Medicae + Character.Attributes.Intellect;
}

export const PersuasionSkillCheck = (Character: Character): number => {
    return Character.Skills.Persuasion + Character.Attributes.Fellowship;
}

export const PilotSkillCheck = (Character: Character): number => {
    return Character.Skills.Pilot + Character.Attributes.Agility;
}

export const PyschicSkillCheck = (Character: Character): number => {
    return Character.Skills.Pyschic + Character.Attributes.Willpower;
}

export const ScholarSkillCheck = (Character: Character): number => {
    return Character.Skills.Scholar + Character.Attributes.Intellect;
}

export const StealthSkillCheck = (Character: Character): number => {
    return Character.Skills.Stealth + Character.Attributes.Agility;
}

export const SurvivalSkillCheck = (Character: Character): number => {
    return Character.Skills.Survival + Character.Attributes.Willpower;
}

export const TechSkillCheck = (Character: Character): number => {
    return Character.Skills.Survival + Character.Attributes.Intellect;
}

export const WeaponSkillCheck = (Character: Character): number => {
    return Character.Skills.Weapon + Character.Attributes.Initiative;
}

