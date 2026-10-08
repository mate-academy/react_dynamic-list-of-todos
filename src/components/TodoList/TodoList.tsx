import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId?: number;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  onSelect,
  selectedTodoId,
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
        {visibleTodos?.map(todo => {
          const isSelected = selectedTodoId === todo.id;
          const isComplete = todo.completed;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn('', {
                'has-background-info-light': isSelected,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {isComplete && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-danger': !isComplete,
                    'has-text-success': isComplete,
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
                  onClick={() => onSelect(todo)}
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
};
