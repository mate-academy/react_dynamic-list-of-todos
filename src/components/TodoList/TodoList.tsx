import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelect?: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect = () => {},
  selectedTodo,
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
        {todos.map((todo) => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cn({ "has-background-info-light": selectedTodo === todo })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className={cn("fas", { "fa-check": todo.completed })} />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  "has-text-success": todo.completed,
                  "has-text-danger": !todo.completed,
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
                    className={cn("far", {
                      "fa-eye-slash": selectedTodo === todo,
                      "fa-eye": selectedTodo !== todo,
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
};
