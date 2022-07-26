import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id:number, todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>

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
      {todos.map(todo => (
        <tr
          data-cy="todo"
          className={todo.completed
            ? ('has-background-succses-light has-text-succses')
            : ('has-background-danger-light has-text-danger')}
          key={todo.id}
        >
          <td className="is-vcentered">
            <span className="is-size-5">
              <i className={todo.completed
                ? ('fas fa-check')
                : ('fas fa-xmark')}
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
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
