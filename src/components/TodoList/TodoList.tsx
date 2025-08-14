import React from 'react';
import { Todo } from '../../types/Todo';
import { InfoForModal } from '../../App';

interface Props {
  todos: Todo[];
  setIsDetailsShown: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoForModal: React.Dispatch<React.SetStateAction<InfoForModal>>;
  infoForModal: InfoForModal;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setIsDetailsShown,
  setInfoForModal,
  infoForModal,
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
              onClick={() => {
                setIsDetailsShown(true);
                setInfoForModal({ todo, userId: todo.userId });
              }}
              data-cy="selectButton"
              className="button"
              type="button"
            >
              <span className="icon">
                <i
                  className={
                    infoForModal?.todo.id === todo.id
                      ? 'fas fa-eye-slash'
                      : 'fas fa-eye'
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
