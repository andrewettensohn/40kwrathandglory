import { WeaponTraits } from "./WeaponTraits";

export interface Weapon {
    Id: string;
    Name: string;
    Description: string;
    Damage: number;
    ED: number;
    AP: number;
    Salvo: string;
    Range: string;
    IsMelee: boolean;
    IsEquipped: boolean;
    Traits: WeaponTraits;
}