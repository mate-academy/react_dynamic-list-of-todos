import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodoId,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'is-selected': isSelected,
              })}
            >
              <td className="is-narrow">{todo.id}</td>

              <td className="is-expanded">{todo.title}</td>

              <td className="is-narrow">
                {todo.completed && (
                  <span
                    data-cy="iconCompleted"
                    className={classNames('icon')}
                  >
                    <i
                      className={classNames(
                        'fas',
                        'fa-check-circle',
                        'has-text-success',
                      )}
                    />
                  </span>
                )}
              </td>

              <td className="has-text-right is-vcentered">
                {!isSelected ? (
                  <button
                    type="button"
                    data-cy="selectButton"
                    className={classNames('button')}
                    onClick={() => onSelect(todo)}
                  >
                    <i className={classNames('fas', 'fa-eye')} />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="selectedButton"
                    className={classNames('button', 'is-primary')}
                  >
                    <i className={classNames('fas', 'fa-eye-slash')} />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
