import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
  selectedTodo?: Todo | null;
  onTodoSelected: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  items,
  selectedTodo,
  onTodoSelected,
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
        {items.map(({
          id, title, completed, userId,
        }) => {
          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': selectedTodo?.id === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              {/* <td className="is-vcentered" /> */}
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
                  onClick={() => onTodoSelected({
                    id, title, completed, userId,
                  })}
                >
                  <span className="icon">
                    {selectedTodo?.id === id ? (
                      <i className="fa fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
