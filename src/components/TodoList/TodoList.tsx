import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  onSelectedTodoId: (todoIf: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectedTodoId,
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
      {todos.map(todo => (
        <tr
          data-cy="todo"
          className={
            `has-background${
              selectedTodoId === todo.id
                ? '-info-light'
                : ''
            }`
          }
          key={todo.id}
        >
          <td className="is-vcentered">
            {todo.id}
          </td>

          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
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
              onClick={() => onSelectedTodoId(todo.id)}
            >
              <span className="icon">
                <i
                  className={classNames(
                    'far',
                    { 'fa-eye': selectedTodoId !== todo.id },
                    { 'fa-eye-slash': selectedTodoId === todo.id },
                  )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
