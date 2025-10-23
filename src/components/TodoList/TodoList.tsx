import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
type Props = {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowTodo,
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
      {todos.map(todo => {
        const completedIcon = todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : null;

        const eyeIconClass = cn('far', {
          'fa-eye-slash': selectedTodo?.id === todo.id,
          'fa-eye': selectedTodo?.id !== todo.id,
        });

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">{completedIcon}</td>
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
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShowTodo(todo)}
              >
                <span className="icon">
                  <i className={eyeIconClass} />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
