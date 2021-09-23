import { List, ListItem, ListItemProps, ListItemText } from "@material-ui/core";
import React from "react";
import { Character } from "../../interfaces/Character";

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

export const CharacterListItem = (props: { character: Character; }) => {

    if (props.character) {

        return (
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItemLink href={`/characterSheet?id=${props.character.Id}`}>
                    <ListItemText primary={props.character.Name} />
                </ListItemLink>
            </List>
        );
    } else {
        return (<div></div>);
    }
}