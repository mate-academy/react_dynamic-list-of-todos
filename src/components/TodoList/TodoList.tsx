import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number>>,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;
        const isActive = selectedTodoId === id;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isActive,
            })}
            key={id}
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
              <p className={classNames(
                { 'has-text-success': completed },
                { 'has-text-danger': !completed },
              )}
              >
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodoId(id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': !isActive },
                    { 'fa-eye-slash': isActive },
                  )}
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
