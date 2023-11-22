import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
  setSelectedUser: (value: User | null) => void;
  setModalLoading: (value: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
  setSelectedUser,
  setModalLoading,
}) => {
  const handleOpenModal = (newTodo: Todo) => () => {
    setModalLoading(true);
    setSelectedTodo(newTodo);
    setTimeout(() => {
      getUser(newTodo.userId).then(setSelectedUser)
        .finally(() => {
          setModalLoading(false);
        });
    }, 300);
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th aria-label="Icon">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="Empty" />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
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
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>

            <td
              aria-label="ModalBtnWrapper"
              className="has-text-right is-vcentered"
            >
              <button
                onClick={handleOpenModal(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
                aria-label="ModalBtn"
              >
                <span className="icon">
                  <i className={classNames(
                    'far', {
                      'fa-eye': selectedTodo?.id !== todo.id,
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                    },
                  )}
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
