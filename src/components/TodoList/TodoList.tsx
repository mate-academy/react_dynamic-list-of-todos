import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  onSelect: (todo: Todo | null) => void;
  selectedTodoId?: number;
}

export const TodoList: React.FC<Props> = React.memo(function TodoListComponent({
  todos,
  onSelect = () => {},
  selectedTodoId,
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
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSelect={onSelect}
            isSelected={todo.id === selectedTodoId}
          />
        ))}
      </tbody>
    </table>
  );
});
