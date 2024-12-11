import React from 'react';

import { Todo as TodoType } from '../../types/Todo';

import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoType[];

  handleClick: (todo: TodoType) => void;
};

export const TodoList: React.FC<Props> = ({ todos, handleClick }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} handleClick={handleClick} />
        ))}
      </tbody>
    </table>
  );
};
