import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect?: (tod: Todo) => void;
  selectedTodo: Todo | null
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect = () => {},
  selectedTodo,
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
        {todos.map((todo) => {
          const { id, completed, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo?.id === id,
              })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                <i
                  className={classNames('fas', {
                    'fa-check': completed === true,
                  })}
                />
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
                  onClick={() => onSelect(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    {selectedTodo?.id === id ? (
                      <i className="far fa-eye-slash" />
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
