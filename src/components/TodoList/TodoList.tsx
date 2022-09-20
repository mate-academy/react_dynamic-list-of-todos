import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  callbackTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = ({ todos, callbackTodo }) => (
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
      {todos.map((todo) => (
        <tr data-cy="todo" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className={classNames(
                'fas',
                { 'fa-check': todo.completed },
              )}
              />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p className={classNames(
              { 'has-text-success': todo.completed },
              { 'has-text-danger': !todo.completed },
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
              onClick={() => callbackTodo(todo)}
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
