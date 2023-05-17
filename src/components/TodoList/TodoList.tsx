import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setSelectedTodo,
  selectedTodo,
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

        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
