import { Character } from "../interfaces/Character";
import { Weapon } from "../interfaces/Weapon";

export const HitCheck = (weapon: Weapon, character: Character) => weapon.IsMelee ? character.SkillChecks.Weapon : character.SkillChecks.Ballistic;