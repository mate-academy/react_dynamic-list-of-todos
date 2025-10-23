import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedId?: number;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  onTodoSelect,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>Done</th>
        <th>Title</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        const isSelected = todo.id === selectedId;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({ 'has-background-info-light': isSelected })}
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
                type="button"
                data-cy="selectButton"
                className="button"
                onClick={() => onTodoSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
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
