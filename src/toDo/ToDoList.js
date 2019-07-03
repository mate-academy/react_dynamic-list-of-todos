import React from "react";

import ToDoItem from "../toDo/ToDoItem";
import User from "../user/User";
import {
  SORT_ORDER_TITLE,
  SORT_ORDER_COMPLETED,
  SORT_ORDER_USER
} from "../helper/Helper";
import "../toDo/TableStyle.css";

const ToDoList = ({ toDoItems, sortBy }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => {
              sortBy(SORT_ORDER_COMPLETED);
            }}
            className="table-border pointer"
          >
            Is completed
          </th>
          <th
            onClick={() => {
              sortBy(SORT_ORDER_TITLE);
            }}
            className="table-border pointer"
          >
            ToDo item
          </th>
          <th
            onClick={() => {
              sortBy(SORT_ORDER_USER);
            }}
            className="table-border pointer"
          >
            User
          </th>
        </tr>
      </thead>
      <tbody>
        {toDoItems.map(item => {
          return (
            <tr>
              <ToDoItem key={item.id} item={item} />
              <User user={item.user} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ToDoList;
