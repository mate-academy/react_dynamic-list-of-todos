import React from 'react';
import clssnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectTodo: Todo | null,
  setSelectedTodo:(obj: Todo | null) => void,

};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  setSelectedTodo,

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
        {todos.map(todo => (
          <tr
            data-cy="todo"
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
              <p
                className={clssnames(
                  {
                    'has-text-danger': todo.completed === false,
                    'has-text-success': todo.completed === true,
                  },
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
                onClick={() => {
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={clssnames(
                      {
                        'far fa-eye': selectTodo?.id !== todo.id,
                        'far fa-eye-slash': selectTodo?.id === todo.id,
                      },
                    )}

                  />
                </span>
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};
