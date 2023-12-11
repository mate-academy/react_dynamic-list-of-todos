import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  setTodo: (todo: Todo | null) => void;
  modalTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodo,
  modalTodo,
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
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
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
              key={todo.id}
              onClick={() => setTodo(todo)}
            >
              <span className="icon">
                <i className={cn('far', {
                  'fa-eye': !modalTodo,
                  'fa-eye-slash': modalTodo && modalTodo.id === todo.id,
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
