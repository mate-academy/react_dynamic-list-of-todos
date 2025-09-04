import React from 'react';
import { TodoRow } from '../TodoRow';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodoId,
}: Props) => (
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
        <TodoRow
          key={todo.id}
          todo={todo}
          onSelect={onSelect}
          selectedTodoId={selectedTodoId}
        />
      ))}
    </tbody>
  </table>
);
