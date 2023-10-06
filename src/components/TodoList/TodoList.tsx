import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  activeTodo: number
  onSelectTodo: (todoId: number) => void
};

export const TodoList: React.FC<Props> = ({
  todos, activeTodo, onSelectTodo,
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
      {todos.map(todo => {
        const isActive = todo.id === activeTodo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              ' has-background-info-light': isActive,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className={cn(
                  '',
                  {
                    'fas fa-check': todo.completed,
                  },
                )}

                />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p className={cn({
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
                onClick={() => {
                  onSelectTodo(todo.id);
                }}
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
