import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  onShowTodo: (todo: Todo) => void;
  onHideTodo: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onShowTodo,
  onHideTodo,
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
        <tr key={todo.id} data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedTodoId === todo.id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={onHideTodo}
              >
                <span className="icon">
                  <i className={'far fa-eye-slash'} />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onShowTodo(todo)}
              >
                <span className="icon">
                  <i className={'far fa-eye'} />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
