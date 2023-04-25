import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filteredBy: string;
  searchQuery: string;
  getTodoInfo: (todo: Todo) => void;
  todoId: number | null;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos, filteredBy, searchQuery, getTodoInfo, todoId,
}) => {
  const visibleTodos = useMemo(() => {
    if (filteredBy === 'all' && searchQuery !== '') {
      return todos.filter(todo => todo.title.includes(searchQuery));
    }

    if (filteredBy === 'completed') {
      return todos.filter(todo => {
        return todo.completed === true && todo.title.includes(searchQuery);
      });
    }

    if (filteredBy === 'active') {
      return todos.filter(todo => {
        return todo.completed === false && todo.title.includes(searchQuery);
      });
    }

    return todos;
  }, [searchQuery, filteredBy, todos]);

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
        {
          visibleTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={todo.id === todoId
                ? 'has-background-info-light'
                : ''}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => getTodoInfo(todo)}
                >
                  <span className="icon">
                    <i className={
                      todo.id !== todoId ? 'far fa-eye' : 'far fa-eye-slash'
                    }
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
});
