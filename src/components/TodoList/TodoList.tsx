import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelect,
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
      {todos.length
        ? (
          todos.map(({
            id,
            title,
            completed,
            userId,
          }) => (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': id === selectedTodo?.id,
              })}
              key={id}
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
                <p
                  className={classNames({
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
                  onClick={() => onSelect({
                    id,
                    title,
                    completed,
                    userId,
                  })}
                >
                  <span className="icon">
                    <span
                      className={classNames('far', {
                        'fa-eye-slash': id === selectedTodo?.id,
                        'fa-eye': id !== selectedTodo?.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="has-text-danger">
              No matches found
            </td>
          </tr>
        )}
    </tbody>
  </table>
);
