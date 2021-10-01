import { Attributes } from "./Attributes";
import { Skills } from "./Skills";
import { Archetype } from "./Archetype";
import { Ammo } from "./Ammo";
import { Armor } from "./Armor";
import { Talent } from "./Talent";
import { Weapon } from "./Weapon";
import { Gear } from "./Gear";
import { PyschicPower } from "./PyschicPower";
import { CombatTraits } from "../classes/CombatTraits";
import { SkillChecks } from "../classes/SkillChecks";

export interface Character {
    Id: string;
    Name: string;
    XP: number;
    CurrentWounds: number;
    CurrentShock: number;
    Tier: number;
    Rank: number;
    Notes: string;
    Wrath: number;
    Glory: number;
    AvatarPath: string;
    Attributes: Attributes;
    Skills: Skills;
    Archetype: Archetype;
    Ammo: Ammo;
    Armor: Armor[];
    Talents: Talent[];
    Weapons: Weapon[];
    CharacterGear: Gear[];
    PsychicPowers: PyschicPower[];
    CombatTraits: CombatTraits;
    SkillChecks: SkillChecks
}