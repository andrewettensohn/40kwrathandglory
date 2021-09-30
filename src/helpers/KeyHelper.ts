import { Ammo } from "../interfaces/Ammo";
import { Attributes } from "../interfaces/Attributes";
import { Skills } from "../interfaces/Skills";


export const isKeyOfAttributes = (
    key: string,
    attributes: Attributes
): key is keyof Attributes => {
    return Object.prototype.hasOwnProperty.call(attributes, key);
};

export const isKeyOfSkills = (
    key: string,
    skills: Skills
): key is keyof Skills => {
    return Object.prototype.hasOwnProperty.call(skills, key);
};

export const isKeyOfAmmo = (
    key: string,
    ammo: Ammo
): key is keyof Ammo => {
    return Object.prototype.hasOwnProperty.call(ammo, key);
};

