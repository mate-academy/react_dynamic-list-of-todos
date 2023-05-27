import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSelectUserId: (id: number) => void,
  selectedUserId: number | null,
  onSelectTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onSelectUserId,
  onSelectTodo,
}) => {
  function handleSelect(todo: Todo) {
    onSelectUserId(todo.userId);
    onSelectTodo(todo);
  }

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
        {todos.map((todo) => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {!todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={
                cn(
                  'has-text-success',
                  { 'has-text-danger': todo.completed },
                )
              }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelect(todo)}
              >
                <span className="icon">
                  <i className={
                    cn(
                      'far',
                      { 'fa-eye-slash': todo.userId === selectedUserId },
                      { 'fa-eye': todo.userId !== selectedUserId },
                    )
                  }
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
