import React from 'react';

import { TodoUser } from './TodoUser';
import { Todo } from '../../types/Todo';

interface PropsTodoList {
  todos: Todo[],
  getClickedDataFromTable: (value: number) => void;
}

export const TodoList: React.FC<PropsTodoList> = ({ todos, getClickedDataFromTable }) => {
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
        {todos.map((todo: Todo) => (
          <TodoUser
            todo={todo}
            key={todo.id}
            getClickedDataFromTable={getClickedDataFromTable}
          />
        ))}
      </tbody>
    </table>
  );
};
