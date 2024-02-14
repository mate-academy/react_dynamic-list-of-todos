import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosFromServer: Todo[];
  modal: boolean;
  selectedTodo: Todo | null;
  handleModal: (v:boolean, t:Todo) => void;
};
export const TodoList: React.FC<Props> = ({
  todosFromServer, handleModal, modal, selectedTodo,
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
              onClick={() => handleModal(true, todo)}
            >
              <span className="icon">
                <i className={
                  (modal && (todo.id === selectedTodo?.id))
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'
                }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
