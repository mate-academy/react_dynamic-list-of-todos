import React from 'react';
import User from "./User";

function TodoItem(props) {
  return (
    <tr>
      <td>{props.item}</td>
      <User name={props.name}/>
      <td className={props.complete === 'completed' ? "completed" : "notcompleted"}>{props.complete}</td>
    </tr>
  );
}

export default TodoItem;
