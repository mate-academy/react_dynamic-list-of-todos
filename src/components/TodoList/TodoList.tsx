import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  filteredTodos: Todo[];
  showTodoId: number;
  setShowTodoId: (id: number) => void;
  setIsModalActive: (a: boolean) => void;
  isModalActive: boolean;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  showTodoId,
  setShowTodoId,
  setIsModalActive,
  isModalActive,
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
        {filteredTodos.map(todo => {
          return (
            <tr
              data-cy="todo"
              className={classNames(
                showTodoId === todo.id && isModalActive
                  ? 'has-background-info-light'
                  : '',
              )}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    todo.completed ? 'has-text-success' : 'has-text-danger',
                  )}
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
                    setShowTodoId(todo.id);
                    setIsModalActive(true);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        showTodoId === todo.id && isModalActive
                          ? 'far fa-eye-slash'
                          : 'far fa-eye',
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
