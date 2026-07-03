import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodoId?: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  selectedTodoId,
}) => {
  return (
    <table className="todo-list table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="button is-link is-small"
                  data-cy="selectButton"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
                      })}
                    />
                  </span>
                  <span>{isSelected ? 'Hide' : 'Show'}</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
