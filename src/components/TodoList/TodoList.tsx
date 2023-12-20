import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setModal: (value: boolean) => void,
  id: number,
  setId: (value: number) => void,
  setLoader: (value: boolean) => void,
  setUserId: (value: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setModal,
  id,
  setId,
  setLoader,
  setUserId,
}) => {
  const handleClick = (todo: Todo) => {
    setModal(true);
    setId(todo.id);
    setLoader(true);
    setUserId(todo.userId);
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
            className={cn({
              'has-background-info-light': todo.id === id,
            })}
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
              <p className={!todo.completed
                ? 'has-text-danger'
                : 'has-text-success'}
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
                  <i className={id === todo.id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
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
