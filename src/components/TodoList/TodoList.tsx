import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface ListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
}

export const TodoList: React.FC<ListProps> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  const todoMapped = todos.map(todo => {
    const { id, title, completed } = todo;

    return (
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': selectedTodo?.id === id,
        })}
        key={id}
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
          <p
            className={classNames({
              'has-text-success': completed,
              'has-text-danger': !completed,
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
            onClick={() => setSelectedTodo(todo)}
          >
            <span className="icon">
              <i className={classNames(
                'far', {
                  'fa-eye-slash': id === selectedTodo?.id,
                  'fa-eye': id !== selectedTodo?.id,
                },
              )}
              />
            </span>
          </button>
        </td>
      </tr>
    );
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
        {todoMapped}
      </tbody>
    </table>
  );
};
