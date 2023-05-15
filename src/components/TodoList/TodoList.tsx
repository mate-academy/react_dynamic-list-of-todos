import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: Todo[];
  currentTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = (
  {
    todos,
    currentTodo,
    onSelect,
  },
) => (
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
        <TodoItem
          key={todo.id}
          todo={todo}
          currentTodo={currentTodo}
          onSelect={onSelect}
        />
      ))}
    </tbody>
  </table>
);
