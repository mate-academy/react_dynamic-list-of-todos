import React, { useContext, useMemo } from 'react';

import { TodoContext } from '../../context/TodoContext';
import { getFilteredTodos } from '../../services/getFilteredTodos';

import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, query, status } = useContext(TodoContext);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, query, status);
  }, [todos, query, status]);

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
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
