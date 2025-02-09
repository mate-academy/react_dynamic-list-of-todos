import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  selectedId: Todo['id'] | undefined;
  onIconClick: (data: Pick<Todo, 'id' | 'userId'>) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  selectedId,
  onIconClick,
}) => (
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
      {todoList.map(({ id, completed, title, userId }) => (
        <tr data-cy="todo" className="" key={id}>
          <td className="is-vcentered">{id}</td>
          <td className="is-vcentered">
            {completed ? (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            ) : null}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={completed ? 'has-text-success' : 'has-text-danger'}>
              {title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onIconClick({ id, userId })}
            >
              <span className="icon">
                {selectedId === id ? (
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
