import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onSelectedTodo: (val: Todo) => void,
  todos: Todo[],
  onFind: (id: number) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  onSelectedTodo,
  todos,
  onFind,
  selectedTodo,
}) => {
  const selectTodo = (todo: Todo) => {
    onSelectedTodo(todo);
    onFind(todo.id);
  };

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
          <tr data-cy="todo">
            <td className="is-vcentered">
              {todo.id}
            </td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
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
                onClick={() => {
                  selectTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={selectedTodo?.id !== todo.id
                    ? 'far fa-eye'
                    : 'far fa-eye-slash'}
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
