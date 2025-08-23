import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  handleOpenModal: (todo: Todo) => void;
  todoModalStatus: boolean;
  selectedTodo: Todo | null;
};
export const TodoList: React.FC<Props> = ({
  filteredTodos,
  handleOpenModal,
  todoModalStatus,
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
        {filteredTodos.map((todo: Todo) => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
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
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {todoModalStatus && selectedTodo?.id === todo.id ? (
                  <span className="icon">
                    <i className="fas fa-eye-slash" />
                  </span>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleOpenModal(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
