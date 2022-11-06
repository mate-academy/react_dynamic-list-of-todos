import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Pops = {
  getVisibleTodos: () => Todo[],
  onSelectTodo: (value: Todo | null) => void,
  selectTodo: Todo | null,
};

export const TodoList: React.FC<Pops> = ({
  getVisibleTodos,
  onSelectTodo,
  selectTodo,
}) => {
  const list = getVisibleTodos();

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
        {
          list.map(todo => (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectTodo?.id === todo.id,
              })}
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
                <p className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far', {
                        'fa-eye-slash': selectTodo?.id === todo.id,
                        'fa-eye': selectTodo?.id !== todo.id,
                      },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
