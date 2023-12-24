import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon" aria-label="Check icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th aria-label="Empty Cell"> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>
);
