import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  searchTodos: Todo[];
  activeTodo: Todo | null;
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  searchTodos,
  activeTodo,
  selectTodo,
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
        {searchTodos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.id === activeTodo?.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                {todo.completed && (
                  <i className="fas fa-check" />
                )}
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
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
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': todo.id !== activeTodo?.id,
                      'fa-eye-slash': todo.id === activeTodo?.id,
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
