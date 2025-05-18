import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  openTodoId: number | null;
  openModal: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, openModal, openTodoId }) => {
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
        {todos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon">
                    <i className="fas fa-check" data-cy="iconCompleted" />
                  </span>
                )}{' '}
              </td>
              <td className="is-vcentered is-expanded">
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
                  onClick={() => openModal(todo.id)}
                >
                  <span className="icon">
                    {openTodoId === todo.id ? (
                      <i className="fas fa-eye-slash" /> // Pokaż ikonę "eye-slash" jeśli modal jest otwarty dla tego zadania
                    ) : (
                      <i className="far fa-eye" /> // W przeciwnym razie pokaż ikonę "eye"
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
