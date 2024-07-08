import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedUser: Todo | null;
  openTodoModal: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUser,
  openTodoModal,
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

    {todos.map(todo => {
      const { id, title, completed } = todo;
      const isSelected = selectedUser && selectedUser.id === id;

      return (
        <tr
          data-cy="todo"
          className={cn({ 'has-background-info-light': isSelected })}
          key={id}
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
            <p
              className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
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
              onClick={() => openTodoModal(todo)}
            >
              <span className="icon">
                <i
                  className={cn('far', {
                    'fa-eye-slash': isSelected,
                    'fa-eye': !isSelected,
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      );
    })}
  </table>
);
