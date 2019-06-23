import React from "react";
import User from "./User";

function TodoItem(props) {
  return (
    <tr className={props.item.completed ? "completed" : "notComplited"}>
      <td>{props.item.title}</td>
      <User name={props.item.user.name} />
      <td>{`${props.item.completed}`}</td>
    </tr>
  );
}

export default TodoItem;
