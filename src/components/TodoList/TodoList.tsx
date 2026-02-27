import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoListProps = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onShow,
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
      {todos.map((todo, index) => {
        const rowClass = cn({
          'has-background-info-light': todo === selectedTodo,
        });
        const titleClass = cn({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
        });

        return (
          <tr data-cy="todo" key={todo.id} className={rowClass}>
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={titleClass}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShow(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': todo === selectedTodo,
                      'fa-eye': todo !== selectedTodo,
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
