import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
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
        const isActive = todo.id === selectedTodoId;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': isActive,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed
              ? (
                <td className="is-vcentered" />
              ) : (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )}
            <td className="is-vcentered is-expanded">
              <p className={cn(
                {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo.id)}
              >
                <span className="icon">
                  <i className={cn(
                    'far',
                    {
                      'fa-eye-slash': isActive,
                      'fa-eye': !isActive,
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
