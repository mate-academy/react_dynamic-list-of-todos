import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={cn({
            'has-background-info-light':
              selectedTodo && selectedTodo.id === todo.id,
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
            <p
              className={cn({
                'has-text-succes': todo.completed,
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
              onClick={() => onSelectTodo(todo)}
            >
              <span className="icon">
                <i
                  className={cn('far', {
                    'fa-eye':
                      !selectedTodo ||
                      (selectedTodo && selectedTodo.id !== todo.id),
                    'fa-eye-slash': selectedTodo && selectedTodo.id === todo.id,
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
