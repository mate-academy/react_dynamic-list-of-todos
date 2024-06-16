import React from 'react';
import { Todo, TodoListProps } from '../../types/Types';
import { TodoItem } from '../TodoItem.tsx/TodoItem';

export const TodoList: React.FC<TodoListProps> = React.memo(function TodoList({
  todos,
}) {
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
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todoItem={todo} />
        ))}
      </tbody>
    </table>
  );
});
