import React from 'react';
import User from "./User";

function TodoItem(props) {
    return (
      <tr>
        <td>{props.item}</td>
        <User name={props.name}/>
        <td>{props.complete}</td>
      </tr>
    );
}

export default TodoItem;
