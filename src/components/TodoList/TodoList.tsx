import React from 'react';
import { Todo } from '../../types/Todo';
import classnames from 'classnames';

type Props = {
  todos: Todo[];
  onSelectedTodo: (id: number | null) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
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
          const isSelected = todo.id === selectedTodoId;

          return (
            <tr
              data-cy="todo"
              className={classnames({ 'is-selected': isSelected })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={classnames({
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
                  onClick={() => onSelectedTodo(isSelected ? null : todo.id)}
                >
                  <span className="icon">
                    <i
                      className={classnames({
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
        ;
      </tbody>
    </table>
  );
};
