import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = ({ todos, onSelectedTodo }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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
        {todos.map((todo) => (
          <tr
            data-cy="todo"
            className="has-background-info-light"
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed === true ? (
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
                className={
                  todo.completed === true
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
                onClick={() => {
                  onSelectedTodo(todo);
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': todo !== selectedTodo,
                      'fa-eye-slash': todo === selectedTodo,
                    })}
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
