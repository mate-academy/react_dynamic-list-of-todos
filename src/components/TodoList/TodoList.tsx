import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: Todo | null;
  openTodo: (todo:Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  openTodo,
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
            // userId,
          } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className=""
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  completed ? 'has-text-success' : 'has-text-danger',
                )}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {selectTodo?.id === todo.id ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      openTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
