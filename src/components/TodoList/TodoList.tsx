import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  sortBy: 'all' | 'active' | 'completed';
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  sortBy,
  setSelectedTodo,
  selectedTodo,
}) => {
  const filterdTodos: Todo[] = [...todos].filter((todo: Todo): boolean => {
    if (sortBy === 'all') {
      return true;
    }

    if (sortBy === 'active') {
      return todo.completed === false;
    }

    if (sortBy === 'completed') {
      return todo.completed === true;
    }
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
        {filterdTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}

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
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
