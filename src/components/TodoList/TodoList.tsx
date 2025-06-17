import React from 'react';
import type { Todo } from '../../types/Todo';

type listProps = {
  todos: Todo[];
  setModal: (id: string) => void
  setModalTodo: (id: Todo) => void
  modalTodo: Todo | null
};

export const TodoList: React.FC<listProps> = ({ todos, setModal, setModalTodo, modalTodo }: listProps) => (
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
          {todo.completed === true ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p className={`has-text-${todo.completed === true ? 'success' : 'danger'}`}>{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button" onClick={() => {
              setModal(todo.userId.toString());
              setModalTodo(todo)
            }}>
              <span className="icon">
                {todo === modalTodo ? (<i className="far fa-eye-slash" />) : (<i className="far fa-eye" />)}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
