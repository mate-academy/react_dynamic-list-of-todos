import React from 'react';
import { Todo } from '../../types/Todo';


type Props = {
  todos: Todo[];
  setOnShowModal: (todo: Todo | null) => void;
  onClose: (bool: boolean) => void;
  selectedTodoId?: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setOnShowModal: onShowModal,
  onClose: onClose,
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
        {
          todos.map((todo) => {
            const isSelected = todo.id === selectedTodoId;

            return (<tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon has-text-success">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onShowModal(null);
                      onClose(false);
                    } else {
                      onShowModal(todo);
                      onClose(true);
                    }
                  }}
                >
                  <span className="icon">
                    <i className={isSelected ? 'fas fa-eye-slash' : 'far fa-eye'} />
                  </span>
                </button>
              </td>
            </tr>);
          })
        }
      </tbody>
    </table>
  );
}
