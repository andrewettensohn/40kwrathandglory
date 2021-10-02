import { Character } from "../interfaces/Character";
//
export class SkillChecks {
    Athletics: number;
    Awareness: number;
    Ballistic: number;
    Cunning: number;
    Deception: number;
    Insight: number;
    Intimidation: number;
    Investigation: number;
    Leadership: number;
    Medicae: number;
    Persuasion: number;
    Pilot: number;
    Pyschic: number;
    Scholar: number;
    Stealth: number;
    Survival: number;
    Tech: number;
    Weapon: number;

    constructor(Character: Character) {
        this.Athletics = Character.Skills.Athletics - 1;
        this.Awareness = Character.Skills.Awareness + Character.Attributes.Intellect;
        this.Ballistic = Character.Skills.Ballistic + Character.Attributes.Agility;
        this.Cunning = Character.Skills.Cunning + Character.Attributes.Fellowship;
        this.Deception = Character.Skills.Deception + Character.Attributes.Fellowship;
        this.Insight = Character.Skills.Insight + Character.Attributes.Fellowship;
        this.Intimidation = Character.Skills.Intimidation + Character.Attributes.Willpower;
        this.Investigation = Character.Skills.Investigation + Character.Attributes.Intellect;
        this.Leadership = Character.Skills.Leadership + Character.Attributes.Willpower;
        this.Medicae = Character.Skills.Medicae + Character.Attributes.Intellect;
        this.Pilot = Character.Skills.Pilot + Character.Attributes.Agility;
        this.Pyschic = Character.Skills.Pyschic + Character.Attributes.Willpower;
        this.Persuasion = Character.Skills.Persuasion + Character.Attributes.Fellowship;
        this.Scholar = Character.Skills.Scholar + Character.Attributes.Intellect;
        this.Stealth = Character.Skills.Stealth + Character.Attributes.Agility;
        this.Survival = Character.Skills.Athletics - 1;
        this.Tech = Character.Skills.Tech + Character.Attributes.Intellect;
        this.Weapon = Character.Skills.Weapon + Character.Attributes.Initiative;
    }

}