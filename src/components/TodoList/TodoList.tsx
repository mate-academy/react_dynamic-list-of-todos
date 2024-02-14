import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todosFromServer: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (t:Todo) => void;
};
export const TodoList: React.FC<Props> = ({
  todosFromServer, selectedTodo, setSelectedTodo,
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
      {todosFromServer.map((todo:Todo) => (
        <tr
          data-cy="todo"
          key={todo.id}
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
              className={todo.completed
                ? 'has-text-success' : 'has-text-danger'}
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
                <i className={cn('far',
                  (selectedTodo && (todo.id === selectedTodo?.id))
                    ? 'fa-eye-slash' : 'fa-eye')}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
