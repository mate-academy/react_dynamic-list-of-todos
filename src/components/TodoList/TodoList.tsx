import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selected: Todo | null;
  onSelect: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selected,
  onSelect,
}: Props) => {
  const handleSelect = useCallback(
    (todo: Todo) => {
      if (selected === null) {
        onSelect(todo);

        return;
      }

      if (todo.id === selected.id) {
        onSelect(null);

        return;
      }
    },
    [onSelect, selected],
  );

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
          const isSelected = selected !== null && todo.id === selected.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames('', { 'has-background-info-light': false })}
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
                <p
                  className={classNames('', {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleSelect(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !isSelected,
                        'fa-eye-slash': isSelected,
                      })}
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
