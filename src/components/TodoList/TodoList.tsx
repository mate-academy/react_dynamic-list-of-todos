import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  select: string;
  query: string;
  handlerModButton: (todo: Todo) => void;
  modButton: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  select,
  query,
  handlerModButton,
  modButton,
}) => {
  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (select === 'all') {
          return todo;
        }

        return todo.completed === (select === 'completed');
      })
      .filter(todo => {
        if (!query) {
          return todo;
        }

        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
  }, [todos, select, query]);

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
        {filteredTodos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handlerModButton(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        todo.id === modButton?.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
