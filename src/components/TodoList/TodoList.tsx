import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodoId: number | undefined;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect,
}) => {
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
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': todo.id === selectedTodoId,
            })}
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
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => onSelect(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': todo.id === selectedTodoId,
                      'fa-eye': todo.id !== selectedTodoId,
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
