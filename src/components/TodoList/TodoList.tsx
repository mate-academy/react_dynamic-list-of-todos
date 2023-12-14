import React, { useContext } from 'react';
import cn from 'classnames';
// eslint-disable-next-line import/no-cycle
import { TodoContext } from '../../App';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  getCurrentTodoId: (arg: number) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    getCurrentTodoId,
  },
) => {
  const contextValue = useContext<number | null>(TodoContext);
  const handleOnClick = (value: number) => {
    getCurrentTodoId(value);
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
        {todos.map(({ id, completed, title }) => (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleOnClick(id)}
              >
                <span className="icon">
                  {contextValue === id ? (
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
