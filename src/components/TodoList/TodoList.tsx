import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (todoId: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === id,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {
                todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className={"fas fa-check"} />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    selectTodo(0);
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
                    selectTodo(id);
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
