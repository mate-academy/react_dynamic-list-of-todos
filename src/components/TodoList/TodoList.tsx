import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, setSelectedTodo, selectedTodoId }) => (
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
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed && (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            )}
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
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn({
                      'far fa-eye': todo.id !== selectedTodoId,
                      'far fa-eye-slash': todo.id === selectedTodoId,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
);
