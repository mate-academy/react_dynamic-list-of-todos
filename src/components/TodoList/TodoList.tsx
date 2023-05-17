import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../Todo/TodoComponent';

type Props = {
  todos: Todo[];
  onSelect: (todo:Todo) => void;
  activeTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  activeTodo,
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
        <TodoComponent
          todo={todo}
          activeTodo={activeTodo}
          onSelect={onSelect}
        />
      ))}
    </tbody>
  </table>
);
