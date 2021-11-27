
import { Armor } from "./Armor";
import { Attributes } from "./Attributes";
import { PyschicPower } from "./PyschicPower";
import { Skills } from "./Skills";
import { Talent } from "./Talent";
import { Weapon } from "./Weapon";

export interface Threat {
    Id: string;
    Name: string;
    Wounds: number;
    Shock: number;
    Defence: number;
    Resilience: number;
    Conviction: number;
    Resolve: number;
    Speed: number;
    Size: string;
    Description: string;
    AvatarPath: string;
    Attributes: Attributes;
    Skills: Skills;
    DefaultSkill: number;
    Armor: Armor[];
    Talents: Talent[];
    Weapons: Weapon[];
    PsychicPowers: PyschicPower[];
}