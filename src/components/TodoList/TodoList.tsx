import classNames from 'classnames';
import React from 'react';
import { Maybe } from '../../types/Maybe';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodoId: (id: Maybe<number>) => void;
  selectedTodoId: Maybe<number>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodoId,
  selectedTodoId,
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
          return (
            <tr
              data-cy="todo"
              className={classNames(
                { 'has-background-info-light': selectedTodoId === todo.id },
              )}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={
                  todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodoId(todo.id)}
                >
                  <span className="icon">
                    <i className={
                      selectedTodoId === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
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
};
