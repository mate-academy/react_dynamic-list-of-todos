import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  filter: {
    sortSelect: string,
    sortInput: string,
  }
  currentTodo: Todo | null
  onChangeTodo: (todo: Todo) => void
};

enum SortList {
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  currentTodo,
  onChangeTodo: selectTodo,
}) => {
  const { sortSelect, sortInput } = filter;

  const visibleTodos = todos.filter(todo => {
    const { completed, title } = todo;

    if (!title.toLowerCase().includes(sortInput.toLowerCase())) {
      return false;
    }

    switch (sortSelect) {
      case SortList.Active:
        return !completed;
      case SortList.Completed:
        return completed;
      default:
        return true;
    }
  });

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
        {visibleTodos.map(todo => {
          const {
            id,
            completed,
            title,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                { 'has-background-info-light': id === currentTodo?.id },
              )}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
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
                  onClick={() => {
                    selectTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      {
                        'fa-eye': id !== currentTodo?.id,
                        'fa-eye-slash': id === currentTodo?.id,
                      },
                    )}
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
};
