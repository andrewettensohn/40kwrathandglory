import { Character } from "../interfaces/Character";

export class CombatTraits {
    maxWounds: number;
    maxShock: number;
    defense: number;
    resilience: number;
    determination: number;
    resolve: number;
    passiveAwareness: number;
    conviction: number;

    constructor(Character: Character) {
        this.maxWounds = Character.Tier * 2 + Character.Attributes.Toughness;
        this.maxShock = Character.Attributes.Willpower + Character.Tier;
        this.defense = Character.Attributes.Initiative - 1;
        this.resilience = this.getResilience(Character);
        this.determination = Character.Attributes.Toughness;
        this.resolve = Character.Attributes.Willpower - 1;
        this.passiveAwareness = Math.ceil(Character.Skills.Awareness + Character.Attributes.Intellect / 2);
        this.conviction = Character.Tier * 2 + Character.Attributes.Willpower;
    }

    getResilience = (Character: Character): number => {
        const equippedArmor = Character.Armor.find(x => x.IsEquipped);
        let armorRating = 0;

        if (equippedArmor !== undefined) {
            armorRating = equippedArmor.AR;
        }

        return Character.Attributes.Toughness + armorRating;
    }

}