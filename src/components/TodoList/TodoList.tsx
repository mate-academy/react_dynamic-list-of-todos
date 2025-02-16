import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setSelectedId: (selectedId: number) => void;
  selectedId: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedId,
  selectedId,
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
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check"></i>
              </span>
            )}
          </td>

          <td className={`is-vcentered`}>
            <p
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedId(todo.id)}
            >
              {selectedId !== todo.id ? ( // условный рендеринг иконки
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              ) : (
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
