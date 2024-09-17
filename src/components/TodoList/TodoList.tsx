import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
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
        {todos.map(el => (
          <tr data-cy="todo" className="" key={el.id}>
            <td className="is-vcentered">{el.id}</td>
            <td className="is-vcentered">
              {el.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <td className="is-vcentered" />
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn(
                  { 'has-text-danger': !el.completed },
                  { 'has-text-success': el.completed },
                )}
              >
                {el.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelectTodo(el);
                }}
              >
                <span className="icon" data-cy="iconCompleted">
                  <i
                    className={cn(
                      'far',
                      el.id === selectedTodoId ? 'fa-eye-slash' : 'fa-eye',
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
