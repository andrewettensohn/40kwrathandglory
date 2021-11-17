import { Character } from "../interfaces/Character";
import { Weapon } from "../interfaces/Weapon";

export const HitCheck = (weapon: Weapon, character: Character) => weapon.IsMelee ? character.SkillChecks.Weapon : character.SkillChecks.Ballistic;

export const WeaponDamageCheck = (weapon: Weapon, character: Character) => weapon.IsMelee ? weapon.Damage + character.Attributes.Strength : weapon.Damage;
