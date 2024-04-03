import React from 'react';

import { useTodos } from '../../store/Store';
import TodoItem from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

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
        {filteredTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
