import { Character } from "../interfaces/Character";

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
        const Athletics = Character.Skills.Athletics - 1;
        const Awareness = Character.Skills.Awareness + Character.Attributes.Intellect;
        const Ballistic = Character.Skills.Ballistic + Character.Attributes.Agility;
        const Cunning = Character.Skills.Cunning + Character.Attributes.Fellowship;
        const Deception = Character.Skills.Deception + Character.Attributes.Fellowship;
        const Insight = Character.Skills.Insight + Character.Attributes.Fellowship;
        const Intimidation = Character.Skills.Intimidation + Character.Attributes.Willpower;
        const Investigation = Character.Skills.Investigation + Character.Attributes.Intellect;
        const Leadership = Character.Skills.Leadership + Character.Attributes.Willpower;
        const Medicae = Character.Skills.Medicae + Character.Attributes.Intellect;
        const Pilot = Character.Skills.Pilot + Character.Attributes.Agility;
        const Pyschic = Character.Skills.Pyschic + Character.Attributes.Willpower;
        const Persuasion = Character.Skills.Persuasion + Character.Attributes.Fellowship;
        const Scholar = Character.Skills.Scholar + Character.Attributes.Intellect;
        const Stealth = Character.Skills.Stealth + Character.Attributes.Agility;
        const Survival = Character.Skills.Athletics - 1;
        const Tech = Character.Skills.Tech + Character.Attributes.Intellect;
        const Weapon = Character.Skills.Weapon + Character.Attributes.Initiative;

        this.Athletics = Athletics <= 0 ? 1 : Athletics;
        this.Awareness = Awareness <= 0 ? 1 : Awareness;
        this.Ballistic = Ballistic <= 0 ? 1 : Ballistic;
        this.Cunning = Cunning <= 0 ? 1 : Cunning;
        this.Deception = Deception <= 0 ? 1 : Deception;
        this.Insight = Insight <= 0 ? 1 : Insight;
        this.Intimidation = Intimidation <= 0 ? 1 : Intimidation;
        this.Investigation = Investigation <= 0 ? 1 : Investigation;
        this.Leadership = Leadership <= 0 ? 1 : Leadership;
        this.Medicae = Medicae <= 0 ? 1 : Medicae;
        this.Pilot = Pilot <= 0 ? 1 : Pilot;
        this.Pyschic = Pyschic <= 0 ? 1 : Pyschic;
        this.Persuasion = Persuasion <= 0 ? 1 : Persuasion;
        this.Scholar = Scholar <= 0 ? 1 : Scholar;
        this.Stealth = Stealth <= 0 ? 1 : Stealth;
        this.Survival = Survival <= 0 ? 1 : Survival;
        this.Tech = Tech <= 0 ? 1 : Tech;
        this.Weapon = Weapon <= 0 ? 1 : Weapon;
    }

}