import React, { memo } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId?: number | null;
}

const TodoListBase: React.FC<Props> = ({ todos, onSelect, selectedTodoId }) => (
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
          // Прибираємо фонову підсвітку, якщо вона заважає сприйняттю кольорів
          className={todo.completed ? 'has-background-light' : ''}
          data-cy="todo"
        >
          <td data-cy="todoId">{todo.id}</td>

          <td>
            {/* Тільки галочка для виконаних */}
            {todo.completed && (
              <span className="icon has-text-success" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          {/* Зелений текст для виконаних, червоний для невиконаних */}
          <td
            className={todo.completed ? 'has-text-success' : 'has-text-danger'}
          >
            {todo.title}
          </td>

          <td>
            <button
              type="button"
              className="button is-small is-info is-outlined"
              data-cy="selectButton"
              onClick={() => onSelect(todo)}
            >
              <span className="icon">
                <i
                  className={`far ${selectedTodoId === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const TodoList = memo(TodoListBase);
TodoList.displayName = 'TodoList';
