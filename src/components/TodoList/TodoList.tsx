/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  todo: Todo | null,
  setTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ todos, todo, setTodo }) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>Title</th>
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
      {todos.map(someTodo => (
        <tr
          data-cy="todo"
          className={classNames(
            { 'has-background-info-light': someTodo.id === todo?.id },
          )}
          key={someTodo.id}
        >
          <td className="is-vcentered">{someTodo.id}</td>
          <td className="is-vcentered">
            {someTodo.completed && <i className="fas fa-check" />}
          </td>
          <td className="is-vcentered">
            <p className={classNames({
              'has-text-danger': !someTodo.completed,
              'has-text-success': someTodo.completed,
            })}
            >
              {someTodo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setTodo(someTodo)}
            >
              <span className="icon">
                {someTodo === todo
                  ? (
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
