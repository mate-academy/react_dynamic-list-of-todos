import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelect: (todoId: number) => void
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, selectedTodoId, onSelect } = props;
  const [isButtonActive, setIsButtonActive] = useState(false);

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
            className={classNames(
              todo.id === selectedTodoId
              && 'has-background-info-light',
            )}
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
              <p className={classNames(todo.completed
                ? 'has-text-success'
                : 'has-text-danger')}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelect(todo.id);
                  setIsButtonActive(prev => !prev);
                }}
              >
                <span className="icon">
                  <i className={classNames(isButtonActive
                    && selectedTodoId === todo.id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye')}
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
