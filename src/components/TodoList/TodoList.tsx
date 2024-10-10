import React from 'react';

import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onOpenTodoInfo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onOpenTodoInfo,
  currentTodo,
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
          onOpenTodoInfo={onOpenTodoInfo}
          currentTodo={currentTodo}
        />
      ))}
    </tbody>
  </table>
);
