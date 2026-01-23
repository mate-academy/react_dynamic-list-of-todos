import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId?: number;
};

export const TodoList: React.FC<Props> = ({ todos, onSelect, selectedTodoId }) => (
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames({ 'has-background-info-light': todo.completed })}
        >
          <td>{todo.id}</td>

          <td>
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td className="is-expanded">
            <p className={classNames({ 'has-text-success': todo.completed, 'has-text-danger': !todo.completed })}>
              {todo.title}
            </p>
          </td>

          <td className="has-text-right">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelect(todo)}
            >
              <span className="icon">
                <i className={classNames({
                  'far fa-eye-slash': todo.id === selectedTodoId,
                  'far fa-eye': todo.id !== selectedTodoId,
                })} />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
