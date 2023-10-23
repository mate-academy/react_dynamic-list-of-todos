import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[],
  isCheck: boolean,
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  checkId: number;
  setCheckId: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  isCheck,
  setIsCheck,
  setUserId,
  checkId,
  setCheckId,
}) => {
  const handleCheck = (id: number, userId: number) => {
    setIsCheck(!isCheck);
    setCheckId(id);
    setUserId(userId);
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
        {filteredTodos.map((todo) => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': todo.id === checkId },
            )}
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
              <p className={classNames(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleCheck(todo.id, todo.userId)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far fa-eye',
                    { 'far fa-eye-slash': isCheck && checkId === todo.id },
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
