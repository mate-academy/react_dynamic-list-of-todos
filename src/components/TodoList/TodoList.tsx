import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (todo: Todo) => void;
  selectedTodoId: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => (
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;
        const isSelected = id === selectedTodoId?.id;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelected,
            })}
            key={id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered is-expanded">
              {completed && (
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
                {title}
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
                  <i className={classNames('far', {
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
