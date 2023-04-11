import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  fnSelectTodo: (todoId: number) => void;
  selectTodoId: number;
  fnSelectUser: (selectUserId: number) => void;
  status: StatusOfFilter;
};

export enum StatusOfFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodos(status: StatusOfFilter, todos: Todo[]): Todo[] {
  switch (status) {
    case StatusOfFilter.All:
      return todos;

    case StatusOfFilter.Active:
      return todos.filter(todo => !todo.completed);

    case StatusOfFilter.Completed:
      return todos.filter(todo => todo.completed);

    default:
      throw new Error('Unexpected values');
  }
}

export const TodoList: React.FC<Props> = ({
  todos,
  fnSelectTodo,
  selectTodoId,
  fnSelectUser,
  status,
}) => {
  const list: Todo[] = useMemo(() => {
    return filterTodos(status, todos);
  }, [todos, status]);

  const showTodoModal = (id: number, userId: number) => {
    fnSelectTodo(id);
    fnSelectUser(userId);
  };

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
        {list.map(({
          id,
          completed,
          title,
          userId,
        }) => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': id === selectTodoId },
            )}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              { completed && (
                <span className="icon">
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
              {selectTodoId === id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => fnSelectTodo(0)}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    showTodoModal(id, userId);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
