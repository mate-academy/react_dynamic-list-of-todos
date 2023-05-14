import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
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
        const {
          id,
          title,
          completed,
        } = todo;

        const isSelectedTodo = id === selectedTodoId;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelectedTodo,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-success': completed,
                'has-text-danger': !completed,
              })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelectTodo(todo);
                }}
              >
                <span className="icon">
                  {isSelectedTodo
                    ? <i className="far fa-eye-slash" />
                    : <i className="far fa-eye" />}
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
