import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  displayedTodos: Todo[];
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  displayedTodos,
  selectedTodo,
  onSelect,
}) => {
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
        {displayedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={selectedTodo === todo}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
};
