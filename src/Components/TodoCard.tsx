import React from 'react';

import { Todo } from '../helpers/api';

type Props = {
  todo: Todo;
};

const TodoCard: React.FC<Props> = ({ todo }) => (
  <li className="card" key={todo.id}>
    <br />
    <span className="card__number">{todo.id}</span>
    <p>
      <strong>User: </strong>
      <i className="user__name">{todo.user?.name}</i>
    </p>
    <p>
      <strong>To-do: </strong>
      <i>{todo.title}</i>
    </p>
    <p>
      <strong>Complete: </strong>
      {
        todo.completed
          ? <span className="todo__done">Done</span>
          : <span className="todo__notDone">In process</span>
      }
    </p>
  </li>
);

export default TodoCard;
