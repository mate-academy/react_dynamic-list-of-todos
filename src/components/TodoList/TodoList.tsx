import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo, onTodoSelect }) => (
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
        const { id, title, completed } = todo;
        const isSelected = selectedTodo && selectedTodo.id === id;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': isSelected,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': isSelected,
                      'fa-eye': !isSelected,
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
