import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos, selectedTodo, setSelectedTodo,
}) => {
  const selectTodo = useMemo(() => (todo: Todo) => {
    setSelectedTodo(todo);
  }, [selectedTodo]);

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
        {todos.map(todo => (
          <>
            <tr
              data-cy="todo"
              className={classnames(
                { 'has-background-info-light': todo.id === selectedTodo?.id },
              )}
              key={todo.id}
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
                <p className={classnames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodo(todo)}
                >
                  <span className="icon">
                    <i className={classnames('far',
                      (todo.id === selectedTodo?.id)
                        ? 'fa-eye-slash'
                        : 'fa-eye')}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
