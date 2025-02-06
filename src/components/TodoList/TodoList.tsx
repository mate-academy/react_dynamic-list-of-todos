import React from 'react';
import { TodoCard } from '../TodoCard/TodoCard';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
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
        <TodoCard
          key={todo.id}
          todo={todo}
          onSelectTodo={onSelectTodo}
          currentTodo={currentTodo}
        />
      ))}
    </tbody>
  </table>
);
