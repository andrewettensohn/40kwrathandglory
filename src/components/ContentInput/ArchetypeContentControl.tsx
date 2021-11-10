import { Archetype } from "../../interfaces/Archetype";

interface ArchetypeContentControlProps {
    isCreateMode: boolean,
    archeTypes: Archetype[],
    updateCharacter: (character: Character) => Promise<void>
}

export const ArchetypeContentControl = () => {

}