import React from "react";

import ToDoItem from "../toDo/ToDoItem";
import {
  SORT_ORDER_TITLE,
  SORT_ORDER_COMPLETED,
  SORT_ORDER_USER,
  SORT_ORDER_TITLE_BACK,
  SORT_ORDER_COMPLETED_BACK,
  SORT_ORDER_USER_BACK
} from "../helper/Helper";
import "../toDo/TableStyle.css";

const ToDoList = ({ toDoItems, sortBy, sorted }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() =>
              sortBy(
                sorted === SORT_ORDER_COMPLETED
                  ? SORT_ORDER_COMPLETED_BACK
                  : SORT_ORDER_COMPLETED
              )
            }
            className="table-border pointer"
          >
            Is completed
          </th>
          <th
            onClick={() =>
              sortBy(
                sorted === SORT_ORDER_TITLE
                  ? SORT_ORDER_TITLE_BACK
                  : SORT_ORDER_TITLE
              )
            }
            className="table-border pointer"
          >
            ToDo item
          </th>
          <th
            onClick={() =>
              sortBy(
                sorted === SORT_ORDER_USER
                  ? SORT_ORDER_USER_BACK
                  : SORT_ORDER_USER
              )
            }
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ToDoList;
