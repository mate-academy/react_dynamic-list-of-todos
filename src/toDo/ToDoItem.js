import React from "react";
import User from "../user/User";

const ToDoItem = ({ item }) => {
  return (
    <>
      <td className="table-border">
        <input type="checkbox" checked={item.completed} />
      </td>

      <td className="table-border">{item.title}</td>
      <User user={item.user} />
    </>
  );
};

export default ToDoItem;
