import React, { useContext } from 'react';

import { Todo } from '../../types/Todo';
import { ModalIdContext, ShowModalContext } from '../context/stateContext';

interface PropsTodo {
  todos: Todo[];
  setCurrentUserId(userId: number): void;
}

export const TodoList: React.FC<PropsTodo> = ({ todos, setCurrentUserId }) => {
  const { setisModalShowed } = useContext(ShowModalContext);
  const { currentId, setCurrentId } = useContext(ModalIdContext);

  const handleEyeButtonClick = (id: number, userId: number) => {
    setisModalShowed(true);
    setCurrentId(id);
    setCurrentUserId(userId);
  };

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
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
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
                onClick={() => handleEyeButtonClick(todo.id, todo.userId)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={
                      currentId === todo.id ? 'far fa-eye-slash' : 'far fa-eye'
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
};
