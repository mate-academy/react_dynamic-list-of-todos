import React, { memo } from 'react';

import { Todo } from '../../types';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectedTodo?: Todo | null;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = memo(({
  todos,
  selectedTodo = null,
  onSelect = () => {},
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
          selectedTodo={selectedTodo}
          onSelect={onSelect}
        />
      ))}
    </tbody>
  </table>
));
