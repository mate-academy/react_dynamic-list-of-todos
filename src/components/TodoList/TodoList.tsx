import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todosForRender } = useContext(TodoContext);

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
        {todosForRender.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
