import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  checkedTodo: Todo | null;
  onCheckedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  checkedTodo,
  onCheckedTodo,
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
        {todos.map(todo => {
          const { id, title, completed } = todo;
          const isTodoActive = checkedTodo?.id === id;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn({ 'has-background-info-light': isTodoActive })}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onCheckedTodo({ ...todo })}
                >
                  <span className="icon">
                    <i className={`far fa-${isTodoActive ? 'eye-slash' : 'eye'}`} />
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
