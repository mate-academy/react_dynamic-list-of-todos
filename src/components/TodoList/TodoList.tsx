import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  selectTodo: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
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
          const { id, title, completed } = todo;
          const handleSelectTodo = () => (selectedTodoId === id
            ? selectTodo(null)
            : selectTodo(id));

          return (
            <tr
              data-cy="todo"
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={handleSelectTodo}
                >
                  <span className="icon">
                    <i className={classNames({
                      'far fa-eye-slash': (selectedTodoId === id),
                      'far fa-eye': (selectedTodoId !== id),
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
};
