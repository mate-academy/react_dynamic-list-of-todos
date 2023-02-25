import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodosId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos, onSelect, selectedTodosId,
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
        {todos.map(todo => (
          <TodoInfo
            todo={todo}
            key={todo.id}
            onSelect={onSelect}
            selectedTodosId={selectedTodosId}
          />
        ))}
      </tbody>
    </table>
  );
};
