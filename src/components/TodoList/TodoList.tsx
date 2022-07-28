import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined,
  selectTodo: (selectedTodoId: number) => void
  selectedTodoId: number,
  setUserId: React.Dispatch<React.SetStateAction<number>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
  setUserId,
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
        {todos && todos.map(todo => (
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed === true && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === todo.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    selectTodo(0);
                    setUserId(0);
                  }}
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
                    selectTodo(todo.id);
                    setUserId(todo.userId);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
