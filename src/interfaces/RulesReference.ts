import { RulesReferenceType } from "./Enumerations/RuleReferenceType";

export interface RulesReference {
    Id: string,
    RuleReferenceType: RulesReferenceType,
    Title: string,
    SubTitle: string,
    Body: string,
    SecondaryBody: string
}