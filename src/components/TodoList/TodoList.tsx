import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSelectTodo: (id: number) => void
  selectedId?: number
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    onSelectTodo,
    selectedId,
  } = props;

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
        {todos.map(({ id, title, completed }) => (
          <tr
            key={id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': id === selectedId },
            )}
          >
            <td className="is-vcentered">{id}</td>
            {completed ? (
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
                className={classNames(
                  { 'has-text-danger': !completed },
                  { 'has-text-success': completed },
                )}
              >
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectTodo(id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': id !== selectedId },
                    { 'fa-eye-slash': id === selectedId },
                  )}
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
