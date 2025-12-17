import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, onShow, selectedTodo }) => {
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
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-success-light': todo.completed,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    data-cy="iconCompleted"
                    className="icon has-text-success"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td
                className={classNames('is-vcentered is-expanded', {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </td>

              <td className="has-text-right is-vcentered">
                {isSelected ? (
                  <button
                    data-cy="hideButton"
                    className="button"
                    type="button"
                    onClick={() => onShow(todo)}
                  >
                    <span className="icon">
                      <i className="fas fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onShow(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
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
