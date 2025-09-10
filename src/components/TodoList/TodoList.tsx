import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  selectedTodoId: number | null;
  todos: Todo[];
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  selectedTodoId,
  todos,
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
        {todos.map(todo => {
          return (
            <tr
              data-cy="todo"
              className={classNames({
                'is-selected': todo.id === selectedTodoId,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span data-cy="iconCompleted" className="icon">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames('base-class', {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}

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
                      setSelectedTodo(todo);
                    }}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      setSelectedTodo(todo);
                    }}
                  >
                    Show
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
