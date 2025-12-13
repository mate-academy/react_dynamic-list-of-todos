import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setTodosId: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  query: string;
  filter: string;
  todos: Todo[];
  todosId: number;
  isOpened: boolean;
}

export const TodoList: React.FC<Props> = ({
  setIsOpened,
  setTodosId,
  setUserId,
  query,
  filter,
  todos,
  todosId,
  isOpened: opened,
}) => {
  const filteredByStatus = todos.filter(todo => {
    if (filter === 'active') {
      return todo.completed === false;
    } else if (filter === 'completed') {
      return todo.completed === true;
    }

    return true;
  });

  const filteredByQuery = filteredByStatus.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

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
        {filteredByQuery.map(todo => {
          const isSelected = opened && todosId === todo.id;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isSelected,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  {' '}
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>{' '}
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setIsOpened(true);
                    setTodosId(todo.id);
                    setUserId(todo.userId);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
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
};
