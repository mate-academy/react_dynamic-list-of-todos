import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo | null) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  selectedTodoId,
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
          className={cn({ 'has-background-info-light': todo.completed })}
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
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              className="button"
              type="button"
              data-cy="selectButton"
              onClick={() =>
                onSelectTodo(selectedTodoId === todo.id ? null : todo)
              }
            >
              <span className="icon">
                <i
                  className={cn('far', {
                    'fa-eye-slash': selectedTodoId === todo.id,
                    'fa-eye': selectedTodoId !== todo.id,
                  })}
                />
              </span>
              <span>{selectedTodoId === todo.id ? 'Hide' : 'Show'}</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
