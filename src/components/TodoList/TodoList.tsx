import React from 'react';
import cl from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  changeSelectedTodo: (todo: Todo) => void;
};

// eslint-disable-next-line react/display-name
export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodo, changeSelectedTodo }) => {
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
            const isSelected = todo.id === selectedTodo?.id;

            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cl({ 'has-background-info-light': isSelected })}
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
                    className={cl({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => changeSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cl({
                          'far fa-eye-slash': isSelected,
                          'far fa-eye': !isSelected,
                        })}
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
  },
);
