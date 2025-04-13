import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  setModalIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsShown: boolean;
  gettingTodo: Todo | null;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setGettingTodos: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setModalIsShown,
  modalIsShown,
  gettingTodo,
  setUserId,
  setGettingTodos,
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
        {visibleTodos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-centered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={
                  !todo.completed ? 'has-text-danger' : 'has-text-success'
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
                onClick={() => {
                  setModalIsShown(true);
                  setUserId(todo.userId);
                  setGettingTodos(todo);
                }}
              >
                <span className="icon">
                  {modalIsShown && gettingTodo?.id === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
