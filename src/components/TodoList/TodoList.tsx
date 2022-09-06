import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoId: number | null,
  onSelectedTodoId: (selectedTodoId: number | null) => void,
}

export const TodoList: React.FC<Props> = ({
  todos, selectedTodoId, onSelectedTodoId,
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
          key={todo.id}
          data-cy="todo"
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <i className="fas fa-check" data-cy="iconCompleted" />
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
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
                <i className={classNames(
                  'far fa-eye',
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
