import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number | null,
  setSelectedTodoId: (id: number | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
}) => {
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
        {todos.map(todo => {
          const isSelected = todo.id === selectedTodoId;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelected,
              })}
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
                  onClick={() => setSelectedTodoId(
                    isSelected ? null : todo.id,
                  )}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': !isSelected,
                      'fa-eye-slash': isSelected,
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
};
