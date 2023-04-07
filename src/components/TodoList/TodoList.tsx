import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  fnSelectTodo: (todoId: number) => void;
  selectTodoId: number;
  fnSelectUser: (selectUserId: number) => void;
  status: string;
};

enum StatusOfFilter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

function filterTodos(status: string, todos: Todo[]): Todo[] {
  switch (status) {
    case StatusOfFilter.all:
      return todos.filter(todo => todo);

    case StatusOfFilter.active:
      return todos.filter(todo => !todo.completed);

    case StatusOfFilter.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const TodoList: React.FC<Props> = (
  {
    todos,
    fnSelectTodo,
    selectTodoId,
    fnSelectUser,
    status,
  },
) => {
  const list: Todo[] = useMemo(() => {
    return filterTodos(status, todos);
  }, [todos, status]);

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
        {list.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': todo.id === selectTodoId },
            )}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              { todo.completed && (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expand">
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectTodoId === todo.id ? (
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
                    fnSelectTodo(todo.id);
                    fnSelectUser(todo.userId);
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
