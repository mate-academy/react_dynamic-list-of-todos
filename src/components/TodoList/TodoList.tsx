import React from 'react';
import cx from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodo, onSelectTodo }) => (
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
            key={todo.id}
            data-cy="todo"
            className={cx({
              'has-background-info-light': todo.completed,
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
                className={cx({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => onSelectTodo(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={cx('far', {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
);

TodoList.displayName = 'TodoList';
