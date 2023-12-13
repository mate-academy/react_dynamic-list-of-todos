import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type TodoListType = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<TodoListType> = ({
  todos,
  setTodo,
  selectedTodo,
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
      {todos.map((todo) => {
        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
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
              <p className={cn({
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
                onClick={() => setTodo(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye': todo.id !== selectedTodo?.id,
                    'fa-eye-slash': todo.id === selectedTodo?.id,
                  })}
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
