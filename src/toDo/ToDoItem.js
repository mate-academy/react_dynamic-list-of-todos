import React from "react";

const ToDoItem = ({ item }) => {
  return (
    <>
      <td className="table-border">
        <input type="checkbox" checked={item.completed} />
      </td>

      <td className="table-border">{item.title}</td>
    </>
  );
};

export default ToDoItem;
