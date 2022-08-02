import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id:number, todoId: number) => void,
  selectedTodo: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>

          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={todo.completed
              ? ('has-background-success-light has-text-success')
              : ('has-background-danger-light has-text-danger')}
            key={todo.id}
          >
            <td className="is-vcentered">
              <span className="is-size-5">
                <i className={classNames(todo.completed
                  ? ('fas fa-check')
                  : ('fas fa-xmark'))}
                />
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectUser(todo.userId, todo.id)}
              >
                <span className="icon">
                  {selectedTodo === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
