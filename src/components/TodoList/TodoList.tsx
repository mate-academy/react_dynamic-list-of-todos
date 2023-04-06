import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onsetSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onsetSelectedTodo,
  selectedTodo,
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
          completed,
        } = todo;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': id === selectedTodo?.id,
            })}
            key={id}
          >
            <td className="is-vcentered">
              {id}
            </td>

            {completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}

            <td className="is-vcentered is-expanded">
              <p className={classNames(
                { 'has-text-danger': !completed },
                { 'has-text-success': completed },
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
                onClick={() => onsetSelectedTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames('far',
                    { 'fa-eye-slash': id === selectedTodo?.id },
                    { 'fa-eye': id !== selectedTodo?.id })}
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
