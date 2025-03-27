import React, { memo } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
  selectedTodoId?: number | null;
}

interface TodoItemProps {
  todo: Todo;
  onShowTodo: (todo: Todo) => void;
  isSelected: boolean;
}

const TodoItem: React.FC<TodoItemProps> = memo(
  ({ todo, onShowTodo, isSelected }) => (
    <tr
      data-cy="todo"
      className={todo.completed ? 'has-background-info-light' : ''}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onShowTodo(todo)}
        >
          <span className="icon">
            <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  ),
);

TodoItem.displayName = 'TodoItem';

const TodoListComponent: React.FC<Props> = memo(
  ({ todos, onShowTodo, selectedTodoId }) => (
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
          <TodoItem
            key={todo.id}
            todo={todo}
            onShowTodo={onShowTodo}
            isSelected={todo.id === selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  ),
);

TodoListComponent.displayName = 'TodoList';

export const TodoList = TodoListComponent;
