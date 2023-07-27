import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[],
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  showModal: boolean,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setShowModal,
  setLoading,
  setUser,
  setCurrentTodo,
  showModal,
}) => {
  const handleClick = (clickedTodo: Todo) => {
    setCurrentTodo(clickedTodo);
    setShowModal(true);
    setLoading(true);
    getUser(clickedTodo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
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
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': showModal,
              '': !showModal,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {!!todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
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
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': !showModal,
                      'fa-eye-slash': showModal,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
