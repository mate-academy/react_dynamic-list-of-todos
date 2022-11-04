import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos, selectedTodoId, selectTodo,
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
      {todos.map(({
        id, title, completed,
      }) => (
        <tr
          key={id}
          data-cy="todo"
          className={cn({ 'has-background-info-light': id === selectedTodoId })}
        >
          <td className="is-vcentered">{id}</td>
          <td className="is-vcentered">
            {completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={cn({
              'has-text-success': completed,
              'has-text-danger': !completed,
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
              onClick={() => selectTodo(id)}
            >
              <span className="icon">
                <i className={cn('far',
                  { 'fa-eye': id !== selectedTodoId },
                  { 'fa-eye-slash': id === selectedTodoId })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
