import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setShowModal: (showModal: boolean) => void;
  setOpenedTodo: (todo: Todo | null) => void;
  openedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setShowModal,
  setOpenedTodo,
  openedTodo,
}) => {
  const handleModal = (currentOpenedTodo: Todo | null, todo: Todo) => {
    if (todo.id === currentOpenedTodo?.id) {
      setOpenedTodo(null);
      setShowModal(false);
    } else {
      setOpenedTodo(todo);
      setShowModal(true);
    }
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
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo === openedTodo,
            })}
            key={todo.id}
          >
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
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleModal(openedTodo, todo)}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${todo === openedTodo ? '-slash' : ''}`}
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
