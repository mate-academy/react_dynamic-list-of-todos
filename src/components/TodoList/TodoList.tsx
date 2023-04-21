import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  onClosedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  onClosedTodo,
}) => {
  const [currentTodoId, setCurrentTodoId] = useState(0);

  const handleClick = useCallback((todo: Todo) => {
    setCurrentTodoId(todo.id);
    onSelectTodo(todo);
  }, [onSelectTodo]);

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
        {todos.map((todo) => (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={classNames(
                'has-text',
                {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i className={
                    classNames('far',
                      {
                        'fa-eye': true,
                        'fa-eye-slash': currentTodoId === todo.id
                          && onClosedTodo,
                      })
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
