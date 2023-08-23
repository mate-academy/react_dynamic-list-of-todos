import React, { useContext } from 'react';

import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../TodosContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

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
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <tr>
            <td colSpan={3}>No matches</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
