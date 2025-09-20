import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo?: (todo: Todo | null) => void;
  selectedTodoId?: number;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const handleButtonClick = (todo: Todo) => {
    if (!onSelectTodo) {
      return;
    }

    if (selectedTodoId === todo.id) {
      onSelectTodo(null);
    } else {
      onSelectTodo(todo);
    }
  };

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
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon" data-cy="iconNotCompleted">
                  <i className="fas fa-times" />
                </span>
              )}
            </td>

            <td
              className={classNames('is-vcentered', {
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                type="button"
                onClick={() => handleButtonClick(todo)}
              >
                <span className="icon">
                  {selectedTodoId === todo.id ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="fas fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TodoList = React.memo(TodoListComponent);
