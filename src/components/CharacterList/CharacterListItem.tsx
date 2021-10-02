import { ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import { Character } from "../../interfaces/Character";

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

interface CharacterListItemProps {
    character: Character
}

export const CharacterListItem = ({ character }: CharacterListItemProps) => {

    if (character) {

        return (
            <ListItemLink href={`/characterSheet?id=${character.Id}`} key={character.Id}>
                <ListItemText primary={character.Name} />
            </ListItemLink>
        );
    } else {
        return (<div></div>);
    }
}