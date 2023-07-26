import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos, status, query } = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    const normalizedQuery = query.toLowerCase();
    const normalizedTitle = todo.title.toLowerCase();

    const titleMatch = normalizedTitle.includes(normalizedQuery);

    const statusMatch = status === Status.All
      || (status === Status.Active && !todo.completed)
      || (status === Status.Completed && todo.completed);

    return titleMatch && statusMatch;
  });

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
