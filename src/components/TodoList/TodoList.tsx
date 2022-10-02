import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: (argument: number) => number | void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectedTodoId,
}) => {
  const handleSelect = (id: number) => {
    selectedTodo(id);
  };

  const handleReset = () => {
    selectedTodo(0);
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
        {todos.map(({ id, title, completed }) => (
          <tr
            data-cy="todo"
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td
              className="is-vcentered is=expanded"
            >
              <p
                className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td
              className="has-text-right is-vcentered"
            >
              <button
                type="button"
                className="button"
                data-cy="selectButton"
                onClick={selectedTodoId === id
                  ? handleReset
                  : () => handleSelect(id)}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye-slash': selectedTodoId === id,
                      'far fa-eye': selectedTodoId !== id,
                    })}
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
