import { ArmorTraits } from "./ArmorTraits";

export interface Armor {
    Id: string;
    Name: string;
    Description: string;
    AR: number;
    Value: string;
    Keywords: string;
    IsEquipped: boolean;
    Traits: ArmorTraits;
}