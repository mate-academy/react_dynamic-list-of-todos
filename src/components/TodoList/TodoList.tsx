import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelection: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onTodoSelection,
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
        <TodoItem
          todo={todo}
          selectedTodo={selectedTodo}
          onTodoSelection={onTodoSelection}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
