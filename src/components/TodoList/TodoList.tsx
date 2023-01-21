import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: Todo | null;
  setSelectTodo: (selectTodo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  setSelectTodo,
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
      {todos
        && todos.map((todo) => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
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
                <p
                  className={classNames(
                    completed ? 'has-text-success' : 'has-text-danger',
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
                  onClick={() => setSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        id === selectTodo?.id
                          ? ' far fa-eye-slash'
                          : ' far fa-eye',
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
