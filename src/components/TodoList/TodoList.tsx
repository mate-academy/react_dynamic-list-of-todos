import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
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
      {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          selectedTodo={selectedTodo}
          onTodoSelect={onTodoSelect}
        />
      ))}
    </tbody>
  </table>
);
