import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  targetRowId: number;
  settargetRowId: (num: number) => void
  setTargetUserId: (num : number) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  targetRowId,
  settargetRowId,
  setTargetUserId,
}) => {
  const [selectedRow, setSelectedRow] = useState(false);

  const hendleClick = (item: Todo) => {
    settargetRowId(item.id);
    setSelectedRow(!selectedRow);
    setTargetUserId(item.userId);
  };

  const booleanValue = (item: Todo) => {
    return item.id === targetRowId && selectedRow;
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
        {todos.map((todo) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': booleanValue(todo),
            })}
          >
            <td className="is-vcentered">
              {todo.id}
            </td>
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
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => hendleClick(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      booleanValue(todo)
                        ? 'far fa-eye-slash' : 'far fa-eye'
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
