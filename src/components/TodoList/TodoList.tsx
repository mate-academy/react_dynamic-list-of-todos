import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItems } from '../TodoItems/TodoItems';

interface Props {
  visibleTodos: Todo[];
  onSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  onSelectedTodo,
  selectedTodo,
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
        <TodoItems
          key={todo.id}
          todo={todo}
          onSelectedTodo={onSelectedTodo}
          selectedTodo={selectedTodo}
        />
      ))}
    </tbody>
  </table>
);
