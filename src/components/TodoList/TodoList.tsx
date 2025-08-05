import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: Dispatch<SetStateAction<Todo | null>>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onTodoSelect,
}) => (
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
        <tr key={todo.id} data-cy="todo">
          <td className="is-centered">{todo.id}</td>

          <td className="is-centered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td className="is-centered is-expanded">
            <span
              className={`completed ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
            >
              {todo.title}
            </span>
          </td>

          <td className="has-text-right is-centered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onTodoSelect(todo)}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye': selectedTodo?.id !== todo.id,
                    'fa-eye-slash': selectedTodo?.id === todo.id,
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
