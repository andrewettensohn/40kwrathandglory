import { Character } from "../interfaces/Character";

export const GetDefenseTrait = (Character: Character) => {
    return Character.Attributes.Initiative - 1;
}

export const GetMaxWoundsTrait = (Character: Character) => {
    return Character.Tier * 2 + Character.Attributes.Toughness;
}

export const GetResilienceTrait = (Character: Character) => {
    const equippedArmor = Character.Armor.find(x => x.IsEquipped);
    let armorRating = 0;

    if (equippedArmor !== undefined) {
        armorRating = equippedArmor.AR;
    }

    return Character.Attributes.Toughness + armorRating;
}

export const GetMaxShockTrait = (Character: Character) => {
    return Character.Attributes.Willpower + Character.Tier;
}

export const GetDeterminationTrait = (Character: Character) => {
    return Character.Attributes.Toughness;
}

export const GetResolveTrait = (Character: Character) => {
    return Character.Attributes.Willpower - 1;
}




