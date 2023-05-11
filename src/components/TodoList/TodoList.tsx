import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  onOpen: (id: number) => void;
  isOpen: boolean;
  selectedId: number | null;
}

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onOpen,
    isOpen,
    selectedId,
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
            key={todo.id}
            todo={todo}
            onOpen={onOpen}
            isOpen={isOpen}
            selectedId={selectedId}
          />
        ))}
      </tbody>
    </table>
  ),
);
