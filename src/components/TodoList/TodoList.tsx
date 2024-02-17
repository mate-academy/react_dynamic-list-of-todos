import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  clickTodo?: Todo | null;
  onClickTodo?: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onClickTodo = () => { },
  clickTodo = null,
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
          const {
            id,
            title,
            completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': clickTodo?.id === id,
              })}
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
                <p className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
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
                  onClick={() => onClickTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far', {
                        'fa-eye': clickTodo?.id !== id,
                        'fa-eye-slash': clickTodo?.id === id,
                      },
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
};
