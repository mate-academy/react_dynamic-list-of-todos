import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number,
  onSelectTodo: (id: number) => void,
  onSelectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  onSelectTodo,
  onSelectUser,
}) => {
  const handleSelect = (id: number, userId: number) => {
    onSelectTodo(id);
    onSelectUser(userId);
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
        {todos.map(({
          id,
          title,
          completed,
          userId,
        }) => (
          <tr
            key={id}
            data-cy="todo"
            className="has-background-info-white"
          >
            <td className="is-vcentered">
              {id}
            </td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={
                classNames(completed
                  ? 'has-text-success'
                  : 'has-text-danger')
              }
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelect(id, userId)}
              >
                <span className="icon">
                  <i
                    className={classNames('far',
                      id !== todoId ? 'fa-eye' : 'fa-eye-slash')}
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
