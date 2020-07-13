import React from 'react';
import User from './User';

import {Todos} from '../api/api';

type Props = {
  todo: Todos;
}

const TodoItem: React.FC<Props> = ({ todo }) => (
  <li className={
    todo.completed
      ? 'todo_item todo_item-done'
      : 'todo_item'
  }
  >
    <User todo={todo} />
    <div>
      <span className="todo_title-text">
        Todos: &nbsp;
      </span>
      {todo.title}
    </div>
    <div className="todo_status">
      {todo.completed
        ? 'True'
        : 'False'}
    </div>
  </li>
);

export default TodoItem;
