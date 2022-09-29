import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onSelectTodoId: (id: number) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodoId,
}) => {
  const handleClick = (id: number) => {
    onSelectTodoId(id);
  };

  return (
    <tbody>
      {todos.map(todo => {
        const { id, title, completed } = todo;
        const selected = selectedTodoId === id;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': selected },
            )}
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
                className={classNames(
                  { 'has-text-success': completed },
                  { 'has-text-danger': !completed },
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
                onClick={() => handleClick(id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': !selected },
                    { 'fa-eye-slash': selected },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
