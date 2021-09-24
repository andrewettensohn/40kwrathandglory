import { List, ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

export const CharacterListItem = (props: { character: Character; }) => {

    if (props.character) {

        return (
            <ListItemLink href={`/characterSheet?id=${props.character.Id}`}>
                <ListItemText primary={props.character.Name} />
            </ListItemLink>
        );
    } else {
        return (<div></div>);
    }
}