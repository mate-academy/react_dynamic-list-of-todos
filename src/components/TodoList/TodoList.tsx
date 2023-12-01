/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  getUserAction: (id: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoList: React.FC<Props> = ({
  todos,
  getUserAction,
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
      {todos.length > 0 && todos.map(todo => (
        <TodoItem
          todo={todo}
          getUserAction={getUserAction}
          selectedTodo={selectedTodo}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
