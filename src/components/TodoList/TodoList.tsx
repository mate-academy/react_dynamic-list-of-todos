import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todosLists: Todo[];
  todo: Todo | null;
  setTodo: (value: Todo | null) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todosLists, todo, setTodo }) => (
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
        {todosLists.map(todoList => (
          <tr
            data-cy="todo"
            className={
              todo && todo.id === todoList.id ? 'has-background-info-light' : ''
            }
            key={todoList.id}
          >
            <td className="is-vcentered">{todoList.id}</td>
            <td className="is-vcentered">
              {todoList.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': todoList.completed,
                  'has-text-danger': !todoList.completed,
                })}
              >
                {todoList.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setTodo(todoList)}
              >
                {todo && todo.id === todoList.id ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
);

TodoList.displayName = 'TodoList';
