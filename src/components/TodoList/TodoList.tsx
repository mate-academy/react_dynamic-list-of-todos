import classname from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  activeTodo: Todo | null,
  selectTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  activeTodo,
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
      {todos.map(todo => {
        const {
          id,
          title,
          // userId,
          completed,
        } = todo;

        const isActive = activeTodo?.id === id;

        return (
          <tr
            data-cy="todo"
            key={id}
            className={classname({
              'has-background-info-light': isActive,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classname({
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
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i className={classname('far',
                    {
                      'fa-eye': !isActive,
                      'fa-eye-slash': isActive,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
