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
        const maxWounds = Character.Tier * 2 + Character.Attributes.Toughness;
        const maxShock = Character.Attributes.Willpower + Character.Tier;
        const defense = Character.Attributes.Initiative - 1;
        const resilience = this.getResilience(Character);
        const determination = Character.Attributes.Toughness;
        const resolve = Character.Attributes.Willpower - 1;
        const passiveAwareness = Math.ceil(Character.Skills.Awareness + Character.Attributes.Intellect / 2);
        const conviction = Character.Tier * 2 + Character.Attributes.Willpower;

        this.maxWounds = maxWounds <= 0 ? 1 : maxWounds;
        this.maxShock = maxShock <= 0 ? 1 : maxShock;
        this.defense = defense <= 0 ? 1 : defense;
        this.resilience = resilience <= 0 ? 1 : resilience;
        this.determination = determination <= 0 ? 1 : determination;
        this.resolve = resolve <= 0 ? 1 : resolve;
        this.passiveAwareness = passiveAwareness <= 0 ? 1 : passiveAwareness;
        this.conviction = conviction <= 0 ? 1 : conviction;
    }

    getResilience = (Character: Character): number => {

        let armorRating = 0;
        Character.Armor.map(x => {
            if (x.IsEquipped) {
                armorRating += x.AR
            }
        });

        return Character.Attributes.Toughness + armorRating + 1;
    }

}