import React, { useCallback } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodo,
}) => {
  const handleSelectedTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

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
        {todos.map(todo => {
          const { id, completed, title } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': selectedTodoId === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectedTodo(todo)}
                >
                  <span className="icon">
                    {selectedTodoId === id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
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
