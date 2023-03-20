import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  showTodo: (todoId: number, userId: number) => void;
};

export const TodoList: React.FC<Props> = (
  { todos, selectedTodoId, showTodo },
) => {

  const selectTodoHandler = (todoId: number, userId: number) => () => {
    showTodo(todoId, userId);
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {
              todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : <td className="is-vcentered" />
            }
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={selectTodoHandler(todo.id, todo.userId)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': todo.id !== selectedTodoId,
                    'fa-eye-slash': todo.id === selectedTodoId,
                  })}
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
